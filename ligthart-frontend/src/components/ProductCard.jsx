// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    return (
        // Thêm Link ở đây, bọc toàn bộ card
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
                <div className="product-image">
                    <img src={`${STORAGE_URL}/${product.image_url}`} alt={product.name} />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    {product.category && (
                        <p style={{ color: '#888', fontSize: '14px', margin: '-5px 0 10px' }}>
                            {product.category.name}
                        </p>
                    )}
                    <p className="product-description">
                        {/* Rút gọn mô tả nếu quá dài */}
                        {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                    </p>
                    <p className="product-price">{Number(product.price).toLocaleString('vi-VN')} VNĐ</p>
                    {/* Nút này có thể không cần thiết trên card nữa, hoặc để cho đẹp */}
                    <button className="profile__button" onClick={(e) => e.preventDefault()}>Thêm vào giỏ</button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;