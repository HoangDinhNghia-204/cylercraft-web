import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const ResourcePackListPage = () => {
    const [packs, setPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/resource-packs`)
            .then(response => {
                setPacks(response.data.data || response.data);
            })
            .catch(err => {
                setError('Không thể tải danh sách gói tài nguyên.');
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa gói tài nguyên này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/resource-packs/${id}`);
                setPacks(packs.filter(p => p.id !== id));
            } catch (err) {
                alert('Xóa thất bại!');
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Gói Tài Nguyên</h1>
                <Link to="/admin/resource-packs/new" className="admin-button">Thêm Gói Mới</Link>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {packs.length > 0 ? (
                        packs.map(pack => (
                            <tr key={pack.id}>
                                <td>{pack.id}</td>
                                <td>{pack.name}</td>
                                <td className="actions">
                                    <Link to={`/admin/resource-packs/edit/${pack.id}`} className="admin-button edit">Sửa</Link>
                                    <button onClick={() => handleDelete(pack.id)} className="admin-button delete">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3" style={{ textAlign: 'center' }}>Chưa có gói tài nguyên nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default ResourcePackListPage;