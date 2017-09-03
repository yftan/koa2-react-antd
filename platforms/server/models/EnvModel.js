import mongoose from 'mongoose'
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
var Env;
const EnvSchema = new Schema({
    Package: {
        type: String,
        require: true
    },
    Version: {
        type: String,
        require: true
    },
    Depends: {
        type: String,
        require: true
    },
    Origin: {
        type: String,
        require: false
    }
},{collection:'Env'});

//注意此处是mongoose.models要带复数的
Env = mongoose.models.Env || mongoose.model('Env', EnvSchema);
// Env =  mongoose.model('Env',EnvSchema) 

export default Env
