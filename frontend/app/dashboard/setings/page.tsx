// app/dashboard/page.tsx
"use client"
import Navbar from "@/components/commons/Navbar"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { useState } from 'react';
import './setings.css';

type DetectionSetting = {
    enabled: boolean;
    threshold?: number;
    confidenceThreshold?: number;
    peopleThreshold?: number;
    duration?: number;
    durationThreshold?: number;
    heightThreshold?: number;
    action: string;
    unknownFaceAction?: string;
};

type Settings = {
    heightDetection: DetectionSetting;
    faceDetection: DetectionSetting;
    crowdDetection: DetectionSetting;
    loiteringDetection: DetectionSetting;
    restrictedAreaAlert: DetectionSetting;
    jumpingDetection: DetectionSetting;
    nightVisionMode: string;
    cameraSensitivity: number;
    alertThreshold: number;
    notificationPreferences: string[];
    dataRetentionPeriod: number;
};


export default function SettingPage() {
    // State for active tab
    const [activeTab, setActiveTab] = useState<string>('detection');

    // State for various settings with enhanced detection thresholds
    const [settings, setSettings] = useState<Settings>({
        heightDetection: {
            enabled: true,
            threshold: 6, // feet
            action: 'alert'
        },
        faceDetection: {
            enabled: true,
            confidenceThreshold: 80, // percentage
            unknownFaceAction: 'alert',
            action: 'alert'
        },
        crowdDetection: {
            enabled: true,
            peopleThreshold: 5,
            duration: 30, // seconds
            action: 'alert_and_email'
        },
        loiteringDetection: {
            enabled: false,
            durationThreshold: 300, // seconds
            action: 'alert'
        },
        restrictedAreaAlert: {
            enabled: true,
            action: 'alert_and_email'
        },
        jumpingDetection: {
            enabled: true,
            heightThreshold: 2, // feet
            action: 'alert_and_email'
        },
        nightVisionMode: 'auto',
        cameraSensitivity: 75,
        alertThreshold: 3,
        notificationPreferences: ['email', 'sms'],
        dataRetentionPeriod: 30
    });

    // Update the handler functions with proper typing
    const handleToggle = (settingGroup: keyof Settings) => {
        if (typeof settings[settingGroup] === 'object' && 'enabled' in (settings[settingGroup] as DetectionSetting)) {
            setSettings({
                ...settings,
                [settingGroup]: {
                    ...(settings[settingGroup] as DetectionSetting),
                    enabled: !(settings[settingGroup] as DetectionSetting).enabled
                }
            });
        }
    };

    const handleDetectionThresholdChange = (
        settingGroup: keyof Settings,
        field: keyof DetectionSetting,
        value: number
    ) => {
        if (typeof settings[settingGroup] === 'object') {
            setSettings({
                ...settings,
                [settingGroup]: {
                    ...(settings[settingGroup] as DetectionSetting),
                    [field]: value
                }
            });
        }
    };

    const handleDetectionActionChange = (
        settingGroup: keyof Settings,
        action: string
    ) => {
        if (typeof settings[settingGroup] === 'object') {
            setSettings({
                ...settings,
                [settingGroup]: {
                    ...(settings[settingGroup] as DetectionSetting),
                    action: action
                }
            });
        }
    };

    const handleRangeChange = (setting: keyof Settings, value: number) => {
        setSettings({
            ...settings,
            [setting]: value
        });
    };

    const handleSelectChange = (setting: keyof Settings, value: string) => {
        setSettings({
            ...settings,
            [setting]: value
        });
    };

    const handleNotificationToggle = (type: string) => {
        const newPrefs = [...settings.notificationPreferences];
        const index = newPrefs.indexOf(type);

        if (index === -1) {
            newPrefs.push(type);
        } else {
            newPrefs.splice(index, 1);
        }

        setSettings({
            ...settings,
            notificationPreferences: newPrefs
        });
    };

    return (
        <ProtectedRoute>
            <section className="settings-container p-4">
                <div className="settings-content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="settings-sidebar">
                                <div
                                    className={`sidebar-item ${activeTab === 'detection' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('detection')}
                                >
                                    <i className="bi bi-eye-fill me-2"></i>
                                    Detection Settings
                                </div>
                                <div
                                    className={`sidebar-item ${activeTab === 'alerts' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('alerts')}
                                >
                                    <i className="bi bi-bell-fill me-2"></i>
                                    Alert Settings
                                </div>
                                <div
                                    className={`sidebar-item ${activeTab === 'data' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('data')}
                                >
                                    <i className="bi bi-database-fill me-2"></i>
                                    Data Management
                                </div>
                                <div
                                    className={`sidebar-item ${activeTab === 'system' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('system')}
                                >
                                    <i className="bi bi-gear-fill me-2"></i>
                                    System Settings
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="settings-card">
                                {activeTab === 'detection' && (
                                    <div className="detection-settings">
                                        <h4 className="settings-title">
                                            <i className="bi bi-eye-fill me-2"></i>
                                            Detection Settings
                                        </h4>

                                        {/* Height Detection */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Height Detection</h6>
                                                <p className="text-muted">Detect and measure heights of individuals</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.heightDetection.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('heightDetection')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.heightDetection.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Minimum Height Threshold (feet)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="0"
                                                            max="10"
                                                            value={settings.heightDetection.threshold}
                                                            onChange={(e) => handleDetectionThresholdChange('heightDetection', 'threshold', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.heightDetection.action}
                                                            onChange={(e) => handleDetectionActionChange('heightDetection', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Face Detection */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Face Detection</h6>
                                                <p className="text-muted">Recognize and identify individuals</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.faceDetection.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('faceDetection')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.faceDetection.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Confidence Threshold (%)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="50"
                                                            max="100"
                                                            value={settings.faceDetection.confidenceThreshold}
                                                            onChange={(e) => handleDetectionThresholdChange('faceDetection', 'confidenceThreshold', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Unknown Face Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.faceDetection.unknownFaceAction}
                                                            onChange={(e) => handleDetectionActionChange('faceDetection', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Crowd Detection */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Crowd Detection</h6>
                                                <p className="text-muted">Detect gatherings of multiple people</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.crowdDetection.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('crowdDetection')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.crowdDetection.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-md-4">
                                                        <label className="form-label">People Threshold</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="2"
                                                            max="20"
                                                            value={settings.crowdDetection.peopleThreshold}
                                                            onChange={(e) => handleDetectionThresholdChange('crowdDetection', 'peopleThreshold', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Duration (seconds)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="5"
                                                            max="600"
                                                            value={settings.crowdDetection.duration}
                                                            onChange={(e) => handleDetectionThresholdChange('crowdDetection', 'duration', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.crowdDetection.action}
                                                            onChange={(e) => handleDetectionActionChange('crowdDetection', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Loitering Detection */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Loitering Detection</h6>
                                                <p className="text-muted">Detect prolonged stays in specific areas</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.loiteringDetection.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('loiteringDetection')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.loiteringDetection.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Duration Threshold (seconds)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="30"
                                                            max="1800"
                                                            value={settings.loiteringDetection.durationThreshold}
                                                            onChange={(e) => handleDetectionThresholdChange('loiteringDetection', 'durationThreshold', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.loiteringDetection.action}
                                                            onChange={(e) => handleDetectionActionChange('loiteringDetection', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Restricted Area Alert */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Restricted Area Alert</h6>
                                                <p className="text-muted">Trigger alerts for unauthorized access</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.restrictedAreaAlert.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('restrictedAreaAlert')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.restrictedAreaAlert.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label className="form-label">Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.restrictedAreaAlert.action}
                                                            onChange={(e) => handleDetectionActionChange('restrictedAreaAlert', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Jumping Detection */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Jumping Detection</h6>
                                                <p className="text-muted">Detect when someone jumps more than threshold height</p>
                                            </div>
                                            <div className="setting-control">
                                                <div
                                                    className={`toggle-switch ${settings.jumpingDetection.enabled ? 'on' : ''}`}
                                                    onClick={() => handleToggle('jumpingDetection')}
                                                >
                                                    <div className="toggle-slider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {settings.jumpingDetection.enabled && (
                                            <div className="setting-details ps-4 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Height Threshold (feet)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            min="1"
                                                            max="10"
                                                            value={settings.jumpingDetection.heightThreshold}
                                                            onChange={(e) => handleDetectionThresholdChange('jumpingDetection', 'heightThreshold', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Action</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={settings.jumpingDetection.action}
                                                            onChange={(e) => handleDetectionActionChange('jumpingDetection', e.target.value)}
                                                        >
                                                            <option value="alert">Trigger Alert</option>
                                                            <option value="alert_and_email">Alert + Email Admins</option>
                                                            <option value="log_only">Log Only</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Night Vision Mode */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Night Vision Mode</h6>
                                                <p className="text-muted">Configure low-light detection behavior</p>
                                            </div>
                                            <div className="setting-control">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={settings.nightVisionMode}
                                                    onChange={(e) => handleSelectChange('nightVisionMode', e.target.value)}
                                                >
                                                    <option value="auto">Auto</option>
                                                    <option value="alwaysOn">Always On</option>
                                                    <option value="off">Off</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Camera Sensitivity */}
                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Camera Sensitivity</h6>
                                                <p className="text-muted">Adjust detection sensitivity level</p>
                                            </div>
                                            <div className="setting-control">
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="0"
                                                    max="100"
                                                    value={settings.cameraSensitivity}
                                                    onChange={(e) => handleRangeChange('cameraSensitivity', parseInt(e.target.value))}
                                                />
                                                <span className="range-value">{settings.cameraSensitivity}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Rest of your tabs (alerts, data, system) remain the same */}
                                {activeTab === 'alerts' && (
                                    <div className="alert-settings">
                                        <h4 className="settings-title">
                                            <i className="bi bi-bell-fill me-2"></i>
                                            Alert Settings
                                        </h4>

                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Alert Threshold</h6>
                                                <p className="text-muted">Number of detections before triggering alert</p>
                                            </div>
                                            <div className="setting-control">
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    min="1"
                                                    max="10"
                                                    value={settings.alertThreshold}
                                                    onChange={(e) => handleRangeChange('alertThreshold', parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Notification Preferences</h6>
                                                <p className="text-muted">How you want to receive alerts</p>
                                            </div>
                                            <div className="setting-control">
                                                <div className="notification-options">
                                                    <div
                                                        className={`notification-option ${settings.notificationPreferences.includes('email') ? 'active' : ''}`}
                                                        onClick={() => handleNotificationToggle('email')}
                                                    >
                                                        <i className="bi bi-envelope-fill me-2"></i>
                                                        Email
                                                    </div>
                                                    <div
                                                        className={`notification-option ${settings.notificationPreferences.includes('sms') ? 'active' : ''}`}
                                                        onClick={() => handleNotificationToggle('sms')}
                                                    >
                                                        <i className="bi bi-phone-fill me-2"></i>
                                                        SMS
                                                    </div>
                                                    <div
                                                        className={`notification-option ${settings.notificationPreferences.includes('app') ? 'active' : ''}`}
                                                        onClick={() => handleNotificationToggle('app')}
                                                    >
                                                        <i className="bi bi-app-indicator me-2"></i>
                                                        In-App
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'data' && (
                                    <div className="data-settings">
                                        <h4 className="settings-title">
                                            <i className="bi bi-database-fill me-2"></i>
                                            Data Management
                                        </h4>

                                        <div className="setting-item">
                                            <div className="setting-info">
                                                <h6>Data Retention Period</h6>
                                                <p className="text-muted">How long to store detection data (in days)</p>
                                            </div>
                                            <div className="setting-control">
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    min="1"
                                                    max="365"
                                                    value={settings.dataRetentionPeriod}
                                                    onChange={(e) => handleRangeChange('dataRetentionPeriod', parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="data-actions mt-4">
                                            <button className="btn btn-outline-primary btn-sm me-3">
                                                <i className="bi bi-download me-2"></i>
                                                Export Data
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
                                                <i className="bi bi-trash me-2"></i>
                                                Purge Old Data
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'system' && (
                                    <div className="system-settings">
                                        <h4 className="settings-title">
                                            <i className="bi bi-gear-fill me-2"></i>
                                            System Settings
                                        </h4>

                                        <div className="system-status mb-4">
                                            <div className="status-card online">
                                                <i className="bi bi-check-circle-fill"></i>
                                                <span>All cameras operational</span>
                                            </div>
                                            <div className="status-card warning">
                                                <i className="bi bi-exclamation-triangle-fill"></i>
                                                <span>Storage 85% full</span>
                                            </div>
                                        </div>

                                        <div className="system-actions">
                                            <button className="btn btn-primary btn-sm me-3">
                                                <i className="bi bi-arrow-repeat me-2"></i>
                                                Restart System
                                            </button>
                                            <button className="btn btn-outline-secondary btn-sm me-3">
                                                <i className="bi bi-upload me-2"></i>
                                                Update Firmware
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
                                                <i className="bi bi-power me-2"></i>
                                                Shutdown
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="settings-actions mt-4">
                                <button className="btn btn-primary btn-sm me-3">
                                    Save Changes
                                </button>
                                <button className="btn btn-outline-secondary btn-sm">
                                    Reset to Defaults
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    )
}