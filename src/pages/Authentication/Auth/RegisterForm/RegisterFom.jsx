import React, {useEffect, useRef, useState} from 'react';
import Auth from "../Auth";
import './registerform.scss'
import {FbIcon, GoogleIcon, LinkedInIcon, TwitterIcon} from "../../../../contants";
import {Navigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {signUpUser} from "../../../../redux/authSlice";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/local/register";

function RegisterForm(props) {
    const users = useSelector((state) => state)
    //dispatch
    const dispatch = useDispatch()

    //useRef
    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    //state
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        
        
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        
        
        setValidEmail(result)
    })

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        
        
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enbled with js hack
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        const v3 = EMAIL_REGEX.test(email)
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            dispatch(signUpUser({
                "username": user,
                "email": email,
                "password": pwd
            })).then((payload) => payload?.payload?.jwt ? setSuccess(true)  : Navigate('/somehting'))
        } catch (error) {
            if (users?.error) {
                setErrMsg(users.error)

            } else if (error) {
                setErrMsg(error)
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };


    // try {
    //     const response = await axios.post(REGISTER_URL,
    //         JSON.stringify({
    //             "username": user,
    //             "email": email,
    //             "password": pwd
    //         }), {
    //             headers: {'Content-Type': 'application/json'},
    //             withCredentials: true
    //         }
    //     );
    //     
    //     
    //     
    //     setSuccess(true);
    //     // clear input fields
    //
    // } catch (error) {
    //     if (!error?.response) {
    //         setErrMsg('No Server Response');
    //
    //     } else if (error.response?.status === 409) {
    //         setErrMsg('Username Taken');
    //     } else {
    //         setErrMsg('Registration Failed')
    //     }
    //     errRef.current.focus();
    // }


    return (
        <>
            {success ? (<Navigate to="/login"/>) :
                <Auth title={"sign up"}>
                    <div className='register-form'>


                        {
                            (users?.error || users?.msg) &&
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
                                    Username:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validName ? "valid" : "hide"}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validName || !user ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    placeholder='Enter name' className="form-control"/>

                                <p
                                    id="uidnote"
                                    className={
                                        userFocus && user && !validName ? "instructions" : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    4 to 24 characters.
                                    <br/>
                                    Must begin with a letter.
                                    <br/>
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            {/*<div className="col-md-12">*/}
                            {/*    <label htmlFor="phone" className="form-label">*/}
                            {/*        Mobile No:*/}
                            {/*    </label>*/}
                            {/*    <input type="text" placeholder='Enter mobile no.' className="form-control" id="phone"/>*/}
                            {/*</div>*/}
                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validEmail ? "valid" : "hide"}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validEmail || !email ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    placeholder='Enter email' className="form-control"
                                />
                                <p
                                    id="uidnote"
                                    className={
                                        emailFocus && email && !validEmail ? "instructions" : "offscreen"
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    valid email eg : test@email.com
                                    <br/>
                                    Must begin with a letter.
                                    <br/>
                                    Letters, numbers, dot allowed
                                </p>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validPwd ? "valid" : "hide"}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validPwd || !pwd ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    placeholder='Enter password (min 8 char)'
                                    className="form-control"/>
                                <p
                                    id="uidnote"
                                    className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    8 to 24 characters.
                                    <br/>
                                    Must include uppercase and lowercase letters, a number and a special
                                    character.
                                    <br/>
                                    Allowed special characters:{" "}
                                    <span aria-label="exclamation mark">!</span>{" "}
                                    <span aria-label="at symbol">@</span>{" "}
                                    <span aria-label="hashtag">#</span>{" "}
                                    <span aria-label="dollar sign">$</span>{" "}
                                    <span aria-label="percent">%</span>
                                </p>
                            </div>


                            <div className="col-md-12">
                                <label htmlFor="confirm_password" className="form-label">
                                    Confirm Password:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validMatch && matchPwd ? "valid" : "hide"}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                                    />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    placeholder='Same password as above'
                                    className="form-control"/>
                                <p
                                    id="uidnote"
                                    className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Must match the first password input field.
                                </p>
                            </div>


                            <div className="col-12 button">
                                <button disabled={!validName || !validPwd || !validMatch ? true : false} type="submit"
                                        className="btn btn-primary col-12">
                                    Create Account
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
                </Auth>


            }
        </>
    )
};

export default RegisterForm;