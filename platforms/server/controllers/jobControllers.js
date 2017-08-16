import 'babel-polyfill'
import Job from '../models/JobModel'

class JobControllers {
    async find(ctx) {
        const jobAll = await Job.find().catch(err=>{
            ctx.throw(400,'查询错误')
        })
        ctx.body = {
            res : "suc",
            jobAll :jobAll
        }
    }

    async findById(ctx) {
        try {
            const job = await Job.findById(ctx.params.id)
            if (!job) {
                ctx.throw(404)
            }
            ctx.body = job;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }

    async getByNum(ctx){
        try{
            let where = {j_num:ctx.params.j_num}
            const job = await Job.find(where).catch(err=>{
                ctx.throw(400,'按数据查询失败')
            })
            if(!job){
                ctx.throw(404)
            }
            ctx.body = job
        }catch(err){
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
    async add(ctx){
        console.log(ctx.request.body)
        let job = new Job({
            j_num : ctx.request.body.j_num,
            j_name : ctx.request.body.j_name,
            j_date : ctx.request.body.j_date,
            j_des : ctx.request.body.j_des
        })
        await job.save().catch(err=>{
            console.log(err)
        })
    }

    async update(ctx){
        try{
            console.log(ctx)
            const job = await Job.findByIdAndUpdate(ctx.params.id,ctx.request.body)
            if(!job){
                ctx.throw(404)
            }
            ctx.body = job
        }catch(err){
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }

    async delete(ctx){
        const j_id = ctx.params.j_num
        let where = {j_num:ctx.params.j_num}
        const job = await Job.findByIdAndRemove(j_id).catch(err=>{
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(400,'id不存在')
            }
            ctx.throw(500,'内部服务器错误')
        })
        ctx.body = {
            res :"suc"
        }
    }
}

export default new JobControllers()