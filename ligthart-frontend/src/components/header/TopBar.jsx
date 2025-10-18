// TopBar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        if (isOpen) {
            htmlElement.classList.add('mobile-menu-open');
            bodyElement.classList.add('mobile-menu-open');
        } else {
            htmlElement.classList.remove('mobile-menu-open');
            bodyElement.classList.remove('mobile-menu-open');
        }

        return () => {
            htmlElement.classList.remove('mobile-menu-open');
            bodyElement.classList.remove('mobile-menu-open');
        };
    }, [isOpen]);

    const handleNavigateAndClose = (path) => {
        onClose();
        navigate(path);
    };
    
    const handleLogoutAndClose = () => {
        onClose();
        logout();
        navigate('/');
    };

    return (
        <>
            <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`mobile-menu-panel ${isOpen ? 'active' : ''}`}>
                <button className="mobile-menu-close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <ul>
                    <li><Link to="/" onClick={onClose}>Home</Link></li>
                    <li><Link to="/wiki" onClick={onClose}>Wiki</Link></li>
                    <li><Link to="/updates" onClick={onClose}>Cập nhật</Link></li>
                    <li><Link to="/staff" onClick={onClose}>Nhân sự</Link></li>
                </ul>
                <hr style={{margin: '15px 0', borderColor: '#444'}}/>
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/profile" onClick={onClose}>Tài khoản</Link></li>
                            {user?.is_admin === 1 && <li><Link to="/admin" onClick={onClose}>Quản trị</Link></li>}
                            <li><a href="#" onClick={handleLogoutAndClose} style={{color: '#ff4d4d'}}>Đăng xuất</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={onClose}>Đăng Nhập</Link></li>
                            <li><Link to="/register" onClick={onClose}>Đăng Ký</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

const TopBar = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const STORAGE_URL = 'http://127.0.0.1:8000/storage';

    const handleLogout = () => {
        setIsDropdownOpen(false);
        logout();
        navigate('/');
    };
    
    const handleNavigate = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="top-bar">
            <nav className="top-bar-nav">
                <div className="menu-center">
                    <NavLink to="/" end className="image-link">
                        <img src="../../../public/images/IMG_6189.webp" alt="Home" />
                    </NavLink>
                    <NavLink to="/wiki" className="image-link">
                        <img src="../../../public/images/IMG_6188.webp" alt="Wiki" />
                    </NavLink>
                    <NavLink to="/updates" className="image-link">
                        <img src="../../../public/images/IMG_6190.webp" alt="Cập nhật" />
                    </NavLink>
                    <NavLink to="/staff" className="image-link">
                        <img src="../../../public/images/IMG_6255.webp" alt="Staff" />
                    </NavLink>
                </div>

                <div className="menu-right" ref={dropdownRef}>
                    {isLoggedIn ? (
                        <div className="user-account-menu">
                             <button className="user-icon-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {user.avatar_url ? (
                                    <img src={`${STORAGE_URL}/${user.avatar_url}`} alt={user.name} />
                                ) : (
                                    <i className="fa-solid fa-user"></i>
                                )}
                            </button>
                            <div className={`account-dropdown ${isDropdownOpen ? 'active' : ''}`}>
                                <ul>
                                    <li className="dropdown-user-info">
                                        <div className="name">{user.name}</div>
                                        <div className="email">{user.email}</div>
                                    </li>
                                    {user?.is_admin === 1 && (
                                        <li><button onClick={() => handleNavigate('/admin')}><i className="fa-solid fa-shield-halved"></i> Trang Quản Trị</button></li>
                                    )}
                                    <li><button onClick={() => handleNavigate('/profile')}><i className="fa-solid fa-address-card"></i> Tài khoản của tôi</button></li>
                                    <li><button className="logout-item" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất</button></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login">Đăng Nhập</NavLink>
                            <NavLink to="/register" className="register-link">
                                <i className="fa-solid fa-user-plus"></i> Đăng Ký
                            </NavLink>
                        </>
                    )}
                </div>
                
                <button className="mobile-burger-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </nav>
            
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
    );
};

export default TopBar;