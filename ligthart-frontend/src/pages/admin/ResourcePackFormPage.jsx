import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPages.css';

const ResourcePackFormPage = () => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [resourceFile, setResourceFile] = useState(null);
    const [currentFileUrl, setCurrentFileUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            axios.get(`${API_BASE_URL}/admin/resource-packs/${id}`)
                .then(response => {
                    setFormData({
                        name: response.data.name,
                        description: response.data.description,
                    });
                    setCurrentFileUrl(response.data.download_url);
                })
                .catch(() => setError('Không tìm thấy gói tài nguyên.'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResourceFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('description', formData.description);

        if (resourceFile) {
            submissionData.append('resource_file', resourceFile);
        }

        try {
            if (isEditing) {
                submissionData.append('_method', 'PUT');
                await axios.post(`${API_BASE_URL}/admin/resource-packs/${id}`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_BASE_URL}/admin/resource-packs`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/admin/resource-packs');
        } catch (err) {
            setError('Lưu thất bại. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>{isEditing ? 'Chỉnh Sửa Gói Tài Nguyên' : 'Thêm Gói Mới'}</h1>
            </div>
            <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Tên Gói</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="resource_file">File Tải Về (.zip, .mcpack)</label>
                    <input type="file" id="resource_file" name="resource_file" onChange={handleFileChange} accept=".zip,.mcpack" />
                    {isEditing && currentFileUrl && (
                        <p style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
                            File hiện tại: {currentFileUrl.split('/').pop()}
                        </p>
                    )}
                </div>
                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Tạo Mới'}</button>
            </form>
        </div>
    );
};
export default ResourcePackFormPage;