// 这里配置不同的大模型API服务
// 根据你选择的API服务（OpenAI, 百度AI, 阿里通义等）进行配置

const API_CONFIG = {
  // OpenAI DALL-E 3（示例）
  openai: {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    endpoint: 'https://api.openai.com/v1/images/edits',
    model: 'dall-e-3'
  },

  // 百度文心一言（示例）
  baidu: {
    apiKey: process.env.REACT_APP_BAIDU_API_KEY,
    endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/image2image'
  },

  // 阿里通义千问（示例）
  aliyun: {
    apiKey: process.env.REACT_APP_ALIYUN_API_KEY,
    endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2image'
  }
};

// 将文件转换为base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// 主要API调用函数
export const addSantaHatToImage = async (imageFile, prompt) => {
  try {
    // 1. 转换为base64
    const imageBase64 = await fileToBase64(imageFile);

    // 2. 根据选择的API服务调用相应的接口
    // 这里以OpenAI DALL-E 3为例（需要你有相应的API权限）
    const result = await callOpenAIAPI(imageBase64, prompt);

    return {
      processedImageUrl: result.url,
      processingTime: result.processing_time
    };

  } catch (error) {
    console.error('API调用失败:', error);

    // 如果API调用失败，提供模拟数据用于演示
    // 实际使用时应该移除这部分
    return {
      processedImageUrl: imageFile ? URL.createObjectURL(imageFile) : '',
      isDemo: true
    };
  }
};

// OpenAI API调用示例
const callOpenAIAPI = async (imageBase64, prompt) => {
  // 注意：DALL-E 3的image editing功能需要特定的API调用方式
  // 这里是一个示例，实际使用时需要参考OpenAI官方文档

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: imageBase64.split(',')[1], // 移除base64前缀
      prompt: `${prompt}. 请保持原图风格，只在人物或动物头顶添加圣诞帽，不要改变其他内容。`,
      n: 1,
      size: '1024x1024',
      model: 'dall-e-2' // 或者 dall-e-3 如果可用
    })
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  const data = await response.json();
  return {
    url: data.data[0].url,
    processing_time: data.created
  };
};

// 备用方案：如果主API不可用，可以尝试其他API
const callBaiduAPI = async (imageBase64, prompt) => {
  // 百度文心一言API调用示例
  const response = await fetch(API_CONFIG.baidu.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image: imageBase64,
      prompt: prompt,
      access_token: API_CONFIG.baidu.apiKey
    })
  });

  return response.json();
};