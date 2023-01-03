import React from 'react';
import {TimeIcon, videoList} from "../../contants";
import {Link} from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const GroupListViewComponent = ({id, title, desc, createdAt, thumbnail, channels}) => {

    let channelRender = channels?.data?.map(item => item.id)


    const stateDataForwardChannels = {
        id: id,
        name: title,
        channels: channelRender
    }

    return (
        <div>
            <div className="row listcard">

                <div className="  d-flex  gap-4 align-content-center col-8 align-items-center first-side   ">
                    <div className="img-thumbnail-0  p-0 border-0">

                        <img style={{
                            width: "24rem"
                        }
                        } src={thumbnail ? thumbnail : videoList} className="videoListCard"
                             alt="videolist"/>

                        {/*<img src="https://cdn.romania-insider.com/sites/default/files/styles/article_large_image/public/2022-10/new_google_office_bucharest_-_photo_company.jpg" alt="alternate office" />*/}
                    </div>
                    <div className="overview">
                        <h3>{title}</h3>
                        <p className="pb-2"> {desc} </p>
                        <div className="d-flex gap-4">
                            {/*<div className="d-flex gap-2 align-content-center align-items-center ">*/}
                            {/*  <img className="icon" src={EyeIcon} alt="eyeicon"/>*/}
                            {/*  <p>2,481,410</p>*/}
                            {/*</div>*/}
                            <div className="d-flex gap-2 align-content-center align-items-center ">
                                <img className="icon" src={TimeIcon} alt="timeicon"/>
                                <p><ReactTimeAgo date={createdAt} locale="en-US"/></p>

                            </div>
                        </div>


                        {/*<div>*/}
                        {/*    <div className="d-flex gap-2 align-content-center align-items-center channel ">*/}
                        {/*        <img*/}
                        {/*            className="icon-channel"*/}
                        {/*            src={channelImage}*/}
                        {/*            alt="channelImage"*/}
                        {/*        />*/}
                        {/*        <p>Microsoft Developer</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                    </div>
                </div>
                <div className="second-side col-4 d-flex flex-column gap-4 justify-content-center align-items-center">
                    <div className="d-flex gap-3 mb-2">

                        {/* no use till now  */}


                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        src={MinusCardIcon}*/}
                        {/*        alt="minus-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        src={PlusCardIcon}*/}
                        {/*        alt="plus-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}


                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        // onClick={() => setEditType(true)}*/}
                        {/*        src={EditCardIcon}*/}
                        {/*        alt="edit-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*/!* time watchlist  *!/*/}


                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        src={TimeCardIcon}*/}
                        {/*        alt="time-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*/!* delete  *!/*/}
                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        src={SendCardIcon}*/}
                        {/*        alt="send-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <img*/}
                        {/*        className="icon-card"*/}
                        {/*        src={DeleteCardIcon}*/}
                        {/*        alt="delete-card-icon"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="bg-dark">


                        <Link to={'/channels'}
                              state={stateDataForwardChannels}
                              aria-describedby='forward on video list'>
                            <button className="card-button ">View Channels</button>

                            {/* {loadingScreen && (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
                {loadingScreen}
              </button>
            )} */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupListViewComponent;
