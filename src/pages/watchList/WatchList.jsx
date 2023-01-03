import React, { useEffect } from 'react';
import './watchlist.scss'

import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {SearchIcon} from "../../contants";

import { useLazyQuery, useQuery } from '@apollo/client';
import {GetUserWatchList, GetWatchList, UserWatchListVideos} from 'graphql/watchlistQuery';
import Loader from 'components/Loader/Loader';

import ListView from 'components/video/ListView';
import {useSelector} from "react-redux";

function WatchList(props) {
    const user_id = useSelector((state) => state.auth.user.id)

 

    const {data , loading , error} = useQuery(GetWatchList , {
        variables : {
            "user_id" : user_id
        }
    })


    // const watchlist = useQuery(GetUserWatchList,{
    //     variables :  {
    //         id : 2
    //     }
    // })
    //
    // // const  accessToken  =   getMicrosoftAccessToken()
    // const  accessToken  =   ''
    //
    // const [videosWatchlist , {loading ,error , data}] =   useLazyQuery(UserWatchListVideos);
    //
    // const videoIds = async () => {
    //     const vdata = await watchlist?.data?.usersPermissionsUser?.data?.attributes?.wishlist
    //
    //     videosWatchlist({
    //         variables : {
    //             videoId : await vdata
    //         }
    //     })
    // }


    //
    // useEffect(() => {
    //     videoIds();
    // },[watchlist?.data])
    //
    //
    //
    //
    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;

    
    return (
        <div className='main'>
            <BreadCrumb root="My Profile" path="Tejas Lade"/>

            {/* search bar */}
            {/*<div className="input-group pb-3 rounded-5">*/}
            {/*    <div className="input-group-text ">*/}
            {/*        <img className='searchicon' src={ SearchIcon } alt="searchicon" />*/}
            {/*    </div>*/}
            {/*    <div className="form-floating radius-video-card">*/}
            {/*        <div className='search'>*/}
            {/*            <input type="text" className='search-input color-second ' placeholder='Search'/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* search bar end*/}
            <div className='mt-5'>

            {
                data?.usersPermissionsUser?.data?.attributes?.watchlist?.data?.attributes?.videos?.data?.map(video => (
                    
            <div key={video.id} className='container-fluid mb-4'>
            <ListView
                            name={video.attributes.title}
                            watchlist_attr_show={false}
                            desc={video.attributes.desc}
                            createdAt={video.attributes.createdAt}
                            videoid={video.attributes.videoId}
                            thumbnail={video.attributes.thumbnail}
                            thumbnail_id={video.attributes.thumbnail_id}
                            channel_name={video.attributes.channel?.data?.attributes?.title}
                            channel_image={video.attributes.channel?.data?.attributes?.image}
                            
                            // accessToken={accessToken}
                        />

            </div>
                ))
            }


            </div>
            {/*card*/}
        </div>
    );
}

export default WatchList;