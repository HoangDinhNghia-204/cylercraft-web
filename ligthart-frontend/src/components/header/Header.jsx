// src/components/header/Header.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import MainHeader from './MainHeader';
import { Toaster } from 'react-hot-toast';
import './Header.css';
import Bubbles from './Bubbles';

const Header = () => {
    const [serverInfo, setServerInfo] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/server-info`)
            .then(response => {
                setServerInfo(response.data);
            })
            .catch(error => {
                console.error("Could not fetch server info", error);
                setServerInfo({ ip_address: "IP Lỗi", discord_url: "#" });
            });
    }, [API_BASE_URL]);

    return (
        // Bây giờ chỉ có MainHeader nằm trong container có ảnh nền
            <div className="main-header-background">
                <Bubbles />
                <Toaster position="top-center" reverseOrder={false} />
                <MainHeader serverInfo={serverInfo} />
            </div>
    );
};

export default Header;