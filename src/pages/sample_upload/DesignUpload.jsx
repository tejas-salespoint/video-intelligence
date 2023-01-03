import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Box from "../../components/Box/Box";
import '../uploadVideo/uploadvideo.scss'
import {forwardTovideoInsights, UploadVideoIcon, uploadVideoLoadingData, videoUploadDoneData} from "../../contants";

import Animation from "../../components/AnimationLoaderComponent/Animation";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_VIDEO} from "../../graphql/videosQuery";
import axios from "axios";
import {GET_CHANNELS} from "../../graphql/channelsQuery";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAccessToken, addIndexingProgress, addVideoId} from "../../redux/uploadDataSlice";
import Loader from "../../components/Loader/Loader";


const accessTokenUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/AccessTokenWithPermission?permission=Contributor`


const config = {
    headers: {
        "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
    },
};


const DesignUpload = () => {

    const uploadRedux = useSelector(state => state.upload)
    const dispatch = useDispatch()

    

    const [loadingStateUpload, setLoadingStateUpload] = useState()
    const channelData = useQuery(GET_CHANNELS)
    const token = localStorage.getItem('token');
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();

    const [loadingE, setLoadingE] = useState(false)
    const [channelId, setChannelId] = useState();
    const [thumnailId, setThumnailId] = useState();
    const [thumbnail, setThumbnail] = useState();

    const [ videoInsightsForward ,setVideoInsightsForward] = useState({
        'videoId' : uploadRedux?.videoId ? uploadRedux.videoId : '',
        'accessToken' : uploadRedux?.accessToken ? uploadRedux.accessToken : ''
    })

    const [createVideo, {data, loading, error}] = useMutation(CREATE_VIDEO)


    let loadingStateProgress = undefined
    const [loadingScreen, setLoadingScreen] = useState(uploadRedux?.indexingProgress);

    useEffect(() => {
        setLoadingScreen(uploadRedux?.indexingProgress)
        setVideoInsightsForward({
            'videoId' : uploadRedux.videoId ? uploadRedux.videoId : '',
            'accessToken' : uploadRedux.accessToken ? uploadRedux.accessToken : ''
        })
    },[uploadRedux?.indexingProgress,uploadRedux?.videoId,uploadRedux?.accessToken])

    async function handleSubmit(event) {
        let thumbnailbase64 = undefined
        event.preventDefault();
        setLoadingE(true)

        // Todo  step : 1 => get a access token form microsoft api\
        const getAccessToken = async () => {
            return axios.get(accessTokenUrl, config)
        }
        const getAccessTokenData = await getAccessToken()
        dispatch(addAccessToken( await getAccessTokenData?.data))
        await setVideoInsightsForward({  ...videoInsightsForward , accessToken: getAccessTokenData?.data  } )
        



        // Todo  step : 2 => Upload a video from microsoft api

        const postVideoOnMicrosoft = async () => {
            const uploadUrl = `https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos?name=${title}&privacy=Public&description=${desc}&language=English&fileName=${title}&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=false&accessToken=${await getAccessTokenData?.data}`;
            const formData = new FormData();
            formData.append("videoUrl", file);
            return await axios.post(uploadUrl, formData)
        }

        const postVideoOnMicrosoftData = await postVideoOnMicrosoft()
        const postVideoOnMicrosoftData_viid = await postVideoOnMicrosoftData?.data?.id
        
        dispatch(addVideoId( await postVideoOnMicrosoftData_viid))
        await setVideoInsightsForward({  ...videoInsightsForward , videoId: postVideoOnMicrosoftData_viid  } )

        setLoadingE(false)


        // Todo  step : 3 => get a video loading state

        const getVideoInsights = async () => {
            const videoInsighstUrl = `https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos/${await postVideoOnMicrosoftData_viid}/Index?language=af-ZA&reTranslate=false&includeStreamingUrls=true&includeSummarizedInsights=true&accessToken=${await getAccessTokenData?.data}
        `;
            let result;


            const myinterval = setInterval(async () => {
                result = await axios.get(videoInsighstUrl, config)
                loadingStateProgress = await result?.data?.videos[0]?.processingProgress
                
                // let save = async () => {
                //     dispatch(addIndexingProgress(await loadingStateProgress))
                // };
                dispatch(addIndexingProgress(await loadingStateProgress))
                setLoadingScreen(loadingStateProgress)

                if (loadingStateProgress == '100%'  || loadingScreen == '100%') {
                    await clearInterval(myinterval);
                    setThumnailId(await result?.data?.videos[0].thumbnailId)
                    thumbnailbase64 = await getThumbnail(await result?.data?.videos[0].thumbnailId)
                    let videoInsightsResponseData = await videoInsightsResponse();
                    let insights = await videoInsightsResponseData?.data
                    let videoSaveWithThumbnailData = await videoSaveWithThumbnail(insights, await thumbnailbase64?.data);
                    
                    setThumbnail(thumbnailbase64)
                    
                    return await result, thumbnailbase64
                }

            }, 2000)


            return await thumbnailbase64

        }

        const getVideoInsightsData = await getVideoInsights()


        // step : 4 => get a detail of uploaded video and store a thumnail id
        //    step : 5 => get a thumbnail with the help of thumbnail id

        const getThumbnail = async (id) => {
            const thumbnailUrl = await `https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos/${postVideoOnMicrosoftData_viid}/Thumbnails/${id}?format=Base64&accessToken=${await getAccessTokenData?.data}`
            return await axios.get(thumbnailUrl, config)
        }

        //    step : 6 => store inisghts and thumnail on strapi backend

        const videoInsightsResponse = async () => {
            const videoInsighstUrl = `
        https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos/${await postVideoOnMicrosoftData_viid}/Index?language=af-ZA&reTranslate=false&includeStreamingUrls=true&includeSummarizedInsights=true&accessToken=${await getAccessTokenData?.data}
        `;

            return await axios.get(videoInsighstUrl, config)



        }

        // const videoInsightsResponseData = await videoInsightsResponse()
        //

        // const graphqlCreateVideo = async (insights_data) => {
        //     try {
        //        await createVideo({
        //             variables: {
        //                 "title": title,
        //                 "desc": desc,
        //                 "channelId": 9,
        //                 "videoId": postVideoOnMicrosoftData_viid,
        //                 "insights": insights_data,
        //                 "thumbnail":await thumbnail,
        //                 "thumbnail_id": '',
        //
        //             }
        //         })
        //
        //         // setVideoInsightsFull(videoInsightsResponse),
        //         // //
        //
        //     } catch (error) {
        //
        //     } finally {
        //
        //     }
        //
        //     return data
        // }

        // const graphqlCreateVideoData = await graphqlCreateVideo();
        //

        const videoSaveWithThumbnail = async (insights, thum) => {
            const videoSaveWithThumbnailUrl = `http://localhost:1337/api/videos`;

            let Authorizationconfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return await axios.post(videoSaveWithThumbnailUrl, {

                data: {
                    "title": title,
                    "desc": desc,
                    "channel" :  channelId,
                    "videoId": postVideoOnMicrosoftData_viid,
                    "insights": insights,
                    "thumbnail": thum,
                    "thumbnail_id": ''
                }
            }, Authorizationconfig)
        }

        // const videoSaveWithThumbnailData = await videoSaveWithThumbnail();
        // 





    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <Box>

            {/*<Button onClick={() => setModel(prevData => !prevData)}>Show Modal</Button>*/}
            {/*<p>{model}</p>*/}

            <BreadCrumb root="Upload Video" path="Administrator"/>


            <div className="upload-video-section">
                <form onSubmit={handleSubmit} className="card" style={{
                    width: '128rem !important'
                }}>
                    <div className="card-header">Add Videos</div>
                    <div className="card-body">
                        <div className="card-body-inner">
                            <divtest
                                className="card-body-inner-upload-button d-flex flex-column align-items-center justify-content-center gap-4">
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >

                                    {
                                        !loadingScreen && !loadingE &&
                                    <img
                                        className="upload-button-icon"
                                        src={UploadVideoIcon}
                                        alt="UploadVideoIcon"
                                    />
                                    }




                                    {/*<div style={{*/}
                                    {/*    width: '6rem',*/}
                                    {/*    height: '6rem'*/}
                                    {/*}} className="spinner-border text-primary" role="status">*/}

                                    {/*</div>*/}

                                    {
                                        loadingE && <Loader  height={'20vh'} />
                                    }


                                    {(loadingScreen && loadingScreen != "100%") &&
                                        <div className='d-flex flex-column align-items-center'>
                                            {/*<img*/}
                                            {/*    style={{*/}
                                            {/*        borderRadius: "50%",*/}
                                            {/*        height: "7rem",*/}
                                            {/*        width: "7rem",*/}
                                            {/*    }}*/}
                                            {/*    src={AnimatedIndexButton}*/}
                                            {/*    alt="animation"*/}
                                            {/*/>*/}
                                            <Animation data={uploadVideoLoadingData} height={130} width={130}/>


                                            <p className='' style={{
                                                fontSize: '2rem'
                                            }}>
                                                Loading
                                                {'  ' + loadingScreen}
                                            </p>
                                        </div>
                                    }

                                    {loadingScreen == "100%" &&
                                        <>
                                            <Animation data={videoUploadDoneData} height={130} width={130}/>
                                            <Link
                                                to={`/video/list/${videoInsightsForward?.videoId}`}
                                                state={{
                                                    id: videoInsightsForward?.videoId,
                                                    accessToken: videoInsightsForward?.accessToken,
                                                }}
                                            >

                                            <div className=' videoForward d-flex'>
                                                <input  value={`http://videoIntelligence/${ videoInsightsForward?.videoId } `} type={"string"} />
                                                <button>
                                                    <img style={{
                                                        height : '3rem'
                                                    }} src={forwardTovideoInsights} alt="link" />
                                                </button>
                                            </div>
                                            </Link>
                                        </>
                                    }


                                </div>

                                {
                                    !loadingScreen && !loadingE &&
<>
                                    <div className="d-flex flex-column align-items-center">
                                        <p>Drag and Drop here</p>
                                        <p>OR </p>
                                    </div>
                                {/*<Button>*/}
                                {/*    Browse Files*/}
                                {/*</Button>*/}
                                    <input
                                    type={"file"}
                                    name={"videoUrl"}
                                    onChange={handleChange}
                                    />
</>
                                }

                            </divtest>
                        </div>

                        {
                            !loadingScreen && !loadingE &&
                            <div className="card-body-inner-form">
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Video Name"
                                            aria-label="Video Name"
                                            value={title} onChange={(e) => setTitle(e.target.value)}

                                        />
                                    </div>
                                    <div className="col-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            aria-label="Description"
                                            value={desc} onChange={(e) => setDesc(e.target.value)}

                                        />
                                    </div>
                                    <div className="col-3 select_box">
                                        <select
                                            style={{
                                                width: '100%'
                                            }}
                                            value={channelId}
                                            onChange={(e) => setChannelId(e.target.value)}
                                            className="  " aria-label="Default select example">
                                            <option selected>Select Channel</option>
                                            {
                                                channelData?.data?.channels?.data?.map(item => (
                                                    <option key={item.id}
                                                            value={item.id}>{item.attributes.title} {item.id}</option>
                                                ))
                                            }

                                            {/*<option value="2">Two</option>*/}
                                            {/*<option value="3">Three</option>*/}

                                        </select>

                                    </div>
                                    <div className="col-3">
                                        <div className="d-flex align-items-center ">
                                            <div className="upload-btn flex-grow-1">
                                                {/*<button*/}
                                                {/*    disabled={!name && !desc && !file} type="submit">upload video*/}
                                                {/*</button>*/}
                                                <button
                                                    type="submit">upload video
                                                </button>
                                            </div>
                                            <div className="cancel-btn flex-grow-1">
                                                <button>cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </form>
            </div>



        </Box>
    );
};

export default DesignUpload;