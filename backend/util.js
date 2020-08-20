import jwt from 'jsonwebtoken';
import { config } from 'dotenv/types';
import config from './config';
 const getToken =(User)=>{
     return jwt.sign({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
        },config.TWT_SECRET,{
            expiresIn:'48h'
        })
 }

 export {getToken}