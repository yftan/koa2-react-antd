import {EnvReadLine} from '../utils/envRead'
export default async (ctx, next) => {
  EnvReadLine('123')
  ctx.body = {
    status: 0,
    info: 'this is a demo api with path /api'
  }
}
