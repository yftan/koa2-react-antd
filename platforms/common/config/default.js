/**
 * Server端的默认配置
 */
import path from 'path'

const rootPath = path.join(__dirname, '../../..')
export default {
  rootPath,
  publicPath: '/public',
  staticPath: '/public/static',
  port: 3099,
  // db: {
  //   dialect: 'sqlite',
  //   username: '',
  //   password: '',
  //   database: 'main',
  //   storage: 'path/to/db.sqlite'
  // },
  mongodburl:"mongodb://127.0.0.1:27017/GeoModeling"
}
