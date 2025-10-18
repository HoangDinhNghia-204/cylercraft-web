import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPages.css';

const StaffCategoryFormPage = () => {
    const [formData, setFormData] = useState({ name: '', order: 0 });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            axios.get(`${API_BASE_URL}/admin/staff-categories/${id}`)
                .then(res => setFormData(res.data))
                .catch(() => setError('Không tìm thấy danh mục.'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, API_BASE_URL]);

const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        if (isEditing) {
            await axios.put(`${API_BASE_URL}/admin/staff-categories/${id}`, formData);
        } else {
            await axios.post(`${API_BASE_URL}/admin/staff-categories`, formData);
        }
        navigate('/admin/staff-categories');
    } catch (err) {
        setError('Lưu thất bại! Tên có thể đã tồn tại.');
    }
};

if (loading) return <div>Đang tải...</div>;

return (
    <div className="admin-page">
        <div className="admin-page-header">
            <h1>{isEditing ? 'Chỉnh Sửa Danh mục' : 'Thêm Danh mục Mới'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="admin-form">
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label htmlFor="name">Tên danh mục (ví dụ: Ban Quản Trị, Hỗ Trợ)</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="order">Thứ tự hiển thị (số nhỏ hơn lên trước)</label>
                <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} required />
            </div>
            <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Tạo Danh mục'}</button>
        </form>
    </div>
);
};
export default StaffCategoryFormPage;