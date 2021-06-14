import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {userLogout} from '../actions/auth';

const  Navbar=({auth:{isAuthenticated},userLogout})=> {
  const authLinks=(<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     
      <span className="ml-3 text-xl">Covid-Assist</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
    <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Oxygen</Link>
    <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Medicine</Link>
      <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Shelter</Link>
      <Link to='/' onClick={userLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-500 rounded text-base mt-4 md:mt-0">Logout</Link>
    </nav>
   
  </div>
</header>)
  const guestLinks=(<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     
      <span className="ml-3 text-xl">Covid-Assist</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Developers</Link>
      <Link to='/login' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login</Link>
    </nav>
   
  </div>
</header>);
  return (
    <>
  {isAuthenticated ? authLinks : guestLinks }
    </>
  )
}

Navbar.propTypes={
  auth:PropTypes.object.isRequired,
  userLogout:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
auth:state.auth
})

export default connect(mapStateToProps,{userLogout})(Navbar);

