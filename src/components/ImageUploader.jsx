import React, { useCallback } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ImageUploader = ({ onImageUpload }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 限制5MB
      onImageUpload(file);
    } else if (file) {
      alert('图片大小不能超过5MB');
    }
  };

  return (
    <div
      className="upload-container"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="upload-box">
        <FaCloudUploadAlt className="upload-icon" />
        <h3>上传图片</h3>
        <p>将图片拖放到此处，或点击选择文件</p>
        <p className="file-types">支持 JPG, PNG, WEBP 格式</p>

        <label className="file-input-label">
          选择图片
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;