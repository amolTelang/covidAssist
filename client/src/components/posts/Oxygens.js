import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/oxygenPost';
import Spinner from '../Spinner';


const Oxygens = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{
      getPosts();  
    },[getPosts]);

    return loading ? (<Spinner/>):(
        <Fragment>
            
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

