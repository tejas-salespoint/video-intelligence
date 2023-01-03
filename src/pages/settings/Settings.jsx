import React from 'react';
import './settings.scss'
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {Col, Row} from "react-bootstrap";
import {EditIcon, newAvatarImage, RightArrow} from "../../contants";
import ProfileTabs from "./SettingTabs/ProfileTabs";
import InnerAlert from "../../components/Alerts/InnerAlerts";
import {useSelector} from "react-redux";
import {useQuery} from "@apollo/client";
import {GET_OUR_USER} from "../../graphql/userQuery";
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";


const tabs = [
    {
        title: 'Profile',
        tab: 'profile',
        desc: 'Manage your Profile details'
    },
    {
        title: 'Payment',
        tab: 'payment',
        desc: 'Manage your payment details'
    },

    {
        title: 'Notification',
        tab: 'notification',
        desc: 'Manage your notification'
    },
    {
        title: 'Membership',
        tab: 'membership',
        desc: 'Check out membership details'
    },
    {
        title: 'Language',
        tab: 'language',
        desc: 'check your language'
    },
    {
        title: 'Privacy',
        tab: 'privacy',
        desc: 'Check out privacy details'
    },
    {
        title: 'Help/FAQ',
        tab: 'help',
        desc: 'Reachout for graphql'
    },
]

function Settings(props) {
    const users = useSelector(state => state.auth.user)

    const {loading, error, data} = useQuery(GET_OUR_USER, {
        variables: {
            "id": users?.id
        }
    })


    if (loading) return <Loader/>;
    if (error) return <p>Error :(</p>;

    return (
        <Box>


            {/*  breadcrumb */}
            <BreadCrumb root="My Settings" path={users?.username}/>

            <InnerAlert name={users?.username}
                        role={data?.usersPermissionsUser?.data?.attributes?.role?.data?.attributes?.name}/>

            <Row className='settings m-3'>
                <Col xs={3} className='first_side rounded-4'>
                    <ul>
                        {
                            tabs.map((tab) => (
                                <li key={tab.tab}>
                                    <div>

                                        <h5>{tab.title}</h5>
                                        <p>{tab.desc}</p>
                                    </div>
                                    <div>
                                        <img className='side-right-arrow' src={RightArrow} alt="rightarrow"/>
                                    </div>
                                </li>
                            ))
                        }


                    </ul>
                </Col>
                <Col xs={8} className='second_side rounded-4'>
                    <div className='first-top'>
                        <p>Personal information</p>
                        <div>
                            <Link to={'/profile'}>
                                <img title={"Edit"} src={EditIcon} alt="editicon"/>
                            </Link>
                        </div>
                    </div>
                    <div className='second-top'>
                        <img
                            style={{
                                borderRadius: '100%',
                                border: '3px solid white'
                            }}
                            src={data?.usersPermissionsUser?.data?.attributes?.image ? data?.usersPermissionsUser?.data?.attributes?.image : newAvatarImage}
                            alt="avatar"
                            className="avatar"
                        />
                    </div>
                    <div>
                        {!loading &&
                            <ProfileTabs users={data?.usersPermissionsUser?.data?.attributes}
                                         userid={data?.usersPermissionsUser?.data?.id}/>
                        }
                    </div>
                </Col>

            </Row>

        </Box>
    );
}

export default Settings;