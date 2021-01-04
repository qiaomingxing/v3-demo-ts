import request from '../request'

const modulesFiles = require.context('./modules', true, /\.ts$/)
// 注册
modulesFiles.keys().forEach(modulePath => {
  console.log(modulePath)
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  request.reg(moduleName, value.default)
})

export default request
