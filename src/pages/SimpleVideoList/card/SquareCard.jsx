import React from 'react';
import {cardTempImage, channelImage, EyeIcon, TimeIcon, videoList} from "../../../contants";
import './squarecard.scss'

function SquareCard({ name, desc, createdAt, videoid , thumbnail}) {
    return (
        <div>
            <div className="card" style={{width: '29rem'}}>
                <img style={{
                    width: '100% !important',
                    height: '16rem',
              
                }
                } src={thumbnail ? `data:image/jpeg;base64,` + thumbnail : videoList} className="card-img-top" alt="cardTempImage"/>

                    <div className="card-body">
                        <h3 className="card-title mb-3">{name} </h3>
                        <div >
                            <div className='d-flex gap-3 card-info my-2'>


                            <div className='d-flex gap-2'>
                                <img className='cardIcon' src={EyeIcon} alt="eyeicon" />
                                2,481,410
                            </div>
                            <div className='d-flex gap-2'>
                                <img className='cardIcon' src={TimeIcon} alt="26 Feb 2016" />
                                {createdAt}
                            </div>
                            </div>
                            <div className='d-flex gap-2 card-info-channel align-items-center my-2 mb-3  '>
                                <img className='cardChannelIcon' src={channelImage} alt="channel-image" />
                                Microsoft Developer
                            </div>
                            <p className='card-paragraph'>
                                {desc}
                            </p>
                        </div>


                    </div>
            </div>
        </div>
    );
}

export default SquareCard;