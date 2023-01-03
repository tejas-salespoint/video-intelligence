import React, {useState} from 'react'
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Cards from "./Dashboard-components/Cards";
import VideoListDashboard from "./Dashboard-components/VideoListDashboardComponent/videoListDashboard";
import {useQuery} from "@apollo/client";
import {GET_ME_USER} from "../../graphql/userQuery";
import {Navigate} from "react-router-dom";


const Dashboard = () => {
    const {data, loading, error} = useQuery(GET_ME_USER)
    const [roles, setRoles] = useState(data?.me?.role?.name);

    if (roles === 'Subscriber' || roles === 'Contributor') return <Navigate to={'/subscriber'}/>;

    return (

        <Box>
            <BreadCrumb root="Dashboard" />
            <div className='d-flex gap-4 '>
                <Cards title='TODAYS VISITS' numbers='7,89,998' color='#00C4FF' percent='70%'/>
                <Cards title='TODAYS UPLOADS' numbers='7,89,998' color='#FF2E2E' percent='70%'/>
                <Cards title='TOTAL VIDEOS' numbers='7,89,998' color='#F0B45D' percent='70%'/>
                <Cards title='NEW COMMENTS' numbers='7,89,998' color='#9AEE85' percent='70%'/>
            </div>
            <div className='d-flex justify-content-start w-100 my-5'>
                <VideoListDashboard/>
            </div>
        </Box>


    )
}

export default Dashboard;