import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RpPage = () => {
    const [packs, setPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/resource-packs`);
                setPacks(response.data);
            } catch (err) {
                setError('Không thể tải danh sách gói tài nguyên.');
            } finally {
                setLoading(false);
            }
        };
        fetchPacks();
    }, [API_BASE_URL]);

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="title__text">Gói Tài Nguyên (Resource Pack)</h1>
                    <p className="regular__text">
                        Tải về gói tài nguyên chính thức của máy chủ để có được trải nghiệm hình ảnh và âm thanh tốt nhất, đồng bộ với tất cả các vật phẩm tùy chỉnh.
                    </p>
                </div>
            </section>
            <section className="cards" style={{ paddingTop: 0, paddingBottom: 80 }}>
                <div className="container">
                    {loading && <p style={{ textAlign: 'center' }}>Đang tải...</p>}
                    {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
                    
                    {!loading && !error && (
                        <div className="cards__content">
                            {packs.length > 0 ? (
                                packs.map(pack => (
                                    <div className="card" key={pack.id} style={{ flexBasis: '400px' }}>
                                        <div className="card__text">
                                            <h2 className="card__title">{pack.name}</h2>
                                            <p className="regular__text">{pack.description}</p>
                                            <a href={`${STORAGE_URL}/${pack.download_url}`} download>
                                                <button className="profile__button">Tải về</button>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có gói tài nguyên nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default RpPage;