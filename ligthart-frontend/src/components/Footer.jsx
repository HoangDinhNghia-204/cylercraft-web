import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-logo">
                            <img src="../../public/images/IMG_6153-removebg-preview (1).png" alt="Logo" />
                        </div>
                        <p className="footer-text">
                            © LigthartStudio・2022. Chúng tôi không có liên kết hoặc xác nhận nào bởi Mojang, AB.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Liên kết nhanh</h4>
                        <ul>
                            <li><Link to="/wiki">Wiki</Link></li>
                            <li><Link to="/updates">Cập nhật</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Hỗ trợ</h4>
                        <ul>
                            <li><Link to="/rules">Luật lệ</Link></li>
                            <li><a href="https://discord.gg/x42jbZ7QPb" target="_blank" rel="noopener noreferrer">Discord</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Website được thiết kế và phát triển bởi cộng đồng.</p>
                    <div className="footer-socials">
                        <a href="https://www.tiktok.com/@cylercraft" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-tiktok"></i></a>
                        <a href="https://www.youtube.com/@Tcelery" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://discord.gg/x42jbZ7QPb" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-discord"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100053009468658" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;