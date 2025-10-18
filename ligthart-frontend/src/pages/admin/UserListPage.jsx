import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPages.css';
import { Link } from 'react-router-dom';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/users`);
                setUsers(response.data.data || response.data);
            } catch (err) {
                setError('Không thể tải danh sách người dùng.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/users/${id}`);
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                alert('Xóa người dùng thất bại!');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Người Dùng</h1>
            </div>
            <table className="admin-table">
                <thead>
                    <tr><th>ID</th><th>Tên</th><th>Email</th><th>Admin?</th><th>Hành Động</th></tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ? 'Có' : 'Không'}</td>
                                <td className="actions">
                                    <Link to={`/admin/users/edit/${user.id}`} className="admin-button edit small">Sửa</Link>
                                    <button onClick={() => handleDelete(user.id)} className="admin-button delete small">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có người dùng nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserListPage;