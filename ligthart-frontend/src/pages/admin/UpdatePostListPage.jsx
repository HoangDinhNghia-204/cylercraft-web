import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const UpdatePostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/updates`)
            .then(res => setPosts(res.data))
            .catch(() => setError('Không thể tải danh sách bài cập nhật.'))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/updates/${id}`);
                setPosts(posts.filter(p => p.id !== id));
            } catch (err) { 
                alert('Xóa thất bại!');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Cập nhật</h1>
                <Link to="/admin/updates/new" className="admin-button">Thêm Bài Mới</Link>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu Đề</th>
                        <th>Ngày Đăng</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{new Date(post.created_at).toLocaleDateString('vi-VN')}</td>
                                <td className="actions">
                                    <Link to={`/admin/updates/edit/${post.id}`} className="admin-button edit small">Sửa</Link>
                                    <button onClick={() => handleDelete(post.id)} className="admin-button delete small">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>Chưa có bài cập nhật nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default UpdatePostListPage;