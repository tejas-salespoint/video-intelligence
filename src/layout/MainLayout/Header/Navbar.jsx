import React, {useState} from "react";
import "./navbar.scss";
import {
    ArrowDownHeaderIcon,
    newAvatarImage,
    NotificationHeaderIcon,
    powerButtonImage,
    SearchIcon
} from "../../../contants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_PROFILE_PHOTO} from "../../../graphql/userQuery";
import {logout} from "../../../redux/authSlice";


const Navbar = ({user}) => {
        const navigate = useNavigate();
        const user_id = useSelector(state => state.auth.user.id)
        const {data, loading, error} = useQuery(GET_PROFILE_PHOTO, {
            variables: {
                "user_id": user_id
            }
        })


        const [search, setSearch] = useState('');

    const dispatch = useDispatch()


    const logoutHandler = (e) => {
        dispatch(logout())
        navigate('/login')

        // this.props.history.push('/login')
    }

        const handleKeyDown = event => {
            //     your logic here
            if (event.key === 'Enter') {

                if (user?.me?.role?.name === "Subscriber" || user?.me?.role?.name === "Contributor") {

                navigate('subscriber/video/list', {
                    state: {
                        search: search
                    }
                });
                } else {
                    navigate('/video/list', {
                        state: {
                            search: search
                        }
                    });
                }

                setSearch('')
            }

        }


        return (
            <div className="nav">
                {/*Search bar start */}
                <div className=" search input-group">
                    <div className="input-group-text-sm color-bg" style={{
                        background: 'red'
                    }}>
                        <img src={SearchIcon} alt="searchicon"/>
                    </div>
                    <div className="form-floating-sm">
                        <div className='search'>
                            <input value={search} onChange={event => setSearch(event.target.value)}
                                   onKeyDown={handleKeyDown} type="text"
                                   className='search-input ' placeholder='Search'/>
                        </div>
                    </div>
                </div>

                {/* search bar end*/}

                <div className='notification'>
                    <div className='notification-icon'>
                        <img src={NotificationHeaderIcon} alt="NotificationHeaderIcon"/>
                    </div>
                </div>

                <div className='profileItem'>
                    <div className='profile'>
                        {/*<img className='avatar' src={AvatarHeaderIcon} alt="avatar"/>*/}

                        <img
                            style={{
                                borderRadius: '100%',
                                // border: '2px solid white'
                            }}
                            src={data?.usersPermissionsUser?.data?.attributes?.image ? data?.usersPermissionsUser?.data?.attributes?.image : newAvatarImage}
                            alt="avatar"
                            className="avatar"
                        />
                        <div>
                            <p>{user?.me?.username}</p>
                            <p>{user?.me?.role?.name}</p>
                        </div>

                        {/*<img className='arrowDown' src={ArrowDownHeaderIcon} alt="arrowdown"/>*/}
                    </div>


                    {/*    temp code */}
                    {/*    <DropdownButton id="dropdown-basic-button" title="Dropdown button">*/}
                    {/*        <Dropdown.Item className='' href="#/action-1">Action</Dropdown.Item>*/}
                    {/*        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                    {/*        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                    {/*    </DropdownButton>*/}
                    {/*    temp code end */}


                </div>
                <div className='notification'>
                    <div className='notification-icon' onClick={(e) => logoutHandler(e)}>
                        <img src={powerButtonImage} alt="powerButtonImage"/>
                    </div>
                </div>
            </div>
        );
    }
;

export default Navbar;
