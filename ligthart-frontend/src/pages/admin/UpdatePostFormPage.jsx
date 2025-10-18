import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../../components/RichTextEditor';
import './AdminPages.css';

const UpdatePostFormPage = () => {
    const [formData, setFormData] = useState({ title: '', description: '', content: '' });
    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            axios.get(`${API_BASE_URL}/admin/updates/${id}`)
                .then(res => {
                    setFormData({
                        title: res.data.title,
                        description: res.data.description,
                        content: res.data.content,
                    });
                    setCurrentImageUrl(res.data.image_url);
                })
                .catch(() => setError('Không thể tải dữ liệu bài viết.'))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content: content }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', formData.description);
        submissionData.append('content', formData.content);
        
        if (imageFile) {
            submissionData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                submissionData.append('_method', 'PUT'); 
                await axios.post(`${API_BASE_URL}/admin/updates/${id}`, submissionData);
            } else {
                await axios.post(`${API_BASE_URL}/admin/updates`, submissionData);
            }
            navigate('/admin/updates');
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>{isEditing ? 'Chỉnh Sửa Bài Cập Nhật' : 'Tạo Bài Cập Nhật Mới'}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả ngắn (hiển thị ở danh sách bài viết)</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={3}></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="content">Nội dung chi tiết</label>
                    <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="image">Ảnh Bìa (Tùy chọn)</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" />
                    {(isEditing && currentImageUrl && !imageFile) && (
                        <div className="image-preview">
                            <p>Ảnh hiện tại:</p>
                            <img src={`${STORAGE_URL}/${currentImageUrl}`} alt="Current Post" />
                        </div>
                    )}
                     {imageFile && (
                        <div className="image-preview">
                            <p>Ảnh mới xem trước:</p>
                            <img src={URL.createObjectURL(imageFile)} alt="New Preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Đăng Bài'}</button>
            </form>
        </div>
    );
};
export default UpdatePostFormPage;