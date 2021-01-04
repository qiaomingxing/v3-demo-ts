import axios from '@/request/axios'

//获取轮播图 T泛型，最终的返回结果
export function getSliders<T>() {
  return axios.get<T, T>('/api/banner/json')
}

// 获取项目分类
export function getProjectTrees<T>() {
  return axios.get<T, T>(`/api/project/tree/json`)
}

// 获取项目列表
export function getProjects<T>(category: string | number, pageNo: number = 1) {
  return axios.get<T, T>(`/api/project/list/${pageNo}/json?cid=${category}`)
}

export default {
  getSliders: '/api/banner/json',
  getProjectTrees: '/api/project/tree/json',
  getProjects: '/api/project/list/1/json?cid=294'
}
