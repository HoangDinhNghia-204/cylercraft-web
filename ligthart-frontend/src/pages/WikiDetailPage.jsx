import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import './WikiPage.css';

const WikiDetailPage = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${API_BASE_URL}/wiki-articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id, API_BASE_URL]);

    if (loading) return <div className="container" style={{ padding: '50px 0', color: '#fff' }}>Đang tải...</div>;
    if (!article) return <div className="container" style={{ padding: '50px 0', color: '#fff' }}>Không tìm thấy bài viết.</div>;

    return (
        <div className="wiki-page-dark-bg">
            <div className="container wiki-detail-container">
                <div className="wiki-detail-content-dark">
                    <div className="breadcrumb-dark">
                        <Link to="/wiki">Wiki</Link> / 
                        {article.wiki_category && (
                            <Link to={`/wiki?category=${article.wiki_category.id}`}> {article.wiki_category.name}</Link>
                        )}
                         / <span> {article.title}</span>
                    </div>
                    <h1>{article.title}</h1>
                    <p className="description-dark">{article.description}</p>
                    <div className="ql-snow" style={{border: 'none'}}>
                        <div 
                            className="ql-editor main-content-dark" 
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            style={{padding: 0}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WikiDetailPage;