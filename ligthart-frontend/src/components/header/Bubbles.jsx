import React, { useMemo } from 'react';

const Bubbles = ({ count = 60 }) => {
    const bubbles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const size = Math.random() * (40 - 5) + 5; // Kích thước ngẫu nhiên từ 5px đến 40px
            const left = Math.random() * 100; // Vị trí bắt đầu ngẫu nhiên
            const animationDuration = Math.random() * (25 - 10) + 10; // Thời gian bay ngẫu nhiên từ 10s đến 25s
            const animationDelay = Math.random() * 15; // Thời gian chờ ngẫu nhiên
            const xDrift = (Math.random() - 0.5) * 200; // Độ lảo đảo ngang ngẫu nhiên

            const style = {
                '--x-drift': `${xDrift}px`,
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
            };

            return <div key={i} className="bubble" style={style}></div>;
        });
    }, [count]);

    return <div className="bubbles">{bubbles}</div>;
};

export default Bubbles;