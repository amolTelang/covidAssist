import React,{Fragment,useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

var hash;
function LoginRegister() {
  
    const [formData,setFormData]=useState({
        name:'',
        phone:'',
        otp:''
    });

    const {name,phone,otp}=formData;

    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value });

    const onClick1=async e=>{
         const user={
             name,
             phone
         }
         try {
             const config={
                 headers:{
                     'Content-Type':'application/json'
                 }
             }
             const body=JSON.stringify(user);
             const res=await axios.post('/api/users/sendOTP',body,config);
             console.log(res.data);
             hash=res.data.hash
             console.log(hash);
         } catch (error) {
             console.error(error.response.data);
         }
    }
    const onClick2=async e=>{
      const user={
          name,
          phone,
          hash,
          otp
      }
      console.log(user);
      try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body=JSON.stringify(user);
        const res=await axios.post('/api/users/verifyOTP',body,config);
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
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
            name='name' value={name} onChange={e=>onChange(e)} required />
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



    )
}

export default LoginRegister
