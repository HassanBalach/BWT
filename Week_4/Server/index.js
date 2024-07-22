import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB.js';



dotenv.config()

const app = express()

connectDB()
const port = process.env.PORT || 3000;

app.get('/', (req,res)=>{
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})