import { CATEGORY_TYPES } from '@/typings/home'
import axios from '..'

//获取轮播图 T泛型，最终的返回结果
export function getSliders<T>() {
    return axios.get<T, T>('/slider/list')
}

// 获取课程列表
export function getLessons<T>(category: CATEGORY_TYPES, offset: number = 0, limit: number = 5) {
    return axios.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}
