// 🟣🔴🟠🟡🟢🔵🟣⚫️⚪️🟤

import {Router} from 'express';
import  {Auth } from '../models/User_authentication';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const router =Router();


// AUTHENTICATION 🟣
router.post('/',async(req,res)=>{

    let user=await Auth.findOne({email:req.body.email});
    if(!user) {return res.status(400).send("Invalid Email or Password 🟣")};
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {return res.status(401).send("Invalid Email or Password 🟣")};

    const token=jwt.sign({_id:user._id}, `${process.env.TS_SALT_STRING_KEY}`);

    res.send(token);
});

export default router;
