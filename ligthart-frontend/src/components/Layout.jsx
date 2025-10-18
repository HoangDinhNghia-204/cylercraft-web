// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import TopBar from './header/TopBar'; // <-- Import TopBar
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <TopBar /> {/* <-- Đặt TopBar ở đây */}
      <Header /> {/* Header giờ chỉ chứa phần banner */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;