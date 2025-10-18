import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div>
                    <div className="sidebar-header">
                        <h3>Trang Quản Trị</h3>
                        <p>Chào, {user?.name}</p>
                    </div>
                    <nav className="admin-nav">
                        <ul>
                            <li><NavLink to="/admin" end>Dashboard</NavLink></li>
                            <li><NavLink to="/admin/server-info">Thông Tin Server</NavLink></li>
                            <li><NavLink to="/admin/categories">Danh mục Sản Phẩm</NavLink></li>
                            <li><NavLink to="/admin/products">Sản Phẩm</NavLink></li>
                            <li><NavLink to="/admin/resource-packs">Tài Nguyên</NavLink></li>
                            <li><NavLink to="/admin/users">Người Dùng</NavLink></li>
                            <li><NavLink to="/admin/wiki-categories">Danh mục Wiki</NavLink></li>
                            <li><NavLink to="/admin/wiki">Wiki</NavLink></li>
                            <li><NavLink to="/admin/updates">Cập nhật</NavLink></li>
                            <li><NavLink to="/admin/staff-categories">Danh mục Nhân sự</NavLink></li>
                            <li><NavLink to="/admin/staff">Nhân sự (Staff)</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="sidebar-footer">
                    {/* THÊM NÚT QUAY VỀ TRANG CHÍNH Ở ĐÂY */}
                    <Link to="/" className="back-to-site-button">
                        Quay về trang chính
                    </Link>
                    <button onClick={handleLogout} className="logout-button">Đăng Xuất</button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;