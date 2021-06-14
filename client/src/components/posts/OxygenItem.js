import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/oxygenPost';

const OxygenItem = ({auth,deletePost,post:{_id,user,userName,location,quantity,phone,price,lastTimeVerified}}) => {

    return (
  <div class="container px-5 py-24 mx-auto flex flex-col justify-items-center  ">
  <div class="flex flex-wrap -m-2">
    <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
      <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <div class="flex-grow">
          <h2 class="text-gray-900 title-font font-medium">{userName}</h2>
          <h2 class="text-gray-900 title-font font-medium">{phone}</h2>
          <h2 class="text-gray-900 title-font font-medium">{quantity}</h2>
          <h2 class="text-gray-900 title-font font-medium">{price}</h2>
          <h2 class="text-gray-900 title-font font-medium">{location}</h2>
          <h2 class="text-gray-900 title-font font-medium">{lastTimeVerified}</h2>
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
      </div>
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
