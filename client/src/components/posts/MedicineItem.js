import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/oxygenPost';

const OxygenItem = ({auth,deletePost,post:{_id,user,userName,location,quantity,phone,price,lastTimeVerified,date}}) => {

    return (

      <div class="flex justify-center items-center h-screen w-full bg-blue-300">
  <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
    <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Posted on<Moment format='DD/MM/YY'>{date}</Moment></h1>
   
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">Name</label>
        <p class="border py-2 px-3 text-grey-800" >{userName}</p>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900" for="phone">Phone No</label>
        <p class="border py-2 px-3 text-grey-800" >{phone}</p>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900" for="quantity">Quantity</label>
        <p class="border py-2 px-3 text-grey-800" >{quantity}</p>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900" for="price">Price</label>
        <p class="border py-2 px-3 text-grey-800" >{price}</p>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900" for="location">Location</label>
        <p class="border py-2 px-3 text-grey-800" >{location}</p>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 font-bold text-lg text-gray-900">Last Time Verified</label>
        <p class="border py-2 px-3 text-grey-800" >{lastTimeVerified}</p>
      </div>
      {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Delete
            </button>
          )}
      
    
  </div>
</div>

 

         
    )
}

OxygenItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
deletePost:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    auth:state.auth
});

export default connect(mapStateToProps,{deletePost})(OxygenItem);
