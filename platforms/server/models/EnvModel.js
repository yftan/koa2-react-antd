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
});

if(mongoose.model.Env){
    Env =  mongoose.model('Env') 
}else{
    Env = mongoose.model('Env',EnvSchema) 
}
export default Env
