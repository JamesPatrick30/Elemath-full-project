import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // example: 'https://your-backend.onrender.com/api'
  withCredentials: true,
  timeout: 120000
})

// 🔐 Add API key to every request
api.interceptors.request.use(config => {
  const apiKey = import.meta.env.VITE_API_KEY
  config.headers['Authorization'] = `Bearer ${apiKey}` // or 'x-api-key': apiKey
  return config
}, error => {
  return Promise.reject(error)
})

export default api
