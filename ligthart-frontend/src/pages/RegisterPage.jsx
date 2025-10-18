import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loginAfterRegister } = useAuth();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${API_BASE_URL}/register`, formData);
            
            loginAfterRegister(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="form-section-dark">
            <div className="auth-form-dark">
                <h1>Đăng Ký</h1>
                {errors.general && <p className="error-message">{errors.general}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên hiển thị</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                        {errors.name && <small className="error-text">{errors.name[0]}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                         {errors.email && <small className="error-text">{errors.email[0]}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                         {errors.password && <small className="error-text">{errors.password[0]}</small>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            className="form-input"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>
                 <p className="form-switch-link-dark">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;