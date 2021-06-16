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
       <div className="flex flex-col text-center w-full mb-20">
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">lorem ipsu bfcsbvvfdhjbvhsdbvhudbrsvndfgbvjkdfhbvhdfgb</p>
    </div>
      <OxygenForm/>
      <div className="posts">
        {console.log(posts)}
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
post: state.post
});

export default connect(mapStateToProps,{getPosts})(Oxygens)

