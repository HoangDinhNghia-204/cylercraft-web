// src/components/AccordionItem.jsx
import React, { useState, useRef, useEffect } from 'react';

const AccordionItem = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  
  // Sử dụng ref để lấy chiều cao thực của nội dung
  const contentHeight = isOpen ? contentRef.current?.scrollHeight : 0;

  return (
    <li className={`accordion ${isOpen ? 'open' : ''}`}>
      <button className="accordion__control" aria-expanded={isOpen} onClick={onToggle}>
        <span className="accordion__title">{item.title}</span>
        <span className="accordion__icon"></span>
      </button>
      <div
        ref={contentRef}
        className="accordion__content"
        aria-hidden={!isOpen}
        style={{ maxHeight: `${contentHeight}px` }}
      >
        {/* dangerouslySetInnerHTML được dùng ở đây để render tag <u>.
            Trong dự án thực tế, nên dùng một thư viện Markdown hoặc một cách khác an toàn hơn.
        */}
        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
      </div>
    </li>
  );
};

export default AccordionItem;