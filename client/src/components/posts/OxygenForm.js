import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/oxygenPost';

const OxygenForm = ({addPost}) => {
    const [formData,setFormData]=useState({
        userName:'',
        phone:'',
        location:'',
        quantity:'',
        price:'',
        lastTimeVerified:''
    });

    const{userName,phone,location,quantity,price,lastTimeVerified}=formData
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    return (
        <section className="min-h-screen text-gray-600 body-font justify-center sm:py-16 content-center ">
        <form class="flex flex-col justify-center items-center "
        onSubmit={e => {
          e.preventDefault();
          addPost({userName,phone,location,quantity,price,lastTimeVerified});
        }}>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
        Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="name" name='userName' value={userName}  onChange={e=>onChange(e)}/>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phoneno">
        phoneNo
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phoneno" type="text" placeholder="phoneno" name='phone' value={phone}  onChange={e=>onChange(e)}/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="Address">
        Address
      </label>
      <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Address" type="textarea" placeholder="address" name='location' value={location}  onChange={e=>onChange(e)}/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="quantity">
        quantiy
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="quantity" type="text" placeholder="No of cylinder" name='quantity' value={quantity}  onChange={e=>onChange(e)}/>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
        price
      </label>
      <div class="relative">
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="text" placeholder="per liter" name='price' value={price}  onChange={e=>onChange(e)}/>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="verifiedTime">
        Last time verified
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="verifiedTime" type="text" placeholder="hours ago" name='lastTimeVerified' value={lastTimeVerified}  onChange={e=>onChange(e)}/>
    </div>
  </div>
  <input type='submit' className='btn btn-dark my-1' value='Submit' />
  
</form>

</section>

     
    )
}

OxygenForm.propTypes = {
addPost:PropTypes.func.isRequired,
}

export default connect(null,{addPost})(OxygenForm);

