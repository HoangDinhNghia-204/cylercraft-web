import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPages.css';

const StaffFormPage = () => {
    const [formData, setFormData] = useState({ name: '', in_game_name: '', staff_category_id: '' });
    const [categories, setCategories] = useState([]);
    const [avatarFile, setAvatarFile] = useState(null);
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        const fetchDependencies = async () => {
            setLoading(true);
            try {
                const catPromise = axios.get(`${API_BASE_URL}/admin/staff-categories`);
                const memberPromise = isEditing ? axios.get(`${API_BASE_URL}/admin/staff/${id}`) : Promise.resolve(null);

                const [catRes, memberRes] = await Promise.all([catPromise, memberPromise]);

                setCategories(catRes.data);
                if (isEditing && memberRes) {
                    setFormData(memberRes.data);
                    setCurrentAvatarUrl(memberRes.data.avatar_url);
                }
            } catch (err) {
                setError('Không thể tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };
        fetchDependencies();
    }, [id, isEditing, API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('in_game_name', formData.in_game_name);
        submissionData.append('staff_category_id', formData.staff_category_id);
        
        if (avatarFile) {
            submissionData.append('avatar', avatarFile);
        }

        try {
            if (isEditing) {
                submissionData.append('_method', 'PUT'); 
                await axios.post(`${API_BASE_URL}/admin/staff/${id}`, submissionData);
            } else {
                await axios.post(`${API_BASE_URL}/admin/staff`, submissionData);
            }
            navigate('/admin/staff');
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>{isEditing ? 'Chỉnh Sửa Thành Viên' : 'Thêm Thành Viên Mới'}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="name">Tên</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="in_game_name">Tên In-game</label>
                    <input type="text" id="in_game_name" name="in_game_name" value={formData.in_game_name} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="staff_category_id">Chức vụ</label>
                    <select id="staff_category_id" name="staff_category_id" value={formData.staff_category_id || ''} onChange={handleChange} required>
                        <option value="">-- Chọn chức vụ --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" id="avatar" name="avatar" onChange={handleAvatarChange} accept="image/*" />
                    {(isEditing && currentAvatarUrl && !avatarFile) && (
                        <div className="image-preview">
                            <p>Avatar hiện tại:</p>
                            <img src={`${STORAGE_URL}/${currentAvatarUrl}`} alt="Current Avatar" />
                        </div>
                    )}
                     {avatarFile && (
                        <div className="image-preview">
                            <p>Avatar mới xem trước:</p>
                            <img src={URL.createObjectURL(avatarFile)} alt="New Preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Thêm Mới'}</button>
            </form>
        </div>
    );
};
export default StaffFormPage;