export const axiosUploadConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
  method: 'post',
  withCredentials: true, // default
  // http请求返回状态码检查
  validateStatus: status => status >= 200 && status < 300, // default
  // 返回数据预处理
  transformResponse: [respData => respData,
  ],
};

export const axiosDownloadConfig = {
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  // 跨域请求，是否带上认证信息
  withCredentials: true, // default
  // http返回的数据类型
  // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'blob', // default
  // http请求返回状态码检查
  validateStatus: status => status >= 200 && status < 300, // default
  // 请求数据预处理
  transformRequest: [(data, headers) => {
    // 请求对象转换成jon字符串
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    return data;
  }],
  // 返回数据预处理
  transformResponse: [respData => respData,
  ],
};

// axios配置
export const axiosBaseConfig = {
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  // 跨域请求，是否带上认证信息
  withCredentials: false, // default
  // http返回的数据类型
  // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // http请求返回状态码检查
  validateStatus: status => status >= 200 && status < 300, // default
  // 请求数据预处理
  transformRequest: [(data, headers) => {
    // 请求对象转换成jon字符串
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    return data;
  }],
};
