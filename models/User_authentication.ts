import mongoose from "mongoose";

const auth_Schema =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
}
});

const Auth =mongoose.model('authorization_Schema',auth_Schema);

export  {Auth};