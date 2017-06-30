/**
 * Created by tanyufeng on 2017/6/29.
 */
export default async (ctx,next) =>{
    ctx.body = require('../mock').envInfo();
}