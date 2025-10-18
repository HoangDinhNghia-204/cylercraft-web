import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const WikiCategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/wiki-categories`)
            .then(res => setCategories(res.data))
            .catch(() => setError('Không thể tải danh mục Wiki.'))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa danh mục này? Các bài viết thuộc danh mục sẽ không bị xóa.')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/wiki-categories/${id}`);
                setCategories(categories.filter(c => c.id !== id));
            } catch (err) { alert('Xóa thất bại!'); }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Danh mục Wiki</h1>
                <Link to="/admin/wiki-categories/new" className="admin-button">Thêm Danh mục Mới</Link>
            </div>
            <table className="admin-table">
                <thead>
                    <tr><th>ID</th><th>Tên Danh mục</th><th>Hành Động</th></tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td className="actions">
                                    <Link to={`/admin/wiki-categories/edit/${category.id}`} className="admin-button edit small">Sửa</Link>
                                    <button onClick={() => handleDelete(category.id)} className="admin-button delete small">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3" style={{ textAlign: 'center' }}>Chưa có danh mục nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default WikiCategoryListPage;