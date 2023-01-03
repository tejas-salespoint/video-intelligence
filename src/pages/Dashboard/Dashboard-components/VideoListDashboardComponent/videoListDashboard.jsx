import React from 'react';
import './videolistdashboard.scss'
import Tabs from "./tabs/Tabs";

function VideoListDashboard(props) {
    return (
        <div style={{
            width : '100%'
        }}>
            <Tabs />
        </div>
    );
}

export default VideoListDashboard;