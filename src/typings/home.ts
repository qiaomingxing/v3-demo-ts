export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES
  sliders: ISlider[]
  lessons: ILessons
}

export interface ISlider {
  url: string
}

export interface ILessons {
  hasMore: boolean
  loading: boolean
  offset: number
  limit: number
  list: ILesson[]
}

export interface ILesson {
  title: string
  video: string
  poster: string
  price: number
  category?: string
}
