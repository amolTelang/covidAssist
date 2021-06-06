const express = require('express');
const connectDB=require('./config/db');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const app=express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
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