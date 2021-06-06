const express = require('express');
const connectDB=require('./config/db');
require('dotenv').config();

const accoundSid=process.env.ACCOUNT_SID;
const authToken=process.env.AUTH_TOKEN;
const client=require('twilio')(accountSid,authToken);
const JWT_AUTH_TOKEN=process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN=process.env.JWT_REFRESH_TOKEN;
const smsSceret=process.env.SMS_SECRET_KEY;


const app=express();

//connect database
connectDB();

//init Middelware
app.use(express.json({extended:false}))

app.get('/',(req,res)=>res.send('API Runnign'));

//define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));




const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`server has started on ${PORT}`));