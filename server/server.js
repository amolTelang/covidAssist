
//setting up express
const express = require('express');
//middleware to connect to db
const connectDB=require('./config/db');
//cross platform compatibility
const cors=require('cors');


//init express
const app=express();


//enable cross platfrom service
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


//connect database
connectDB();

//init body-parser Middelware
app.use(express.json({extended:false}))



//define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));



//port env for production server
const PORT= process.env.PORT || 5000;

//starts the server
app.listen(PORT,()=>console.log(`server has started on ${PORT}`));