import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/oxygenPost';

const OxygenItem = ({auth,deletePost,post:{_id,user,name,location,quantity,phone,text,lastTimeVerified}}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <h4>{name}</h4> 
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on <Moment format='DD/MM/YYYY'></Moment></p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
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
