import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UpdatePage.css';

const PostCard = ({ post }) => {
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Link to={`/updates/${post.id}`} className="update-post-card">
            {post.image_url && (
                <div className="post-image-wrapper">
                    <img src={`${STORAGE_URL}/${post.image_url}`} alt={post.title} />
                </div>
            )}
            <div className="post-content-wrapper">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-date">{formatDate(post.created_at)}</p>
                <p className="post-excerpt">{post.description}</p>
                <span className="read-more-btn">Đọc thêm →</span>
            </div>
        </Link>
    );
};

const UpdatePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/updates`)
            .then(res => setPosts(res.data))
            .finally(() => setLoading(false));
    }, [API_BASE_URL]);
    
    const featuredPost = posts[0];
    const morePosts = posts.slice(1);

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="title__text">Cập nhật & Thông báo</h1>
                    <p className="regular__text">Theo dõi các bản cập nhật, sự kiện và thông báo mới nhất từ server.</p>
                </div>
            </section>
            <div className="container update-page-container">
                {loading ? <p>Đang tải...</p> : (
                    <>
                        {featuredPost && (
                             <Link to={`/updates/${featuredPost.id}`} className="featured-post">
                                <div className="featured-post-image">
                                    <img src={`http://127.0.0.1:8000/storage/${featuredPost.image_url}`} alt={featuredPost.title} />
                                </div>
                                <div className="featured-post-content">
                                    <p className="category">Cập nhật mới nhất</p>
                                    <h2>{featuredPost.title}</h2>
                                    <p className="description">{featuredPost.description}</p>
                                    <div className="post-meta">
                                        <span className="author">Admin</span>
                                        <span>•</span>
                                        <span>{new Date(featuredPost.created_at).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </Link>
                        )}
                        
                        {morePosts.length > 0 && (
                            <div className="more-posts-grid">
                                {morePosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default UpdatePage;