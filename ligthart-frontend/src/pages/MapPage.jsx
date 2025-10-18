// src/pages/MapPage.jsx
import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const MapPage = () => {

  const headerRef = useScrollAnimation();
  const mapContainerRef = useScrollAnimation();
  return (
    <>
      <section ref={headerRef} className="page-header element-animation">
        <div className="container">
          <h1 className="title__text">Bản Đồ Thế Giới</h1>
          <p className="regular__text">
            Khám phá thế giới của máy chủ trong thời gian thực. Theo dõi vị trí của người chơi, xem các công trình đã xây dựng và lên kế hoạch cho cuộc phiêu lưu tiếp theo của bạn.
          </p>
        </div>
      </section>
      <div className="container">
        <div ref={mapContainerRef} className="map-container element-animation">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447982183226!2d106.69532831526715!3d10.776983992320899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed8c7b%3A0x23294352252c0a4b!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1667888888888!5m2!1svi!2s"
            title="Bản đồ máy chủ"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default MapPage;