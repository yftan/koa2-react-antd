import 'babel-polyfill'
import RiverPtInfo from '../models/RiverPtInfoModel'
import koaBody from 'koa-body'
import uuid from 'uuid'
import fs from 'fs'

class RiverPtInfoControllers{
    async find(ctx){
        ctx.body = await RiverPtInfo.find()
    }

    async findById(ctx){
        try{
            const riverPtInfo = await RiverPtInfo.findById(ctx.params.id)
        }catch(err){
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }

    async add(ctx){
        //console.log(ctx.request.body)
        if(ctx.request.body == ''){
            return ctx.body={
                res : 'res',
                mess : 'Error formdiable new RptInfo !'
            }
        }
        if(ctx.request.body.files.fileImg == null || ctx.request.body.files.fileImg == undefined){
            ctx.request.body.fields['rt_img'] = '';
        }else{
            let rt_img = ctx.request.body.fields['rt_num'] + '_'+uuid.v4();
            if(ctx.request.body.files.fileImg.type == 'image/jpeg'){
                rt_img += '.jpg'
            }else if(ctx.request.body.files.fileImg.type == 'image/png'){
                rt_img += '.png'
            }
            ctx.request.body.fields['rt_img'] = rt_img
            fs.rename(ctx.request.body.files.fileImg.path,__dirname+'/../../../public/images/rivers'+rt_img)
        }
  
        let riverPtInfo = new RiverPtInfo({
            rt_time : ctx.request.body.fields.rt_time,
            rt_lng : ctx.request.body.fields.rt_lng,
            rt_lat : ctx.request.body.fields.rt_lat,
            j_num : ctx.request.body.fields.j_num,
            u_id : ctx.request.body.fields.u_id,
            rt_num : ctx.request.body.fields.rt_num,
            r_name : ctx.request.body.fields.r_name,
            rt_width : ctx.request.body.fields.rt_width,
            rt_depth : ctx.request.body.fields.rt_depth,
            rt_trans : ctx.request.body.fields.rt_trans,
            rt_black : ctx.request.body.fields.rt_black,
            rt_tree : ctx.request.body.fields.rt_tree,
            rt_pipe : ctx.request.body.fields.rt_pipe,
            rt_pipetext : ctx.request.body.fields.rt_pipetext,
            rt_o2 : ctx.request.body.fields.rt_o2,
            rt_pot : ctx.request.body.fields.rt_pot,
            rt_ph : ctx.request.body.fields.rt_ph,
            rt_img : ctx.request.body.fields.rt_img,
            rt_note : ctx.request.body.fields.rt_note
        })
        await riverPtInfo.save().catch(err=>{
            console.log(err)
        })
    }

    async update(ctx){
        try{
            const riverPtInfo = await RiverPtInfo.findById(ctx.params.id)
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

    async delete(){
        try{
            const riverPtInfo = await findByIdAndRemove(ctx.params.id)
            if(!riverPtInfo){
                ctx.throw(404)
            }
        }catch(err){
            if (err.name === 'CastErrpr' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
}

export default new RiverPtInfoControllers();