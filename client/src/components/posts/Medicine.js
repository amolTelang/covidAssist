import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/medicinePost';
import Spinner from '../Spinner';
import MedicineItem from './MedicineItem';
import MedicineForm from './MedicineForm';

const Medicines = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{

      getPosts();  
    },[getPosts]);

    return loading ? (<Spinner/>):(
        <Fragment>
       <div className="flex flex-col text-center w-full mb-20 bg-blue-400">
      <p className="lg:w-2/3 font-bold mx-auto leading-relaxed text-base">Please input any deails on any leads pertaining to any relevent Medical Drugs</p>
    </div>
      <MedicineForm/>
      <div>
        {posts.map((post) => (
          
          <MedicineItem key={post._id} post={post} />
        ))}
      </div>
        </Fragment>
    )
}

Medicines.propTypes = {
getPosts:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
post: state.medicinePost
});

export default connect(mapStateToProps,{getPosts})(Medicines)

