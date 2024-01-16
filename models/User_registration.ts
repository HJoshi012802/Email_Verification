import mongoose from "mongoose";


const UserSchema =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
phone_no:{
    type:String,
    required:true,
},
age:{
    type:Number,
    min:0,
    max:110
},
gender:{
    type:String,
    enum:['Male','Female','Other'],
},
address:{
    type:String,
},
is_programmer:{
    type:Boolean,
    default:false,
},
skills:{
    type:[String],
},
picture:{
    type: String,
}
});

const User =mongoose.model('user',UserSchema);

export {User};