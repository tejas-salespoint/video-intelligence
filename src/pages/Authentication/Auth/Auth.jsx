import React from 'react'
import './auth.scss'
import {AuthBrandLogo} from "../../../contants";
import {Link} from "react-router-dom";


const Auth = ({children, title}) => {

    let forward_links;

    if (window?.location?.pathname === '/login') {
        forward_links = <div className='auth-footer d-flex justify-content-center align-items-center p-3'>
            <p>Create an account? <Link className='link-info' to={'/register'}> Register </Link></p>
        </div>
    } else if (window?.location?.pathname === '/register') {
        forward_links = <div className='auth-footer d-flex justify-content-center align-items-center p-3'>
            <p>Already have an account? <Link className='link-info' to={'/login'}> Login </Link></p>
        </div>
    }


    return (

        <div className='authlogin'>
            <div className='login_component'>
                <div className='logo'>
                    <img src={AuthBrandLogo} alt="authbrandlogo"/>
                </div>
                <div className='form'>
                    <h1 className='mx-5'>{title}</h1>
                    {children}
                </div>

                {forward_links}
            </div>
        </div>

    )
}

export default Auth