import React,{useEffect, useState} from "react";
import "./tabs.scss";
import ListCard from "../../SimpleVideoList/card/ListCard";
import {useQuery} from "@apollo/client";
import {DashboardGroups, getGroupData} from "../../../graphql/groupQuery";
import {getAllVideos} from "../../../graphql/videosQuery";
import {Waypoint} from "react-waypoint";
import GroupListViewComponent from "../../../components/groupsListViewComponent/GroupListViewComponent";

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };


    const [accessToken, setAccessToken] = useState();

    const groupsData = useQuery(DashboardGroups, {
        variables: {
            limit: 5,
            start: 0
        }
    });



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
            limit: 5,
            start: 0
        }
    });
    return (
        <div className=" g-0 rounded-4">

            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Latest Videos
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

            <div className="content-tabs" style={{
                width: '100%'
            }}>
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                    style={ {
                        height : '80vh'
                    }}
                >


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
                                                start:
                                                    data?.videos?.data?.map((item, index) => index)[
                                                    data.videos.data.length - 1
                                                        ] + 1,
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
                    {/*    onClick={() =>*/}
                    {/*        fetchMore({*/}
                    {/*            variables: {*/}
                    {/*                start:*/}
                    {/*                    data?.videos?.data?.map((item, index) => index)[*/}
                    {/*                    data.videos.data.length - 1*/}
                    {/*                        ] + 1,*/}
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

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                    style={ {
                        height : '80vh'
                    }}
                >
                    <div className='mb-3 d-flex card-panels d-flex flex-column gap-4 flex-wrap '>
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
                    </div>


                </div>
            </div>

            {/*<div*/}
            {/*    className={toggleState === 3 ? "content  active-content" : "content"}*/}
            {/*>*/}
            {/*    <div className='mb-3'>*/}
            {/*        <ListCard name="tejas" desc="desc" createdAt={new Date()} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>


    );
}

export default Tabs;