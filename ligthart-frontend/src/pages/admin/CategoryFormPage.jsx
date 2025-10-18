import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPages.css';

const CategoryFormPage = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            axios.get(`${API_BASE_URL}/admin/categories/${id}`)
                .then(response => {
                    setName(response.data.name);
                })
                .catch(() => setError('Không tìm thấy danh mục.'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, API_BASE_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = { name };
        try {
            if (isEditing) {
                await axios.put(`${API_BASE_URL}/admin/categories/${id}`, payload);
            } else {
                await axios.post(`${API_BASE_URL}/admin/categories`, payload);
            }
            navigate('/admin/categories');
        } catch (err) {
            console.error("Failed to save category", err);
            setError("Lưu danh mục thất bại! Tên có thể đã tồn tại.");
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
                    <label htmlFor="name">Tên danh mục</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Tạo Danh mục'}</button>
            </form>
        </div>
    );
};
export default CategoryFormPage;