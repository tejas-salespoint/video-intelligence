import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import './style.scss'

import Navbar from "./Header/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import {useQuery} from "@apollo/client";
import {GET_ME_USER} from "../../graphql/userQuery";
import {Backdrop, Box, CircularProgress} from "@mui/material";
import Loader from "../../components/Loader/Loader";
import UploadVideo from "../../pages/uploadVideo/UploadVideo";

// for date time
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

const MainLayout = ({children, ...props}) => {
    const {data, loading, error} = useQuery(GET_ME_USER)
    console.log(data)

    const [view, setView] = useState(false);
    const [route, setRoute] = useState('')
    const [model, setModel] = useState(false)



    useEffect(() => {
        
        if (window.location.pathname === '/upload-video') {
            setView(true)
        } else {
            setView(false)
        }
    },[window.location.pathname])


    



    if (loading) return <Loader />;
    if (error) return "Error";

    // /upload-video

    // useEffect(() => {
    // 
    // 
    // if (window.location.pathname === '/upload-video') {
    //     setView(true);
    //     
    //     
    // } else {
    //     setView(false)
    // }
    //
    // },[model])


    return (
        <div {...props}>
            {/* Header */}
            <div className="home">
                <Sidebar user={data}/>
                <div className="homeContainer">
                    <Navbar user={data}/>
                    {/* <button onClick={() => setModel(prevState => !prevState)}> View Model </button>



                    {model && <UploadVideo model={model} setModel={setModel} />} */}

                    <Outlet/>
                </div>
            </div>

        </div>
    );
};

export default MainLayout;
