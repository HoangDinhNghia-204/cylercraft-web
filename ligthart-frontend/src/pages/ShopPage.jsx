// src/pages/ShopPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './ShopPage.css'; // Import file CSS mới

const ShopPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // State cho các bộ lọc
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(500000); // Giá trị max mặc định

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Chỉ fetch dữ liệu 1 lần khi component mount
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const productsPromise = axios.get(`${API_BASE_URL}/products`);
                const categoriesPromise = axios.get(`${API_BASE_URL}/categories`);

                const [productsRes, categoriesRes] = await Promise.all([productsPromise, categoriesPromise]);

                setAllProducts(productsRes.data);
                setCategories(categoriesRes.data.data || categoriesRes.data);
            } catch (err) {
                setError('Không thể tải dữ liệu trang cửa hàng.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [API_BASE_URL]);

    // Lọc sản phẩm ở phía client để có trải nghiệm mượt mà
    const filteredProducts = useMemo(() => {
        return allProducts
            .filter(product => {
                // Lọc theo danh mục
                if (selectedCategory && product.category_id !== selectedCategory) {
                    return false;
                }
                // Lọc theo tên
                if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return false;
                }
                // Lọc theo giá
                if (product.price > priceRange) {
                    return false;
                }
                return true;
            });
    }, [allProducts, selectedCategory, searchTerm, priceRange]);

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="title__text">Cửa Hàng Vật Phẩm</h1>
                    <p className="regular__text">
                        Khám phá các vật phẩm, gói tài nguyên và đặc quyền đặc biệt để nâng cao trải nghiệm của bạn.
                    </p>
                </div>
            </section>

            <div className="container">
                {loading && <p style={{ textAlign: 'center', padding: '50px 0' }}>Đang tải...</p>}
                {error && <p style={{ textAlign: 'center', color: 'red', padding: '50px 0' }}>{error}</p>}
                
                {!loading && !error && (
                    <div className="shop-layout">
                        <aside className="shop-sidebar">
                            <div className="filter-group">
                                <h4>Tìm kiếm</h4>
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    placeholder="Tên sản phẩm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="filter-group">
                                <h4>Danh mục</h4>
                                <ul className="category-list">
                                    <li 
                                        onClick={() => setSelectedCategory(null)}
                                        className={!selectedCategory ? 'active' : ''}
                                    >
                                        Tất cả
                                    </li>
                                    {categories.map(category => (
                                        <li 
                                            key={category.id} 
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={selectedCategory === category.id ? 'active' : ''}
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="filter-group">
                                <h4>Khoảng giá</h4>
                                <div className="price-range">
                                    <label htmlFor="price">Dưới: <span className="price-display">{Number(priceRange).toLocaleString('vi-VN')} VNĐ</span></label>
                                    <input 
                                        type="range" 
                                        id="price" 
                                        min="50000" 
                                        max="500000" 
                                        step="10000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </aside>

                        <div className="shop-products">
                            <h3>Hiển thị {filteredProducts.length} sản phẩm</h3>
                            <div className="shop-grid">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <p className="no-products">Không tìm thấy sản phẩm nào phù hợp.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShopPage;