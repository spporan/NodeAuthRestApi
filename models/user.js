const Mongoose=require('mongoose')

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255,
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = Mongoose.model("User",userSchema);