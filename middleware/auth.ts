import {Router} from 'express';
const router =Router();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction } from 'express';

dotenv.config();

  export default function auth_Mid(req: Request, res: Response, next: NextFunction){
    const token =req.header('x-auth-token');
    if(!token) return res.status(401).send("Access Denied. No Token Provided 🟣");

     try{
      const decoded =jwt.verify(token,`${process.env.TS_SALT_STRING_KEY}`);
      req.body.user=decoded;
      next();
     }catch(e){
        res.status(400).send('Invalid Token.')
     }
  }

