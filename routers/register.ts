// 🟣🔴🟠🟡🟢🔵🟣⚫️⚪️🟤

import {Router} from 'express';
import { Auth } from '../models/User_authentication';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router =Router();


// AUTHENTICATION 🟣
router.post('/',async(req,res)=>{

    let user=await Auth.findOne({email:req.body.email});
    if(user) {return res.status(400).send("User already registered.🟣")};
    
    try{
        const Auth_User_Create=await Auth.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        Auth_User_Create.password=await bcrypt.hash(Auth_User_Create.password,salt);
        
        
        await Auth_User_Create.save();

        const token=jwt.sign({_id:Auth_User_Create._id}, `${process.env.TS_SALT_STRING_KEY}`);
        
        res.header('x-auth-token',token).status(200).send("Account is Authenticated🟢");
    }catch(e){
        res.status(400).send('Error in Authenticating User In the Database! 🔴');
    }
});

export default router;