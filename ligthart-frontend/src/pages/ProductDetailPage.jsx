// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css'; // Import CSS

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams(); // Lấy ID từ URL
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Không tìm thấy sản phẩm.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, API_BASE_URL]);

    const handleAddToCart = () => {
        // Logic thêm vào giỏ hàng sẽ được làm ở bước sau
        // Ví dụ: addToCart(product, quantity);
        alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px 0' }}>Đang tải...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px 0', color: 'red' }}>{error}</div>;
    if (!product) return null;

    return (
        <div className="container">
            <div className="product-detail-layout">
                <div className="product-detail-image">
                    <img src={`${STORAGE_URL}/${product.image_url}`} alt={product.name} />
                </div>

                <div className="product-detail-info">
                    {product.category && (
                        <p className="category-name">
                            <Link to={`/shop?category=${product.category.id}`}>{product.category.name}</Link>
                        </p>
                    )}
                    <h1>{product.name}</h1>
                    <p className="price">{Number(product.price).toLocaleString('vi-VN')} VNĐ</p>
                    <p className="description">{product.description}</p>

                    <div className="add-to-cart-form">
                        <input 
                            type="number" 
                            className="quantity-input" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                            min="1"
                        />
                        <button onClick={handleAddToCart} className="profile__button">
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;