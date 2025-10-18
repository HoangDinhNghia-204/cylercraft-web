// src/pages/WikiArticleListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './WikiPage.css';

const WikiArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        setLoading(true);
        const fetchCategoryDetails = axios.get(`${API_BASE_URL}/wiki-categories/${categoryId}`);
        const fetchArticles = axios.get(`${API_BASE_URL}/wiki-articles?category=${categoryId}`);

        Promise.all([fetchCategoryDetails, fetchArticles])
            .then(([catRes, artRes]) => {
                setCategory(catRes.data);
                setArticles(artRes.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [categoryId, API_BASE_URL]);

    if (loading) return <div style={{color: '#fff', textAlign: 'center', padding: '50px 0'}}>Đang tải...</div>;

    return (
        <div className="wiki-page-dark-bg">
             <section className="page-header-dark">
                <div className="container">
                    <h1 className="title__text">{category?.name || 'Danh mục Wiki'}</h1>
                    <p className="regular__text">Danh sách các bài viết và hướng dẫn.</p>
                </div>
            </section>
            <div className="container" style={{padding: '50px 15px'}}>
                 <div className="article-list-dark">
                    {articles.length > 0 ? (
                        articles.map(article => (
                            <Link to={`/wiki/article/${article.id}`} key={article.id} className="article-item-dark">
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>
                            </Link>
                        ))
                    ) : (
                        <p>Chưa có bài viết nào trong danh mục này.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WikiArticleListPage;