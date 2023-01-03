import React from 'react';
import './listcard.scss'
import {
    channelImage,
    DeleteCardIcon,
    EditCardIcon,
    MinusCardIcon,
    PlusCardIcon,
    SendCardIcon,
    TimeCardIcon,
    TimeIcon,
    videoList
} from "../../../contants";

function ListCard({
    name,
    desc,
    createdAt,
    videoid,
    thumbnail,
    thumbnail_id,
    accessToken,
    channel_name,
    channel_image,
    

}) {
    return (
        <div className='row listcard '>
            <div className='d-flex gap-4 align-content-center col-8 align-items-center first-side   '>
                <div className='img-thumbnail-0  p-0 border-0'>
                    <img src={thumbnail ? `data:image/jpeg;base64,` + thumbnail : videoList} className='videoListCard' alt="videolist"/>
                </div>
                <div className='overview'>
                    <h3>{name}</h3>
                    <p className='pb-2'> {desc} </p>
                    <div className='d-flex gap-4'>
                        {/* <div className='d-flex gap-2 align-content-center align-items-center '>
                            <img className='icon' src={EyeIcon} alt="eyeicon" />
                            <p>2,481,410</p>

                        </div > */}
                        <div  className='d-flex gap-2 align-content-center align-items-center '>
                             <img className='icon' src={TimeIcon} alt="timeicon" />
                           <p> {createdAt}</p>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex gap-2 align-content-center align-items-center channel '>
                            <img className='icon-channel' src={channelImage} alt="channelImage" />
                            <p>{ channel_name ? channel_name : 'Unknown'}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='second-side col-4 d-flex flex-column gap-4 justify-content-center align-items-center'>
               <div className='d-flex gap-3 mb-2'>
                   <div>
                       <img className='icon-card' src={MinusCardIcon} alt="minus-card-icon" />
                   </div>
                   <div>
                       <img className='icon-card' src={PlusCardIcon} alt="plus-card-icon" />
                   </div>
                   <div>
                       <img className='icon-card' src={EditCardIcon} alt="edit-card-icon" />
                   </div>
                   <div>
                       <img className='icon-card' src={TimeCardIcon} alt="time-card-icon" />
                   </div>
                   <div>
                       <img className='icon-card' src={SendCardIcon} alt="send-card-icon" />
                   </div>
                   <div>
                       <img className='icon-card' src={DeleteCardIcon} alt="delete-card-icon" />
                   </div>
               </div>
                <div className='bg-dark'>
                    <button className='card-button '>
                        View Insights
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListCard;