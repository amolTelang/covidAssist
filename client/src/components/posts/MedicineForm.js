import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/medicinePost';

const OxygenForm = ({addPost}) => {
    const [formData,setFormData]=useState({
        userName:'',
        phone:'',
        address:'',
        quantity:'',
        price:'',
        lastTimeVerified:'',
        docsrequired:'',
        typeOfMedicine:''
    });

    const{userName,phone,address,quantity,price,lastTimeVerified,typeOfMedicine,docrequired}=formData
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    return (
       
      <div class="flex justify-center items-center h-screen w-full bg-blue-400">
      <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Details</h1>
        <form   onSubmit={e => {
          e.preventDefault();
          addPost({userName,phone,address,quantity,price,lastTimeVerified,typeOfMedicine,docrequired});
        }}>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">Name</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="userName" id="userName" value={userName} onChange={e=>onChange(e)}/> 
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="phone">Phone No</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="phone" id="phone" value={phone} onChange={e=>onChange(e)} />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="quantity">Medicines Available</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="typeOfMedicine" id="quantity" value={typeOfMedicine} onChange={e=>onChange(e)} />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="lastTimeVerified">Quantity</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="quantity" id="lastTimeVerified" value={quantity} onChange={e=>onChange(e)} />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="price">Price</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="price" id="price" value={price} onChange={e=>onChange(e)}/>
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="docrequired">Documents Required</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="docrequired" id="docrequired" value={docrequired} onChange={e=>onChange(e)} />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="location">Address</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="address" id="location" value={address} onChange={e=>onChange(e)} />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="lastTimeVerified">Last Time Verified</label>
            <input class="border py-2 px-3 text-grey-800" type="text" name="lastTimeVerified" id="lastTimeVerified" value={lastTimeVerified} onChange={e=>onChange(e)} />
          </div>
          
    
          <button class="block bg-blue-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto py-2 px-4 rounded" type="submit">Post</button>
        </form>
      </div>
    </div>
     
    )
}

OxygenForm.propTypes = {
addPost:PropTypes.func.isRequired,
}

export default connect(null,{addPost})(OxygenForm);

