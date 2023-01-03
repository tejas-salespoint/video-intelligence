import React from "react";
import "../uploadVideo/uploadvideo.scss";
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {useQuery} from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import {getAllVideos} from "../../graphql/videosQuery";
import {Waypoint} from "react-waypoint";
import ListCard from "../VideoList/card/ListCard";

function SampleUpload({model, setModel}) {

    const {data, loading, error, fetchMore} = useQuery(getAllVideos, {
        variables: {
            limit: 5
        }
    })

    const last_id = data?.videos?.data?.map((item, index) => index)[
    data.videos.data.length - 1
        ] + 1

    if (loading) return <Loader/>;
    if (error) return <p>Error:)</p>;

    return (
        <Box>
            {/*<Button onClick={() => setModel(prevData => !prevData)}>Show Modal</Button>*/}
            {/*<p>{model}</p>*/}

            <BreadCrumb root="Infinity Scroll" path="testing"/>
            <h1>Infinity Scroll and View More</h1>
            <div className='bg-gradient p-5 d-flex flex-column gap-3 justify-content-center align-items-center '>

                {
                    data?.videos?.data?.map((video, index) =>
                        (
                            <>
                                <ListCard
                                    name={video.attributes.title}
                                    desc={video.attributes.desc}
                                    createdAt={video.attributes.createdAt}
                                    videoid={video.attributes.videoId}
                                    thumbnail={video.attributes.thumbnail}
                                    thumbnail_id={video.attributes.thumbnail_id}

                                />

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

</>
                    )
                    )
                }


                <button
                    onClick={async () =>
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
                                        data: [...pv.videos.data, ...fetchMoreResult.videos.data],
                                        meta: {
                                            ...fetchMoreResult.videos.meta,
                                        },
                                    },
                                };
                            },
                        })
                    }

                    className='text-bg-dark rounded-4 p-3 my-5'>view more
                </button>


            </div>

        </Box>
    );
}

export default SampleUpload;
