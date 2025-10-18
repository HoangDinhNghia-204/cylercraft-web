// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isLoggedIn, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Nếu route này yêu cầu quyền admin, nhưng người dùng không phải admin
    if (requireAdmin && !isAdmin) {
        // Có thể chuyển về trang chủ hoặc hiển thị thông báo lỗi
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>Truy cập bị từ chối</h1>
                <p>Bạn không có quyền truy cập vào trang này.</p>
            </div>
        );
    }
    
    // Nếu tất cả điều kiện đều thỏa mãn, cho phép truy cập
    return children;
};

export default ProtectedRoute;