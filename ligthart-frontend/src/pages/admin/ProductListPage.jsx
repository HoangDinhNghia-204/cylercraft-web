import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPages.css';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/products`);
                setProducts(response.data.data || response.data);
            } catch (err) {
                setError('Không thể tải danh sách sản phẩm.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_BASE_URL]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert('Xóa sản phẩm thất bại!');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Đang tải danh sách sản phẩm...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Quản lý Sản Phẩm</h1>
                <Link to="/admin/products/new" className="admin-button">Thêm Sản Phẩm Mới</Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{Number(product.price).toLocaleString('vi-VN')} VNĐ</td>
                                <td className="actions">
                                    <Link to={`/admin/products/edit/${product.id}`} className="admin-button edit">Sửa</Link>
                                    <button onClick={() => handleDelete(product.id)} className="admin-button delete">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có sản phẩm nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListPage;