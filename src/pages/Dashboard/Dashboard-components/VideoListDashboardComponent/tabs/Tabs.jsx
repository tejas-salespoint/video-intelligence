import React, {useEffect, useState} from "react";
import "./tabs.scss";

import {useQuery} from "@apollo/client";
import {getAllVideos} from "../../../../../graphql/videosQuery";
import Loader from "../../../../../components/Loader/Loader";
import ListCard from "../../../../VideoList/card/ListCard";
import {DashboardGroups, getGroupData} from "../../../../../graphql/groupQuery";
import GroupListViewComponent from "../../../../../components/groupsListViewComponent/GroupListViewComponent";
import {Waypoint} from 'react-waypoint'

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [accessToken, setAccessToken] = useState();




 

    useEffect(() => getAccessToken(), []);

    function getAccessToken() {
        const accountId = "e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0";
        const accountAccessUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/${accountId}/AccessToken?allowEdit=true`;
        fetch(accountAccessUrl, {
            method: "GET",
            headers: {
                "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAccessToken(data);

                return data;
            })
            .catch((error) => console.log(error))
    }


    const {data, loading, error, fetchMore, networkStatus} = useQuery(getAllVideos, {
        variables: {
            start: 0,
            limit: 5
        }
    });

    const groupsData = useQuery(DashboardGroups, {
        variables: {
            start: 0,
            limit: 5
        }
    });


    // fetch latest videos


    const toggleTab = (index) => {
        setToggleState(index);
    };


    let last_id = data?.videos?.data?.map((item, index) => index)[
    data.videos.data.length - 1
        ] + 1;




    if (loading) return <Loader height="50vh"/>;

    if (error) return <p>Error :( </p>;

    return (
        <div className="container-bg g-0 rounded-4">
        <div className="bloc-tabs">
            <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
            >
                Latest Videos
                {networkStatus === 3 && "Loading....."}
            </button>
            <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
            >
                Group Wide
            </button>
            {/*<button*/}
            {/*    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}*/}
            {/*    onClick={() => toggleTab(3)}*/}
            {/*>*/}
            {/*    Most Viewed*/}
            {/*</button>*/}
        </div>

        <div className="content-tabs">

            {/* latest videos */}

            <div
                className={toggleState === 1 ? "content  active-content" : "content"}
            >
                <div style={{

                    height: '50rem',
                    margin: '1rem'
                }}>


                    {data?.videos?.data?.map((video, index) => (
                        <React.Fragment key={index}>


                            <div className='mb-3' style={{
                                overflow: 'hidden'
                            }}>
                                <ListCard
                                    name={video.attributes.title}
                                    desc={video.attributes.desc}
                                    createdAt={video.attributes.createdAt}
                                    videoid={video.attributes.videoId}
                                    thumbnail={video.attributes.thumbnail}
                                    thumbnail_id={video.attributes.thumbnail_id}
                                    accessToken={accessToken}
                                />
                            </div>

                            {
                                (index === data?.videos?.data?.length - 5) &&
                                (<Waypoint
                                    onEnter={() =>
                                        fetchMore({
                                            variables: {
                                                start: last_id,
                                                limit: 8,
                                            },
                                            updateQuery: (pv, {fetchMoreResult}) => {
                                                if (!fetchMoreResult) {
                                                    return pv;
                                                }
                                                return {
                                                    videos: {
                                                        __typename: "VideoEntityResponseCollection",
                                                        data: [
                                                            ...pv.videos.data,
                                                            ...fetchMoreResult.videos.data,
                                                        ],
                                                        meta: {
                                                            ...fetchMoreResult.videos.meta,
                                                        },
                                                    },
                                                };
                                            },
                                        })
                                    }
                                />)
                            }
                        </React.Fragment>

                    ))}

                    {/*<button*/}
                    {/*    onClick={async () =>*/}
                    {/*        fetchMore({*/}
                    {/*            variables: {*/}
                    {/*                start: last_id,*/}
                    {/*                limit: 8,*/}
                    {/*            },*/}
                    {/*            updateQuery: (pv, {fetchMoreResult}) => {*/}
                    {/*                if (!fetchMoreResult) {*/}
                    {/*                    return pv;*/}
                    {/*                }*/}
                    {/*                return {*/}
                    {/*                    videos: {*/}
                    {/*                        __typename: "VideoEntityResponseCollection",*/}
                    {/*                        data: [...pv.videos.data, ...fetchMoreResult.videos.data],*/}
                    {/*                        meta: {*/}
                    {/*                            ...fetchMoreResult.videos.meta,*/}
                    {/*                        },*/}
                    {/*                    },*/}
                    {/*                };*/}
                    {/*            },*/}
                    {/*        })*/}
                    {/*    }*/}

                    {/*    className='text-bg-dark rounded-4 p-3 my-5'>view more*/}
                    {/*</button>*/}


                </div>

            </div>

            {/* group wide  */}

            <div
                className={toggleState === 2 ? "content  active-content" : "content"}
            >
                <div className='mb-3 d-flex card-panels d-flex flex-column gap-4 flex-wrap '>

                    <div style={{
                        height: '50rem',
                        margin: '1rem'
                    }}>

                    {
                        groupsData?.loading && <p>Loading ....</p>
                    }

                    {
                        groupsData?.data && groupsData?.data?.groups?.data?.map((item,index) => (
                            <div style={{
                                marginBottom : '1rem'
                            }}
                                 key={index}
                            >
                            <GroupListViewComponent title={item.attributes.title}
                                                    thumbnail={item.attributes.image}
                                                    channels={item.attributes.channels}
                                                    desc={item.attributes.desc}
                                                    createdAt={item.attributes.createdAt} id={item.id}/>

                                {
                                    (index === groupsData?.data?.groups?.data?.length - 5) &&
                                    (<Waypoint
                                        onEnter={() =>
                                            groupsData?.fetchMore({
                                                variables: {
                                                    start: groupsData?.data?.groups?.data?.map((item, index) => index)[groupsData.data.groups.data.length - 1] + 1,
                                                    limit: 8,
                                                },
                                                updateQuery: (pv, {fetchMoreResult}) => {
                                                    if (!fetchMoreResult) {
                                                        return pv
                                                    }
                                                    return {
                                                        groups: {
                                                            __typename: "GroupEntityResponseCollection",
                                                            data: [
                                                                ...pv.groups.data,
                                                                ...fetchMoreResult.groups.data
                                                            ],
                                                            meta: {
                                                                ...fetchMoreResult.groups.meta,
                                                            },
                                                        }
                                                    }
                                                }
                                            }
                                            )



                                        }
                                    />)
                                }
                            </div>




                        ))


                    }

                        {/*<button*/}
                        {/*    onClick={async () =>*/}
                        {/*        groupsData?.fetchMore({*/}
                        {/*            variables: {*/}
                        {/*                start: groupsData?.data?.groups?.data?.map((item, index) => index)[groupsData.data.groups.data.length - 1] + 1,*/}
                        {/*                limit: 8,*/}
                        {/*            },*/}
                        {/*            updateQuery: (pv, {fetchMoreResult}) => {*/}
                        {/*                if (!fetchMoreResult) {*/}
                        {/*                    console.log("previous data : " , pv)*/}
                        {/*                    return pv*/}
                        {/*                }*/}
                        {/*                return {*/}
                        {/*                    groups: {*/}
                        {/*                        __typename: "GroupEntityResponseCollection",*/}
                        {/*                        data: [*/}
                        {/*                            ...pv.groups.data,*/}
                        {/*                            ...fetchMoreResult.groups.data*/}
                        {/*                        ],*/}
                        {/*                        meta: {*/}
                        {/*                            ...fetchMoreResult.groups.meta,*/}
                        {/*                        },*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*            }*/}
                        {/*        }*/}
                        {/*        )*/}
                        {/*    }*/}

                        {/*    className='text-bg-dark rounded-4 p-3 my-5'>view more*/}
                        {/*</button>*/}

                    </div>

                </div>

            </div>


            {/*most viewed */}

            {/*<div*/}
            {/*    className={toggleState === 3 ? "content  active-content" : "content"}*/}
            {/*>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>);
}

export default Tabs;