import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { addSantaHatToImage } from './services/apiService';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('识别图中的人物或动物，在他们的头顶添加一顶美观的圣诞帽');

  const handleImageUpload = async (file) => {
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setError(null);

    // 自动开始处理
    setLoading(true);
    try {
      const result = await addSantaHatToImage(file, prompt);
      setProcessedImage(result.processedImageUrl);
    } catch (err) {
      setError(err.message || '处理失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎅 AI圣诞帽添加器 🎄</h1>
        <p>上传图片，AI自动识别并添加圣诞帽</p>
      </header>

      <main className="main-content">
        {/* 上传区域 */}
        <div className="upload-section">
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="processing-section">
              <h3>正在处理您的图片...</h3>
              <div className="prompt-section">
                <label>AI提示词:</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows="2"
                />
              </div>
            </div>
          )}
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>AI正在处理图片...</p>
            <p className="loading-subtext">这可能需要几秒钟时间</p>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={() => setError(null)}>重试</button>
          </div>
        )}

        {/* 结果显示 */}
        {originalImage && processedImage && (
          <ResultDisplay
            originalImage={originalImage}
            processedImage={processedImage}
            onNewImage={() => {
              setOriginalImage(null);
              setProcessedImage(null);
            }}
          />
        )}
      </main>

      <footer className="footer">
        <p>Powered by AI | 使用大模型API处理图片</p>
      </footer>
    </div>
  );
}

export default App;