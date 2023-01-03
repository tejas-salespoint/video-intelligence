import React, {useState} from "react";
import "./listcard.scss";
import {channelImage, TimeIcon, videoList,} from "../../../contants";
import {Link} from "react-router-dom";
import EditVideoModel from "../modelform/EditVideoModel";
import {useMutation} from "@apollo/client";
import {AddToWatchList, GetWatchList} from "../../../graphql/watchlistQuery";
import ReactTimeAgo from "react-time-ago";

import {DeleteSvg} from "assets/icons/svg/DeleteSvg";
import {PageMinusSvg} from "assets/icons/svg/PageMinusSvg";
import {PagePlusSvg} from "assets/icons/svg/PagePlusSvg";
import {EditSvg} from "assets/icons/svg/EditSvg";
import {WatchListSvg} from "../../../assets/icons/svg/WatchListSvg";
import {SendSvg} from "../../../assets/icons/svg/SendSvg";

function ListCard({
                    id,
                    user_id,
                    name,
                    desc,
                    createdAt,
                    videoid,
                    thumbnail,
                    thumbnail_id,
                    channel_name,
                    channel_image,
                    accessToken,
                    watchlistArray
                  }) {
  const [AddWatchList, AddWatchListData] = useMutation(AddToWatchList);


  const [editType, setEditType] = useState(false);
  const [image, setImage] = useState("");

  function AddWatchlist(id) {
    AddWatchList({
      variables: {
        id: user_id,
        videoId: [...watchlistArray, id],
      },
        refetchQueries : [GetWatchList]
    });
  }

  return (
      <div className="row listcard g-0" style={{}}>
        <EditVideoModel
            id={id}
            title={name}
            desc={desc}
            show={editType}
            onHide={() => setEditType(false)}
        />

        <div className="d-flex gap-4 align-content-center col-8 align-items-center first-side   ">
          <div className="img-thumbnail-0  p-0 border-0">
            <img
                src={thumbnail ? `data:image/jpeg;base64,` + thumbnail : videoList}
                className="videoListCard"
                alt="videolist"
            />
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
                <img

                    className="icon" src={TimeIcon} alt="timeicon"/>
                {/*<p> {formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })}</p>*/}
                {/*<p>{formatDistance(subDays(new Date(createdAt),2), new Date(createdAt), { addSuffix: true })}</p>*/}
                <p>
                  <ReactTimeAgo date={createdAt} locale="en-US"/>
                </p>
              </div>
            </div>
            <div>
              <div className="d-flex gap-2 align-content-center align-items-center channel ">
                <img
                    style={{
                      cursor: "pointer",
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
          <div className="d-flex gap-3 mb-2">
            <div>
              <PageMinusSvg height={30} width={30} stroke="#212529"/>
            </div>

            <div>
              <PagePlusSvg height={30} width={30} stroke="#212529"/>
            </div>

            <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setEditType(true)}
            >
              <EditSvg height={30} width={30} stroke="#FFF"/>
            </div>
            {/*Send */}
            <div


            >
              <SendSvg height={30} width={30} stroke="#212529"/>
            </div>

            {/* time watchlist  */}

            <div style={{
              cursor: "pointer",
            }}
                 onClick={() => AddWatchlist(id)}>
              <WatchListSvg height={30} width={30} stroke="#FFF"/>
            </div>

            {/* delete  */}
            <div style={{
              cursor: "pointer",
            }}>
              <DeleteSvg height={30} width={30} stroke="#FFF"/>
            </div>

          </div>
          <div className="bg-dark">
            <Link
                to={`/video/list/0a77fa51f5`}
                state={{
                  id: videoid,
                  accessToken: accessToken,
                }}
            >
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
            </Link>
          </div>
        </div>
      </div>
  );
}

export default ListCard;
