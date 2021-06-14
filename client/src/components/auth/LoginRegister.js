import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getOtp, verifyOtp} from '../../actions/auth';



var hash;
const LoginRegister=({getOtp,verifyOtp,isAuthenticated})=> {
  
    const [formData,setFormData]=useState({
        userName:'',
        phone:'',
        otp:''
    });

    const {userName,phone,otp}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value });

    const onClick1=async e=>{
        getOtp({userName,phone});
    }
    const onClick2=async e=>{
        verifyOtp({userName,phone,otp})
     }

     //redirect if logged in
     if(isAuthenticated)
     {
        return <Redirect to='/oxygen'/>
     }
    return (
        <div className="bg-grey-lighter h-screen font-sans">
  <div className="container mx-auto h-full flex justify-center items-center">
    <div className="w-1/3">
      <h1 className="font-hairline mb-6 text-center">Login to our Website</h1>
      <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="font-bold text-grey-darker block mb-2">Name</label>
          <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username"
            name='userName' value={userName} onChange={e=>onChange(e)} required />
        </div>

        <div className="mb-4">
          <label className="font-bold text-grey-darker block mb-2">Phone No</label>
          <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Phone"
          name='phone' value={phone} onChange={e=>onChange(e)} required />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-50 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" onClick={e=>onClick1(e)}>Confirm</button>
        </div>
        <div className="mb-4">
          <label className="font-bold text-grey-darker block mb-2">OTP</label>
          <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="one time password"
          name='otp' value={otp} onChange={e=>onChange(e)} required />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-50 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" onClick={e=>onClick2(e)}>Login</button>
        </div>
      </div>
      
    </div>
  </div>
</div>

    );
};
LoginRegister.propTypes={
    getOtp:PropTypes.func.isRequired,
    verifyOtp:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect (mapStateToProps,{getOtp,verifyOtp})(LoginRegister);
