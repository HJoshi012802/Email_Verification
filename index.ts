import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRouter from './routers/api';
import authRouter from './routers/auth';
import registerRouter from './routers/register';
import auth_Mid from './middleware/auth';

dotenv.config();
const connection=process.env.TS_MONGO_DB_CONNECTION_KEY;

const app =express();
app.use(express.json());



app.use('/api',apiRouter);
app.use('/auth',authRouter);
app.use('/register',registerRouter);


app.get('/',(req:any,res:any)=>{
    res.send('Hello This is a Registeration Form, Welcome 🟠')
})

app.listen(process.env.TS_PORT_KEY,async()=>{
    await connect_to_db(connection);
    console.log(`Server is Running at Port ${process.env.TS_PORT_KEY} 🟢`);
});




async function connect_to_db(connection:string |undefined){
if(typeof connection!== "string"){
    console.log(`Error In Connecting Database To Server Due TO wrong Connection Key 🔴`);
    return;
}
try{ 
    await mongoose.connect(connection);
    console.log(`Database Is Connecting To Server:${process.env.TS_PORT_KEY} 🟡`);
}catch(e){
    console.log(`Error In Connecting Database To Server:${process.env.TS_PORT_KEY} 🔴`);
    }
}