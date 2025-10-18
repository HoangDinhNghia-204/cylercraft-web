import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const StaffListPage = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/staff`)
            .then(res => setStaff(res.data))
            .catch(() => setError('Không thể tải danh sách nhân sự.'))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/staff/${id}`);
                setStaff(staff.filter(s => s.id !== id));
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
                <h1>Quản lý Nhân sự</h1>
                <Link to="/admin/staff/new" className="admin-button">Thêm Thành Viên</Link>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Tên In-game</th>
                        <th>Chức vụ</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.length > 0 ? (
                        staff.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.in_game_name}</td>
                                <td>{member.staff_category?.name || 'N/A'}</td>
                                <td className="actions">
                                    <Link to={`/admin/staff/edit/${member.id}`} className="admin-button edit small">Sửa</Link>
                                    <button onClick={() => handleDelete(member.id)} className="admin-button delete small">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có thành viên nào.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default StaffListPage;