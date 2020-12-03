export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

// 首页数据
export interface IHomeState {
  currentCategory: string | number // 当前项目分类
  sliders: ISlider[] // 轮播图数据
  projects: IProjects // 项目数据
  projectTrees: ITextValue[] // 项目分类数据
}

// 轮播图
export interface ISlider {
  imagePath: string // 图片地址
  url: string // 图片链接
}

// 项目分类数据
export interface IProjectTree {
  id: number // 项目id
  name: string // 项目名称
}

// 项目列表
export interface IProjects {
  hasMore: boolean // 是否有更多数据
  loading: boolean // 是否正在加载
  curPage: number // 当前页
  pageCount: number // 总页数
  datas: IProject[] // 数据
}

// 项目数据
export interface IProject {
  envelopePic: string // 缩略图
  link: string // 项目网站链接
  projectLink: string // 项目github链接
  title: string // 项目标题
  desc: string // 项目描述
  author: string // 作者
  niceDate: string // 时间
}

// 键值对数据
export interface ITextValue {
  text: string // 名称
  value: string | number // id
}
