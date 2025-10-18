import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MainHeader = ({ serverInfo }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isIpHovered, setIsIpHovered] = useState(false);
    const [isDiscordHovered, setIsDiscordHovered] = useState(false);

    const handleCopy = () => {
        if (serverInfo?.ip_address && !isCopied) {
            navigator.clipboard.writeText(serverInfo.ip_address).then(() => {
                setIsCopied(true);
                toast.success('Copy IP thành công! Cùng vào server nhóe.', {
                    duration: 4000,
                    icon: '🎮',
                    style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '8px',
                    },
                });
                setTimeout(() => setIsCopied(false), 3000);
            });
        }
    };

    return (
        <div className="container">
            <div className="main-header">
                <div 
                    className="server-info" 
                    onClick={handleCopy}
                    onMouseEnter={() => setIsIpHovered(true)}
                    onMouseLeave={() => setIsIpHovered(false)}
                >
                    <div className="info-icon">
                        <i className="fa-solid fa-play"></i>
                    </div>
                    <div className="info-text">
                        <div className="scrolling-text-wrapper">
                            <div className="scrolling-text-inner">
                                <p className="label scroll-line">{isCopied ? 'Đã sao chép!' : 'Server Minecraft'}</p>
                            </div>
                        </div>
                         <div className="scrolling-text-wrapper">
                            <div className="scrolling-text-inner" style={{ transform: isIpHovered ? 'translateY(-22px)' : 'translateY(0)' }}>
                                <p className="value scroll-line">{serverInfo?.ip_address || 'Loading...'}</p>
                                <p className="value scroll-line">Click để sao chép</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link to="/" className="main-logo">
                    <img src="/images/IMG_6153-removebg-preview (1).png" alt="Server Logo" />
                </Link>

                <a 
                    href={serverInfo?.discord_url || "https://discord.gg/x42jbZ7QPb"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="discord-info"
                    onMouseEnter={() => setIsDiscordHovered(true)}
                    onMouseLeave={() => setIsDiscordHovered(false)}
                >
                    <div className="info-text">
                        <div className="scrolling-text-wrapper">
                            <div className="scrolling-text-inner">
                                <p className="label scroll-line">Tham gia cộng đồng người chơi</p>
                            </div>
                        </div>
                         <div className="scrolling-text-wrapper">
                            <div className="scrolling-text-inner" style={{ transform: isDiscordHovered ? 'translateY(-22px)' : 'translateY(0)' }}>
                                <p className="value scroll-line">Discord Server</p>
                                <p className="value scroll-line">Click để tham gia</p>
                            </div>
                        </div>
                    </div>
                    <div className="info-icon">
                        <i className="fa-brands fa-discord"></i>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MainHeader;