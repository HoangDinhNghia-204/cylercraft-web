import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffPage.css';

const StaffPage = () => {
    const [staffByCategories, setStaffByCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        axios.get(`${API_BASE_URL}/staff-by-category`)
            .then(res => {
                setStaffByCategories(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch staff data", err);
                setError('Không thể tải dữ liệu nhân sự.');
            })
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    return (
        <div className="update-page-dark-bg">
            <section className="page-header-dark">
                <div className="container">
                    <h1 className="title__text">Đội Ngũ Nhân Sự</h1>
                    <p className="regular__text">Gặp gỡ những người đang vận hành và hỗ trợ server.</p>
                </div>
            </section>
            <div className="container" style={{paddingTop: '50px', paddingBottom: '80px'}}>
                {loading && <p style={{color: '#fff', textAlign: 'center'}}>Đang tải...</p>}
                {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}
                
                {!loading && !error && staffByCategories.length > 0 ? (
                    staffByCategories.map(category => (
                        <div key={category.id} className="staff-category-group">
                            <h2 className="staff-category-title">{category.name}</h2>
                            <div className="staff-grid">
                                {category.staff_members.map(member => (
                                    <div key={member.id} className="staff-card">
                                        <div className="staff-avatar">
                                            <img src={member.avatar_url ? `${STORAGE_URL}/${member.avatar_url}` : `https://cravatar.eu/avatar/${member.in_game_name}/120`} alt={member.name} />
                                        </div>
                                        <h3 className="staff-name">{member.name}</h3>
                                        <p className="staff-role">{member.in_game_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p style={{color: '#fff', textAlign: 'center'}}>Hiện chưa có thông tin nhân sự.</p>
                )}
            </div>
        </div>
    );
};

export default StaffPage;