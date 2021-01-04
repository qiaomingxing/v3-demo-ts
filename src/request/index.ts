import axios from './axios'

interface IObject {
  [name: string]: any
}

interface IConfig {
  method?: string
  data?: any
  async?: boolean
  model?: any
  success?: any
}

class request {
  axios: any
  nowhandle: any;
  [name: string]: any

  constructor() {
    this.axios = axios
    this.nowhandle = null
  }
  // 注册vue实例
  vm(vueObj: any) {
    this.nowhandle = vueObj
    return this
  }
  // 注册模块
  reg<T>(moduleName: string, urlObj: IObject) {
    var obj: IObject = (this[moduleName] = {})
    // 类似api
    Object.keys(urlObj).forEach(urlName => {
      obj[urlName] = this.req.bind(this, moduleName, urlName, urlObj[urlName])
      obj[urlName].state = 'ready'
    })
  }
  /**
   * 发送请求
   * @param {*} moduleName : api 模块名称
   * @param {*} name : url 名称
   * @param {*} url : url 地址
   * @param {*} config : 开放配置
   */
  req<T>(moduleName: string, name: string, url: string, config: IConfig = {}) {
    var method = config.method || 'get' // 请求类型，get,post,put,delete
    var data = config.data || {} // 参数
    var async = config.async || false // 是否异步
    var model = config.model || name // data中双向绑定的对象
    var self = this // 实例指向

    var beforeFn = function(res: any) {
      self[moduleName][name].state = 'ready'
      return res
    }
    // 默认回调
    var defaultFn = function(res: any) {
      if (self.nowhandle) self.nowhandle[model + 'Model'] = res.data
      return res.data
    }
    // 成功回调
    var successFn = config.success || defaultFn
    // 失败回调
    var errorFn = function(err: any) {
      return err
    }
    // 回调
    var callbackFn = function(res: any) {
      return successFn(res, defaultFn)
    }
    if (this[moduleName][name].state === 'ready') {
      this[moduleName][name].state = 'waiting'
      return this.axios[method](url, data)
        .then(beforeFn)
        .then(callbackFn)
        .catch(errorFn)
    }
  }
}

export default new request()
