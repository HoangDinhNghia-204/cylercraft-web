import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const WikiListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/wiki`)
            .then(res => setArticles(res.data))
            .catch(() => setError('Không thể tải danh sách bài viết.'))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/wiki/${id}`);
                setArticles(articles.filter(a => a.id !== id));
            } catch (err) { alert('Xóa thất bại!'); }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Bài Viết Wiki</h1>
                <Link to="/admin/wiki/new" className="admin-button">Thêm Bài Mới</Link>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu Đề</th>
                        <th>Danh mục</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.length > 0 ? (
                        articles.map(article => (
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.title}</td>
                                <td>{article.wiki_category?.name || 'N/A'}</td>
                                <td className="actions">
                                    <Link to={`/admin/wiki/edit/${article.id}`} className="admin-button edit small">Sửa</Link>
                                    <button onClick={() => handleDelete(article.id)} className="admin-button delete small">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>Chưa có bài viết nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default WikiListPage;