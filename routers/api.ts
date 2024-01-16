// 🟣🔴🟠🟡🟢🔵🟣⚫️⚪️🟤

import {Router} from 'express';
import { User } from '../models/User_registration';
import bcrypt from 'bcrypt';
import auth_Mid from '../middleware/auth';
const router =Router();




router.get('/home',(req,res)=>{
    res.send('All The Registered Users 🟢')
});


// Create User   
router.post('/createUser',async(req,res)=>{

    let user=await User.findOne({email:req.body.email});
    if(user) {return res.status(400).send("User already Registered 🟣")};
    
    try{
        const User_create=await User.create({
            name:req.body.name,
            email:req.body.email,
            phone_no:req.body.phone_no,
            age:req.body.age,
            gender:req.body.gender,  //radio Button
            address:req.body.address,
            is_programmer:req.body.is_programmer,
            skills:req.body.skills,
            picture:req.body.picture,
        });

        const salt = await bcrypt.genSalt(10);
        User_create.email=await bcrypt.hash(User_create.email,salt);
        User_create.phone_no=await bcrypt.hash(User_create.phone_no,salt);
        
        await User_create.save();


        const name:String = req.body.name;
        console.log(`${name} is Created Into The Database 🟢`);
        res.status(200).json(User_create);
    }catch(e){
        console.log('Error in Creating User In the Database! 🔴');
    }
});


//Find By ID
router.get('/find_by_id/:id',async(req,res)=>{
 try{
    const user = await User.findById(req.params.id);
    console.log(`${user?.name} Is Retrived By ID 🟢`)
    res.status(200).json(user);
 }catch(e){
    console.log("No User Is Retrived By ID 🔴")
 }
});


//Find By Name
router.get('/find_by_name/:name',async(req,res)=>{
    try{
       const name ={name:req.params.name};
       const user = await User.findOne(name);
       console.log(`${req.params.name} Is Retrived By Name 🟢`)
       res.status(200).json(user);
    }catch(e){
       console.log("No User Is Retrived By Name 🔴")
    }
});


//Find All User
router.get('/getUsers',async(req,res)=>{
    try{
        const Users_data =await User.find({});
        console.log('All Users Retrieved From the Database! 🟢')
        res.status(200).json(Users_data);
    }catch(e){
        res.status(400).send("Error Occured In Retrieved From the Database (GET request /getUsers)! 🔴");
    }
});


// Update User by id
router.put('/update/:id',auth_Mid,async(req,res)=>{
   try{
    const customerId =req.params.id;
    const user = await User.findById(req.params.id);
    const updated = await User.replaceOne({_id:customerId},req.body);
    res.send(`Successfully Updated ${user?.name} 🟢` );
   } catch(e){
    res.send(`Cannot Updated user 🔴` );
   }
})

//Delete User by id
router.put('/update/:id',auth_Mid,async(req,res)=>{
    try{
        const customerId =req.params.id;
        const user = await User.findById(req.params.id);
        await User.deleteOne({_id:customerId});
        res.send(`Successfully Deleted ${user?.name} 🟢` );
    }catch(e){
        res.send(`Cannot Delete user 🔴` );
    }
    
})


export default router;