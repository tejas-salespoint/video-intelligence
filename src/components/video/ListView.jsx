import {channelImage, TimeIcon, videoList} from 'contants'
import React, {useState} from 'react'
import VideoModelForm from './videoModelForm/videoModelForm'
import ReactTimeAgo from "react-time-ago";
import {PageMinusSvg} from 'assets/icons/svg/PageMinusSvg';
import {PagePlusSvg} from 'assets/icons/svg/PagePlusSvg';
import {EditSvg} from "../../assets/icons/svg/EditSvg";
import {SendSvg} from "../../assets/icons/svg/SendSvg";
import {WatchListSvg} from "../../assets/icons/svg/WatchListSvg";
import {DeleteSvg} from "../../assets/icons/svg/DeleteSvg";


const ListView = ({
    name, desc, createdAt, watchlist_attr_show,videoid, thumbnail, thumbnail_id, accessToken,channel_name,channel_image
}) => {

    const [videoModel,setVideoModel] = useState(false)

  return (
    <>

<VideoModelForm
                show={videoModel}
                onHide={() => setVideoModel(false)}
               
                
            />
    

    <div className="row listcard ">
        <div className="d-flex gap-4 align-content-center col-8 align-items-center first-side   ">
          <div className="img-thumbnail-0  p-0 border-0">

            <img src={thumbnail ? `data:image/jpeg;base64,` + thumbnail : videoList} className="videoListCard"
                 alt="videolist"/>
            {/* <img src={videoList} className="videoListCard"
                 alt="videolist"/> */}
          </div>
          <div className="overview">
          <h3>{name}</h3>
            <p className="pb-2"> {desc} </p>
            <div className="d-flex gap-4">
              {/*<div className="d-flex gap-2 align-content-center align-items-center ">*/}
              {/*  <img className="icon" src={EyeIcon} alt="eyeicon"/>*/}
              {/*  <p>2,481,410</p>*/}
              {/*</div>*/}
              <div className="d-flex gap-2 align-content-center align-items-center ">
              <img className="icon" src={TimeIcon} alt="timeicon"/>
                <p><ReactTimeAgo date={createdAt} locale="en-US" /></p>

              </div>
            </div>
            <div>
              <div className="d-flex gap-2 align-content-center align-items-center channel ">
                <img
                    style={{
                      borderRadius : '100%',
                      border : '1px solid white',
                      height: '2rem',
                      width: '2rem',
                    }}
                    className="icon-channel"
                    src={channel_image ? channel_image : channelImage}
                    alt="channelImage"
                />
                <p>{channel_name ? channel_name : "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="second-side col-4 d-flex flex-column gap-4 justify-content-center align-items-center">

            {
                watchlist_attr_show &&  <div className="d-flex gap-3 mb-2">


                    <div  >
                        <PageMinusSvg height={30} width={30} stroke="#212529"  />
                    </div>

                    <div  >
                        <PagePlusSvg height={30} width={30} stroke="#212529"  />
                    </div>

                    <div
                        style={{
                            cursor: "pointer",
                        }}

                    >
                        <EditSvg height={30} width={30} stroke="#1363DF"   />
                    </div>
                    {/*Send */}
                    <div


                    >
                        <SendSvg height={30} width={30} stroke="#212529"  />
                    </div>

                    {/* time watchlist  */}

                    <div style={{
                        cursor: "pointer",
                    }}
                    >
                        <WatchListSvg height={30} width={30} stroke="#1363DF"  />
                    </div>

                    {/* delete  */}
                    <div  style={{
                        cursor: "pointer",
                    }}>
                        <DeleteSvg height={30} width={30} stroke="#1363DF"  />
                    </div>

                </div>
            }


          <div className="bg-dark">
            {/* <Link
                to={`/video/list/0a77fa51f5`}
                state={{
                  id: videoid,
                  accessToken:
                  accessToken,
                }}
            > */}
              <button className="card-button ">View Insights</button>

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
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
    
  )
}

export default ListView