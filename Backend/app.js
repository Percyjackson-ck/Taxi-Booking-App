import express from 'express';
import dotevn from 'dotenv'
dotevn.config()
import cors from 'cors'
app.use(cors());
const app=express();
app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})
export default app
  