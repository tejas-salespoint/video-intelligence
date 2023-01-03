import React, {useEffect, useRef, useState} from 'react';
import Auth from "../Auth";
import './loginform.scss'
import {FbIcon, GoogleIcon, LinkedInIcon, TwitterIcon} from "../../../../contants";
import {signInUser} from "../../../../redux/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


const LOGIN_URL = "/auth/local";

function LoginForm(props) {
    const dispath = useDispatch();
    const users = useSelector((state) => state)
    const [errorShow, setErrorShow] = useState(false)


    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);


    const userRef = useRef();
    const errRef = useRef();


    useEffect(() => {
        userRef.current.focus();
    }, []);


    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispath(signInUser({
                identifier: user,
                password: pwd,
            }))
                .then(() => setSuccess(true))
        } catch (error) {
            if (users?.error) {
                setErrMsg(users.error)

            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }


    };
    return (
        <>
            {
                success ? (<Navigate to="/"/>) :
                    (<Auth title={"Sign In"}>
                        <div className='login-form'>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"></p>
                            {
                                (users?.error  || users?.msg) &&
                                <div className="login-error alert alert-danger" role="alert">
                                    {users?.error || users?.msg}
                                </div>
                            }
                            {
                                errMsg &&

                                <div className="login-error alert alert-danger" role="alert">
                                    {errMsg}
                                </div>
                            }
                            <form onSubmit={handleSubmit} className="row g-3 p-5 pb-2 pt-3 gap-2">

                                <div className="col-md-12">
                                    <label htmlFor="username" className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required

                                        placeholder='Enter email' className="form-control"
                                    />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input

                                        id="password"
                                        autoComplete="off"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        type="password" placeholder='Enter password (min 8 char)'
                                        className="form-control"
                                    >


                                    </input>
                                    {/*<span className="input-group-text" id="basic-addon2">@example.com</span>*/}


                                </div>


                                <div className="col-12 button">
                                    <button type="submit" className="btn btn-primary col-12">
                                        Sign In
                                    </button>
                                </div>

                                <div className='or-section d-flex justify-content-center align-items-center gap-2'>
                                    <div className='or-line'></div>
                                    OR
                                    <div className='or-line'></div>

                                </div>

                                <div className='social-icons d-flex justify-content-center align-items-center gap-4'>
                                    <button className='google'>
                                        <img className='auth-icons' src={GoogleIcon} alt="google"/>
                                    </button>
                                    <button className='fb'>
                                        <img className='auth-icons' src={FbIcon} alt="fb"/>
                                    </button>
                                    <button className='linkedin'>
                                        <img className='auth-icons' src={LinkedInIcon} alt="linkedin"/>
                                    </button>
                                    <button className='twitter'>
                                        <img className='auth-icons' src={TwitterIcon} alt="twitter"/>
                                    </button>
                                </div>


                            </form>

                        </div>
                    </Auth>)}
        </>
    );

}

export default LoginForm;