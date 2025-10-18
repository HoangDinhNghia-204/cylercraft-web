import React, { useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';
import axios from 'axios';

const RichTextEditor = ({ value, onChange }) => {
    const quillRef = useRef(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                try {
                    // Hiển thị loading (tùy chọn)
                    const range = quillRef.current.getEditor().getSelection(true);
                    quillRef.current.getEditor().insertEmbed(range.index, 'image', '/images/loading.gif'); // Cần có ảnh loading

                    // Upload ảnh lên server
                    const response = await axios.post(`${API_BASE_URL}/admin/upload-image`, formData);
                    const imageUrl = response.data.url;

                    // Xóa ảnh loading và chèn ảnh thật
                    quillRef.current.getEditor().deleteText(range.index, 1);
                    quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
                    quillRef.current.getEditor().setSelection(range.index + 1);

                } catch (error) {
                    console.error('Image upload failed:', error);
                    quillRef.current.getEditor().deleteText(range.index, 1);
                    alert('Upload ảnh thất bại!');
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), [API_BASE_URL]);

    return (
        <ReactQuill 
            ref={quillRef}
            theme="snow" 
            value={value || ''} 
            onChange={onChange}
            modules={modules}
            className="rich-text-editor"
        />
    );
};

export default RichTextEditor;