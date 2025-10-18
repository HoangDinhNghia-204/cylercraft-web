import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPages.css';

const ProductFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
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
                const categoriesPromise = axios.get(`${API_BASE_URL}/admin/categories`);
                const productPromise = isEditing ? axios.get(`${API_BASE_URL}/admin/products/${id}`) : Promise.resolve(null);
                
                const [categoriesRes, productRes] = await Promise.all([categoriesPromise, productPromise]);
                
                setCategories(categoriesRes.data.data || categoriesRes.data);

                if (isEditing && productRes) {
                    setFormData(productRes.data);
                    setCurrentImageUrl(productRes.data.image_url);
                }
            } catch (err) {
                console.error("Error fetching data", err);
                setError('Không thể tải dữ liệu cần thiết.');
            } finally {
                setLoading(false);
            }
        };

        fetchDependencies();
    }, [id, isEditing, API_BASE_URL]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                submissionData.append(key, formData[key]);
            }
        });
        
        if (imageFile) {
            submissionData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                submissionData.append('_method', 'PUT'); 
                await axios.post(`${API_BASE_URL}/admin/products/${id}`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${API_BASE_URL}/admin/products`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/admin/products');
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.');
            console.error(err);
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>{isEditing ? 'Chỉnh Sửa Sản Phẩm' : 'Tạo Sản Phẩm Mới'}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="category_id">Danh mục</label>
                    <select id="category_id" name="category_id" value={formData.category_id || ''} onChange={handleChange}>
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Giá (VNĐ)</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="image">Ảnh sản phẩm</label>
                    <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" />
                    {(isEditing && currentImageUrl && !imageFile) && (
                        <div className="image-preview">
                            <p>Ảnh hiện tại:</p>
                            <img src={`${STORAGE_URL}/${currentImageUrl}`} alt="Current Product" />
                        </div>
                    )}
                     {imageFile && (
                        <div className="image-preview">
                            <p>Ảnh mới xem trước:</p>
                            <img src={URL.createObjectURL(imageFile)} alt="New Preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="admin-button">{isEditing ? 'Lưu Thay Đổi' : 'Tạo Sản Phẩm'}</button>
            </form>
        </div>
    );
};

export default ProductFormPage;