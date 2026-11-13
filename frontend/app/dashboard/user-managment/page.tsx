// app/dashboard/page.tsx
"use client"
import { useState, useEffect } from 'react';
import {
  FiUser, FiUsers, FiPlus, FiEdit2, FiTrash2,
  FiSearch, FiChevronLeft, FiChevronRight,
  FiFilter, FiDownload, FiEye, FiX
} from 'react-icons/fi';
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import "./UserManagementPage.css";
import { toast } from "react-hot-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
  avatar: string;
  updatedAt: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // then fetch fresh
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (response.ok && result.success) {
        setUsers(result.data);
        setFilteredUsers(result.data);
        console.log("Fetched users:", result.data);
        localStorage.setItem("cachedUsers", JSON.stringify(result.data));
      } else {
        toast.error(result.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Network or server error while fetching users.");
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("cachedUsers");
    if (cached) {
      const parsed = JSON.parse(cached);
      setUsers(parsed);
      setFilteredUsers(parsed);
    }

    fetchUsers();

  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, users]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // add new user
  const handleAddNewUser = async () => {
    const { name, email, role } = newUser;

    if (!name || !email) {
      toast.error("Name and Email are required.");
      return;
    }

    const payload = {
      name,
      email,
      password: "admin@123",
      role,
    };

    console.log("Sending payload to backend:", payload);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log("Status Code:", response.status);
      console.log("Backend Message:", result.message);

      if (response.ok && result.success) {
        toast.success(`✅ ${result.message}`);
        setShowAddUserModal(false);

        const newUser = result.data; // Backend should return the new user
        setNewUser({ name: "", email: "", role: "user" });

        setUsers((prev) => [newUser, ...prev]);
        setFilteredUsers((prev) => [newUser, ...prev]);

        // ✅ Update localStorage
        const updatedList = [newUser, ...users];
        localStorage.setItem("cachedUsers", JSON.stringify(updatedList));
      } else {
        toast.error(`❌ ${result.message || "Unknown error occurred."}`);
      }
    } catch (error) {
      console.error("Network or unhandled error:", error);
      toast.error("❌ A network or server error occurred.");
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(`✅ ${result.message || "User deleted successfully"}`);
        // Remove from local state
        const updatedUsers = users.filter(user => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        localStorage.setItem("cachedUsers", JSON.stringify(updatedUsers));
      } else {
        toast.error(`❌ ${result.message || "Failed to delete user"}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("❌ A network or server error occurred.");
    } finally {
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };


  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'suspended':
        return 'status-suspended';
      default:
        return 'status-default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'role-admin';
      default:
        return 'role-default';
    }
  };


  const handleEditUser = async () => {
    if (!selectedUser?.name || !selectedUser?.email || !selectedUser?.role) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("✅ User updated successfully");
        setShowEditModal(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong while updating.");
      console.error(error);
    }
  };



  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button onClick={() => setShowDeleteModal(false)} className="close-modal">
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete user <strong>{selectedUser?.name}</strong>? This action cannot be undone.</p>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="delete-confirm-btn"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal edit_user">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button onClick={() => {
                setShowAddUserModal(false);
                setSelectedUser(null);
              }} className="close-modal">
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={selectedUser ? selectedUser.name : newUser.name}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser ? selectedUser.email : newUser.email}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={selectedUser ? selectedUser.role : newUser.role}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, role: e.target.value as any })
                    : setNewUser({ ...newUser, role: e.target.value as any })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status field only shown when editing existing user */}
              {selectedUser && (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      status: e.target.value as 'active' | 'inactive' | 'suspended'
                    })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setSelectedUser(null);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewUser}
                className='add-user-btn'
              >
                Add New User
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal edit_user">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button onClick={() => {
                setShowEditModal(false);
                setSelectedUser(null);
              }} className="close-modal">
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={selectedUser ? selectedUser.name : newUser.name}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser ? selectedUser.email : newUser.email}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={selectedUser ? selectedUser.role : newUser.role}
                  onChange={(e) => selectedUser
                    ? setSelectedUser({ ...selectedUser, role: e.target.value as any })
                    : setNewUser({ ...newUser, role: e.target.value as any })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status field only shown when editing existing user */}
              {selectedUser && (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      status: e.target.value as 'active' | 'inactive' | 'suspended'
                    })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className='add-user-btn'
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      )}
      <ProtectedRoute>
        <div className="user-management-container">
          <div className="header-section">
            <h1><FiUsers className="header-icon" /> User Management</h1>
            <p>Manage all users in the system, their roles and permissions</p>
          </div>

          {emailSent && (
            <div className="alert alert-success">
              Invitation email sent successfully! The user will receive instructions to complete their registration.
            </div>
          )}

          <div className="controls-section">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="clear-search">
                  <FiX />
                </button>
              )}
            </div>

            <div className="action-buttons">
              <button
                className="add-user-btn"
                onClick={() => setShowAddUserModal(true)}
              >
                <FiPlus /> Add User
              </button>
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <img
                            src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                            alt={user.name}
                            className="user-avatar"
                          />
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusColor(user.status)}`}>
                          {user.status || "active"}
                        </span>
                      </td>
                      <td>
                        {new Date(user.updatedAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                          month: 'short',
                          year: 'numeric',
                        })}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            title="Edit"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="delete-btn"
                            title="Delete"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="no-users">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredUsers.length > usersPerPage && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </>
  )
}