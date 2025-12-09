import React from 'react';
import { FaDownload, FaRedo } from 'react-icons/fa';

const ResultDisplay = ({ originalImage, processedImage, onNewImage }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'santa-hat-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>✨ 处理完成！</h2>
        <button onClick={onNewImage} className="new-image-btn">
          <FaRedo /> 处理新图片
        </button>
      </div>

      <div className="image-comparison">
        <div className="image-column">
          <h3>原图</h3>
          <img src={originalImage} alt="原始图片" className="result-image" />
        </div>

        <div className="image-column">
          <h3>添加圣诞帽后</h3>
          <img src={processedImage} alt="处理后的图片" className="result-image" />
          <button onClick={downloadImage} className="download-btn">
            <FaDownload /> 下载图片
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;