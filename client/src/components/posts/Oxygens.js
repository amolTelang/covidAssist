import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/oxygenPost';
import Spinner from '../Spinner';
import OxygenItem from './OxygenItem';
import OxygenForm from './OxygenForm';

const Oxygens = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{
      getPosts();  
    },[getPosts]);

    return loading ? (<Spinner/>):(
        <Fragment>
             <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> 
      </p>
      <OxygenForm></OxygenForm>
      <div className="posts">
        {posts.map((post) => (
          <OxygenItem key={post._id} post={post} />
        ))}
      </div>
        </Fragment>
    )
}

Oxygens.propTypes = {
getPosts:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
post: state.oxygenPost
});

export default connect(mapStateToProps,{getPosts})(Oxygens)

