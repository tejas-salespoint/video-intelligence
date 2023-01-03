import React from 'react';
import './listcard.scss'
import {channelImage, EyeIcon, TimeCardIcon, videoList} from "../../../../../../contants";
// import {
//     channelImage, DeleteCardIcon,
//     EditCardIcon,
//     EyeIcon,
//     MinusCardIcon,
//     PlusCardIcon, SendCardIcon,
//     TimeCardIcon,
//     TimeIcon,
//     videoList
// } from "../../../contants";

function ListCard(props) {
    return (
        <div className='row listcard '>
            <div className='d-flex gap-4 align-content-center col-12 align-items-center first-side   ' style={{
                width : '125rem'
            }}>
                <div className='img-thumbnail-0  p-0 border-0'>
                    <img src={videoList} className='videoListCard' alt="videolist"/>
                </div>
                <div className='overview'>
                    <h3>Overview - Azure Database</h3>
                    <p className='pb-2'> In this video, Colin Murphy discusses tips and tricks for migrating your on-prem database to
                        Azure DB MySQL without downtime. </p>
                    <div className='d-flex gap-4'>
                        <div className='d-flex gap-2 align-content-center align-items-center '>
                            <img className='icon' src={EyeIcon} alt="eyeicon" />
                            <p>2,481,410</p>

                        </div >
                        <div  className='d-flex gap-2 align-content-center align-items-center '>
                            <img className='icon' src={TimeCardIcon} alt="timeicon" />
                            <p> 26 Feb 2016</p>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex gap-2 align-content-center align-items-center channel '>
                            <img className='icon-channel' src={channelImage} alt="channelImage" />
                            <p>Microsoft Developer</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ListCard;