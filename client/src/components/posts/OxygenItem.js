import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/oxygenPost';

const OxygenItem = ({auth,deletePost,post:{_id,user,userName,location,quantity,phone,price,lastTimeVerified}}) => {

    return (
      <div>
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
