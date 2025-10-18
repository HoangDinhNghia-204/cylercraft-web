// src/pages/admin/UserEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPages.css';

const UserEditPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', is_admin: false, password: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/users/${id}`)
            .then(res => {
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    is_admin: res.data.is_admin,
                    password: '',
                });
            })
            .catch(() => setError('Không tìm thấy người dùng.'))
            .finally(() => setLoading(false));
    }, [id, API_BASE_URL]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.put(`${API_BASE_URL}/admin/users/${id}`, formData);
            navigate('/admin/users');
        } catch (err) {
            setError('Cập nhật thất bại. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Chỉnh sửa Người dùng</h1>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="name">Tên hiển thị</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Đặt lại mật khẩu (để trống nếu không đổi)</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group form-group-checkbox">
                    <input type="checkbox" id="is_admin" name="is_admin" checked={formData.is_admin} onChange={handleChange} />
                    <label htmlFor="is_admin">Cấp quyền Quản trị viên</label>
                </div>
                <button type="submit" className="admin-button">Lưu Thay Đổi</button>
            </form>
        </div>
    );
};

export default UserEditPage;