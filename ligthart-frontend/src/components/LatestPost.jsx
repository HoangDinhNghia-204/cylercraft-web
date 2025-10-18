import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LatestPost.css';

const LatestPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        axios.get(`${API_BASE_URL}/updates/latest`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.error("Could not fetch latest post", err);
                setPost(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [API_BASE_URL]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px 0' }}>Đang tải...</div>;
    }

    if (!post || !post.id) {
        return null;
    }

    return (
        <Link to={`/updates/${post.id}`} className="latest-post-card-minimal">
            {post.image_url && (
                <div className="post-image-minimal">
                    <img src={`${STORAGE_URL}/${post.image_url}`} alt={post.title} />
                </div>
            )}
            <div className="post-content-minimal">
                <h3>{post.title}</h3>
                <p className="post-description-minimal">{post.description}</p>
                <div className="post-footer-minimal">
                    <i className="fa-regular fa-calendar"></i>
                    <span>{formatDate(post.created_at)}</span>
                </div>
            </div>
        </Link>
    );
};

export default LatestPost;