import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDb from './db/db.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import { cookie } from 'express-validator';
import captainRoutes from './routes/captainRoutes.js'
import mapsRoutes from './routes/mapRoutes.js'
import rideRoutes from './routes/rideRoutes.js'
const app=express();
dotenv.config()
// app.use(cors());
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
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);


export default app
  