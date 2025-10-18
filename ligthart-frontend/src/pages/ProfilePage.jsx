import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const avatarInputRef = useRef(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (formData.password !== formData.password_confirmation) {
            setError('Mật khẩu mới không khớp.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/user/password`, formData);
            setMessage(response.data.message);
            setFormData({ current_password: '', password: '', password_confirmation: '' });
        } catch (err) {
            if (err.response && err.response.status === 422 && err.response.data.errors) {
                const serverErrors = Object.values(err.response.data.errors).flat().join(' ');
                setError(serverErrors || 'Mật khẩu hiện tại không chính xác.');
            } else {
                setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarClick = () => {
        avatarInputRef.current.click();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const submissionData = new FormData();
        submissionData.append('avatar', file);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/user/avatar`, submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUser(prevUser => ({ ...prevUser, avatar_url: response.data.avatar_url }));
            setMessage('Cập nhật avatar thành công!');
        } catch (err) {
            if (err.response && err.response.status === 422 && err.response.data.errors) {
                // Lấy lỗi validation cụ thể của trường 'avatar'
                const avatarError = err.response.data.errors.avatar[0];
                setError(avatarError || 'Upload avatar thất bại.');
            } else {
                setError('Upload avatar thất bại. File có thể quá lớn hoặc không đúng định dạng.');
            }
            console.error("Avatar upload failed", err.response?.data || err);
        }
    };

    if (!user) {
        return <div className="container" style={{padding: '50px 0', textAlign: 'center', color: '#fff'}}>Đang tải thông tin...</div>;
    }

    return (
        <div className="profile-page-dark-bg">
            <div className="container">
                <h1 className="title__text">Tài khoản của tôi</h1>
                <div className="profile-layout-dark">
                    <div className="profile-card-dark">
                        <h2>Thông tin</h2>
                        <div className="avatar-uploader">
                            <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/png, image/jpeg, image/webp" hidden />
                            <div className="avatar-wrapper" onClick={handleAvatarClick} title="Đổi avatar">
                                <img src={user.avatar_url ? `${STORAGE_URL}/${user.avatar_url}` : `https://cravatar.eu/avatar/${user.email}?s=120`} alt="Avatar" />
                                <div className="avatar-overlay"><i className="fa-solid fa-camera"></i></div>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="label">Tên hiển thị: </span>
                            <span className="value">{user.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email: </span>
                            <span className="value">{user.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Vai trò: </span>
                            <span className="value">{user.is_admin ? 'Quản trị viên' : 'Thành viên'}</span>
                        </div>
                    </div>

                    <div className="profile-card-dark">
                        <h2>Đổi mật khẩu</h2>
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="current_password">
                                    <i className="fa-solid fa-lock"></i> Mật khẩu hiện tại
                                </label>
                                <div className="input-wrapper-dark">
                                    <input className="form-input" type="password" id="current_password" name="current_password" value={formData.current_password} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="fa-solid fa-key"></i> Mật khẩu mới
                                </label>
                                <div className="input-wrapper-dark">
                                    <input className="form-input" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_confirmation">
                                    <i className="fa-solid fa-key"></i> Xác nhận mật khẩu mới
                                </label>
                                <div className="input-wrapper-dark">
                                    <input className="form-input" type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                                </div>
                            </div>
                            <button type="submit" className="profile__button" disabled={loading}>
                                {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;