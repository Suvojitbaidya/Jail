"use client"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { useEffect, useState } from 'react';
import {
    FiBell, FiMail, FiPhone, FiSmartphone,
    FiPlus, FiTrash2, FiEdit2, FiSave,
    FiRotateCw, FiToggleLeft, FiToggleRight,
    FiX, FiCheck
} from 'react-icons/fi';
import './setings.css';

type EmailSetting = {
    id?: number;
    email: string;
    isActive: boolean;
};

type AlertSettings = {
    alertThreshold: number;
    notificationPreferences: string[];
    emailRecipients: EmailSetting[];
    newEmail: string;
    editingIndex: number | null;
    isLoading: boolean;
};

export default function SettingPage() {
    const [settings, setSettings] = useState<AlertSettings>({
        alertThreshold: 3,
        notificationPreferences: ['email'],
        emailRecipients: [
            { email: 'admin@example.com', isActive: true },
            { email: 'security@example.com', isActive: true }
        ],
        newEmail: '',
        editingIndex: null,
        isLoading: true
    });

    // State for delete confirmation modal
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: -1,
        email: ''
    });

    const handleNotificationToggle = (type: string) => {
        const newPrefs = settings.notificationPreferences.includes(type)
            ? settings.notificationPreferences.filter(t => t !== type)
            : [...settings.notificationPreferences, type];

        setSettings({
            ...settings,
            notificationPreferences: newPrefs
        });
    };

    const handleAddEmail = async () => {
        if (!settings.newEmail || !isValidEmail(settings.newEmail)) return;

        try {
            const res = await fetch('/api/alert-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: settings.newEmail })
            });
            const data = await res.json();

            if (data.success) {
                setSettings(prev => ({
                    ...prev,
                    emailRecipients: [
                        ...prev.emailRecipients,
                        { id: data.data.id, email: settings.newEmail, isActive: true }
                    ],
                    newEmail: ''
                }));
            }
        } catch (error) {
            alert("Failed to add email");
        }
    };

    // Open delete confirmation modal
    const showDeleteConfirmation = (id: number, email: string) => {
        setDeleteModal({ isOpen: true, id, email });
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            id: -1,
            email: ''
        });
    };

    // Confirm and delete email
    const confirmDeleteEmail = async () => {
        try {
            await fetch(`/api/alert-emails/${deleteModal.id}`, { method: 'DELETE' });
            setSettings(prev => ({
                ...prev,
                emailRecipients: prev.emailRecipients.filter(e => e.id !== deleteModal.id)
            }));
        } catch (error) {
            alert("Failed to delete email");
        } finally {
            closeDeleteModal();
        }
    };

    const startEditing = (index: number) => {
        setSettings({
            ...settings,
            editingIndex: index
        });
    };

    const saveEditing = async (index: number) => {
        const email = settings.emailRecipients[index];
        if (!isValidEmail(email.email)) return;

        try {
            await fetch(`/api/alert-emails/${email.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.email })
            });
            setSettings(prev => ({ ...prev, editingIndex: null }));
        } catch (error) {
            alert("Failed to update email");
        }
    };

    const handleEmailChange = (index: number, value: string) => {
        const updatedEmails = [...settings.emailRecipients];
        updatedEmails[index].email = value;
        setSettings({
            ...settings,
            emailRecipients: updatedEmails
        });
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch('/api/alert-emails');
                const data = await res.json();
                if (data.success) {
                    setSettings(prev => ({
                        ...prev,
                        emailRecipients: data.data.map((e: any) => ({
                            id: e.id,
                            email: e.email,
                            isActive: true
                        })),
                        isLoading: false
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch emails:", error);
                setSettings(prev => ({ ...prev, isLoading: false }));
            }
        };
        fetchEmails();
    }, []);

    return (
        <ProtectedRoute>
            {settings.isLoading ? (
                <div>Loading emails...</div>
            ) : (
                <div className="alert-settings-container">
                    {/* Delete Confirmation Modal */}
                    {deleteModal.isOpen && (
                        <div className="modal-overlay">
                            <div className="delete-confirmation-modal">
                                <h3>Confirm Deletion</h3>
                                <p>Are you sure you want to delete <strong>{deleteModal.email}</strong>?</p>
                                <div className="modal-actions">
                                    <button
                                        className="cancel-btn"
                                        onClick={closeDeleteModal}
                                    >
                                        <FiX /> Cancel
                                    </button>
                                    <button
                                        className="confirm-delete-btn"
                                        onClick={confirmDeleteEmail}
                                    >
                                        <FiCheck /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="alert-settings-header">
                        {/* <FiBell className="header-icon" /> */}
                        <h1>Alert Settings</h1>
                        <p>Configure how you receive security alerts and notifications</p>
                    </div>

                    <div className="settings-card">
                        <div className="setting-section">
                            <h2 className="section-title">
                                <FiBell className="section-icon" />
                                Alert Preferences
                            </h2>

                            <hr />

                            <div className="notification-methods">
                                <div className="setting-label">
                                    <span>Notification Methods</span>
                                    <small>Choose how you want to receive alerts</small>
                                </div>
                                <div className="method-options">
                                    <button
                                        className={`method-option ${settings.notificationPreferences.includes('email') ? 'active' : ''}`}
                                        onClick={() => handleNotificationToggle('email')}
                                    >
                                        <FiMail className="method-icon" />
                                        Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {settings.notificationPreferences.includes('email') && (
                            <div className="setting-section">
                                <h2 className="section-title">
                                    <FiMail className="section-icon" />
                                    Email Recipients
                                </h2>
                                <p className="section-description">
                                    Manage email addresses that will receive security alerts
                                </p>

                                <div className="recipients-list">
                                    {settings.emailRecipients.map((recipient, index) => (
                                        <div key={index} className={`recipient-item ${!recipient.isActive ? 'inactive' : ''}`}>
                                            {settings.editingIndex === index ? (
                                                <div className="edit-mode">
                                                    <input
                                                        type="email"
                                                        value={recipient.email}
                                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                                        className={`email-input ${!isValidEmail(recipient.email) ? 'invalid' : ''}`}
                                                    />
                                                    <button
                                                        className="save-btn"
                                                        onClick={() => saveEditing(index)}
                                                        disabled={!isValidEmail(recipient.email)}
                                                    >
                                                        <FiSave /> <span className="ms-1">Save</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="view-mode">
                                                    <span className="email-address">{recipient.email}</span>
                                                    <div className="recipient-actions">
                                                        <button
                                                            className="edit-btn"
                                                            onClick={() => startEditing(index)}
                                                        >
                                                            <FiEdit2 />
                                                        </button>
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => showDeleteConfirmation(index, recipient.email)}
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="add-email-section">
                                    <input
                                        type="email"
                                        placeholder="Add new email"
                                        value={settings.newEmail}
                                        onChange={e => setSettings({ ...settings, newEmail: e.target.value })}
                                        className={`email-input ${settings.newEmail && !isValidEmail(settings.newEmail) ? 'invalid' : ''}`}
                                    />
                                    <button
                                        className="add-btn"
                                        onClick={handleAddEmail}
                                        disabled={!settings.newEmail || !isValidEmail(settings.newEmail)}
                                    >
                                        <FiPlus /> Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </ProtectedRoute>
    )
}