const express = require('express');
const router=express.Router();


//@router GET api/auth
//@desc Test route
//@access public
router.get('/',(req,res)=>res.send('auth route'));

module.exports=router;