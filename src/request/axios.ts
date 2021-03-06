import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// axios.defaults.baseURL = `https://www.wanandroid.com`

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.errorCode !== 0) {
      return Promise.reject(response.data.data)
    }
    return response.data.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
