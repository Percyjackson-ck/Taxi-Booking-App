import express from 'express';
import dotevn from 'dotenv'
import cors from 'cors'
import connectToDb from './db/db.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import { cookie } from 'express-validator';
import captainRoutes from './routes/captainRoutes.js'
const app=express();
dotevn.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
connectToDb();



app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})




app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

export default app
  