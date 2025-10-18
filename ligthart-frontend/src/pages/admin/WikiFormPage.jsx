import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../../components/RichTextEditor';
import './AdminPages.css';

const WikiFormPage = () => {
    const [formData, setFormData] = useState({ title: '', description: '', content: '', wiki_category_id: '' });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchDependencies = async () => {
            setLoading(true);
            try {
                const catPromise = axios.get(`${API_BASE_URL}/admin/wiki-categories`);
                const articlePromise = isEditing ? axios.get(`${API_BASE_URL}/admin/wiki/${id}`) : Promise.resolve(null);
                
                const [catRes, articleRes] = await Promise.all([catPromise, articlePromise]);
                
                setCategories(catRes.data);
                
                if (isEditing && articleRes) {
                    setFormData(articleRes.data);
                }
            } catch (err) {
                setError('Không thể tải dữ liệu.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDependencies();
    }, [id, isEditing, API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content: content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await axios.put(`${API_BASE_URL}/admin/wiki/${id}`, formData);
            } else {
                await axios.post(`${API_BASE_URL}/admin/wiki`, formData);
            }
            navigate('/admin/wiki');
        } catch (err) {
            setError('Lưu thất bại. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>{isEditing ? 'Chỉnh Sửa Bài Viết Wiki' : 'Thêm Bài Viết Mới'}</h1>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="title">Tiêu Đề</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="wiki_category_id">Danh mục</label>
                    <select id="wiki_category_id" name="wiki_category_id" value={formData.wiki_category_id || ''} onChange={handleChange} required>
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả ngắn</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={3}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Nội dung chi tiết</label>
                    <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                    />
                </div>
                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Tạo Mới'}</button>
            </form>
        </div>
    );
};
export default WikiFormPage;