import mongoose from 'mongoose'
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var RiverPtInfo;

const RiverPtInfoSchema =  new Schema({
    rt_time : String,
    rt_lng : Number,
    rt_lat : Number,
    j_num : String,
    u_id : String,
    rt_num : String,
    r_name : String,
    rt_width : Number,
    rt_depth : Number,
    rt_trans : Number,
    rt_black : Number,
    rt_tree : Number,
    rt_pipe : Number,
    rt_pipetext : String,
    rt_o2 : Number,
    rt_pot : Number,
    rt_ph : Number,
    rt_img : String,
    rt_note : String
},{collection:'RiverPtInfo'});

RiverPtInfo = mongoose.model('RiverPtInfo',RiverPtInfoSchema)

export default RiverPtInfo;