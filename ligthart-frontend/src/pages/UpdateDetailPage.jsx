import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './UpdateDetailPage.css';
import 'react-quill/dist/quill.snow.css';

const UpdateDetailPage = () => {
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';
    
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);

        const fetchPost = axios.get(`${API_BASE_URL}/updates/${id}`);
        const fetchRecentPosts = axios.get(`${API_BASE_URL}/updates/recent/${id}`);

        Promise.all([fetchPost, fetchRecentPosts])
            .then(([postRes, recentRes]) => {
                setPost(postRes.data);
                setRecentPosts(recentRes.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id, API_BASE_URL]);
    
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    const formatShortDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');


    if (loading) return <div className="container" style={{padding: '50px 0', textAlign: 'center', color: '#fff'}}>Đang tải...</div>;
    if (!post) return <div className="container" style={{padding: '50px 0', textAlign: 'center', color: '#fff'}}>Không tìm thấy bài viết.</div>;

    return (
        <div className="update-detail-page">
            <div className="update-detail-grid">
                <main className="update-article-column">
                    <div className="breadcrumb-dark">
                        <Link to="/updates">Cập nhật</Link> / <span>{post.title}</span>
                    </div>
                    {post.image_url && <img src={`${STORAGE_URL}/${post.image_url}`} alt={post.title} className="post-header-image-dark" />}
                    <h1>{post.title}</h1>
                    <p className="post-meta-dark">Đăng bởi <strong>Admin</strong> vào ngày {formatDate(post.created_at)}</p>
                    <div className="ql-snow" style={{border: 'none'}}>
                        <div className="ql-editor main-content-dark" dangerouslySetInnerHTML={{ __html: post.content }} style={{padding: 0}}></div>
                    </div>
                </main>

                <aside className="update-sidebar-column">
                    <div className="sidebar-widget author-box">
                        {user && user.avatar_url ? (
                            <img src={`${STORAGE_URL}/${user.avatar_url}`} alt={user.name} />
                        ) : (
                            <img src={`https://cravatar.eu/avatar/${user?.email || 'default'}?s=80`} alt="Admin avatar" />
                        )}
                        <h4 className="author-name">{user?.name || 'Admin'}</h4>
                        <p className="author-role">{user?.is_admin ? 'Quản trị viên' : 'Thành viên'}</p>
                    </div>
                    {recentPosts.length > 0 && (
                        <div className="sidebar-widget">
                            <h4>Bài viết gần đây</h4>
                            <ul className="recent-posts-list">
                                {recentPosts.map(p => (
                                    <li key={p.id}>
                                        <Link to={`/updates/${p.id}`}>
                                            {p.image_url ? (
                                                <img src={`${STORAGE_URL}/${p.image_url}`} alt={p.title} />
                                            ) : (
                                                <div className="recent-post-placeholder-img"></div>
                                            )}
                                            <div className="post-info">
                                                <span className="title">{p.title}</span>
                                                <span className="date">{formatShortDate(p.created_at)}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default UpdateDetailPage;