import React, {useState} from "react";
import "./sidebar.scss";
import Logo from 'assets/Logo.png'
import menuItems from "../../../menu-items/menu-items";
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/authSlice";
import {DashboardSideIcon} from "../../../contants";

const Sidebar = ({user}) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    // function logout() {
    //     dispatch(() => logout())
    //     
    //     redirect('/')
    // }

    const logoutHandler = (e) => {
        dispatch(logout())
        navigate('/login')

        // this.props.history.push('/login')
    }

    const [active, setActive] = useState("tab1")

    const isActive = (key) => (active === key ? 'active' : '');


    const [currentTab, setCurrentTab] = useState('dashboard');

    const handleSelect = (eventKey) => {
        setCurrentTab("second");
    };

    return (
        <div className="sidebar">
            <div>
                <div className="top">
                    <img src={Logo} alt="brand" className="brand_logo"/>
                    <div className="logo">video intelligence</div>
                </div>
                <div className="center">
                    <ul className="items">
                        {
                            menuItems.filter(me => me.permission.includes(user?.me?.role?.name ? user?.me?.role?.name : "subscriber"))
                                .map((item) => (
                                    <li key={item.id}

                                        onClick={() => setCurrentTab(item.id)}
                                        className={`item`}
                                    >

                                        {/*<NavLink*/}
                                        {/*    to="users"*/}
                                        {/*    className={({ isActive }) => (isActive ? 'active' : 'inactive')}*/}
                                        {/*>*/}
                                        {/*    Users*/}
                                        {/*</NavLink>*/}

                                        <NavLink to={item.path}
                                                 className={`d-flex align-items-center gap-3 `}>
                                            <img className='side-icon my-4 mx-2' src={item.icon}
                                                 alt={`icon-${item.title}`}/>
                                            <div className=''>

                                                {item.title}
                                            </div>
                                        </NavLink>

                                    </li>
                                ))
                        }


                        <li className="item ">
                            <Link to={'/samplevideoupload'} className='d-flex  align-items-center gap-3'>
                                <img className='side-icon my-4 mx-2' src={DashboardSideIcon}
                                     alt="home"/>
                                <div className=''>

                                    Testing
                                </div>
                            </Link>
                        </li>
                        {/*<li className="item  ">*/}
                        {/*    <Link to={'/newsampleupload'} className='d-flex  align-items-center gap-3'>*/}
                        {/*        <img className='side-icon my-4 mx-2' src={DashboardSideIcon}*/}
                        {/*             alt="home"/>*/}
                        {/*        <div className=''>*/}

                        {/*            Sample Upload*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li className="item  ">*/}
                        {/*    <Link to={'/designupload'} className='d-flex  align-items-center gap-3'>*/}
                        {/*        <img className='side-icon my-4 mx-2' src={DashboardSideIcon}*/}
                        {/*             alt="home"/>*/}
                        {/*        <div className=''>*/}

                        {/*            designupload*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li className="item  ">
                            <Link to={'/graphqltest'} className='d-flex  align-items-center gap-3'>
                                <img className='side-icon my-4 mx-2' src={DashboardSideIcon}
                                     alt="home"/>
                                <div className=''>

                                    GraphQl Test
                                </div>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
            <ul className="item logout-button">
                <Button className='btn-primary' onClick={(e) => logoutHandler(e)}>Logout</Button>
            </ul>

        </div>
    );
};

export default Sidebar;
