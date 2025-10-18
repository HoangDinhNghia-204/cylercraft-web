import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WikiPage.css';

const WikiPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Hàm để gán icon dựa trên tên danh mục
    const getCategoryIcon = (categoryName) => {
        const name = categoryName.toLowerCase();
        if (name.includes('lệnh')) {
            return 'fa-solid fa-terminal';
        }
        if (name.includes('chơi')) {
            return 'fa-solid fa-gamepad';
        }
        if (name.includes('luật')) {
            return 'fa-solid fa-gavel';
        }
        return 'fa-solid fa-book'; // Icon mặc định
    };

    useEffect(() => {
        axios.get(`${API_BASE_URL}/wiki-categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);

    return (
        <div className="wiki-page-dark-bg">
            <section className="page-header-dark">
                <div className="container">
                    <h1 className="title__text">Wiki & Hướng Dẫn</h1>
                    <p className="regular__text">Chọn một danh mục để bắt đầu khám phá.</p>
                </div>
            </section>
            <div className="container" style={{padding: '50px 15px 80px'}}>
                {loading ? <p style={{color: '#fff', textAlign: 'center'}}>Đang tải danh mục...</p> : (
                    <div className="wiki-category-grid">
                        {categories.map(category => (
                            <Link to={`/wiki/category/${category.id}`} key={category.id} className="wiki-category-card">
                                <i className={getCategoryIcon(category.name)}></i>
                                <span>{category.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WikiPage;