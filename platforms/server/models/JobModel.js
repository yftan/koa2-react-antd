import mongoose from 'mongoose'
const Schema  = mongoose.Schema;

mongoose.Promise = global.Promise;
var Job;

const JobSchema = new Schema({
    j_num : String,
    j_name : String,
    j_date : String,
    j_des : String
},{collection : 'Job'});


Job = mongoose.models.Job || mongoose.model('Job',JobSchema);


export default Job



