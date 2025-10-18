// src/pages/admin/ServerInfoPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPages.css';

const ServerInfoPage = () => {
    const [formData, setFormData] = useState({ ip_address: '', discord_url: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/server-info`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(() => setError('Không thể tải thông tin server.'))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await axios.put(`${API_BASE_URL}/admin/server-info`, formData);
            setMessage('Cập nhật thông tin thành công!');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                const serverErrors = Object.values(err.response.data.errors).flat().join(' ');
                setError(serverErrors);
            } else {
                setError('Cập nhật thất bại. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.ip_address) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Thông Tin Server</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                
                <div className="form-group">
                    <label htmlFor="ip_address">Địa chỉ IP Server</label>
                    <input type="text" id="ip_address" name="ip_address" value={formData.ip_address} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="discord_url">Link mời Discord</label>
                    <input type="url" id="discord_url" name="discord_url" value={formData.discord_url} onChange={handleChange} required />
                </div>

                <button type="submit" className="admin-button" disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
            </form>
        </div>
    );
};

export default ServerInfoPage;