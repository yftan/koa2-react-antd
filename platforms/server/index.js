import Koa from 'koa'
import middlewareRegister from './middlewareRegister'
import mongoose from 'mongoose'
import {mongodb} from '../common/config'


mongoose.connect(mongodb);
mongoose.on(error,console.error);

const app = new Koa()
app.env = 'production'
middlewareRegister(app) // reg middleware


import http from 'http'
import config from '../common/config'
const server = http.createServer(app.callback())
server.listen(config.port, () => {
  console.log('App started, bind port %d, CTRL + C to terminate', config.port)
})

export default server
