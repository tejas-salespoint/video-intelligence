import React, {useState} from 'react';
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Box from "../../components/Box/Box";
import axios from "axios";
import {Button} from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import {useMutation} from "@apollo/client";
import {CREATE_VIDEO} from "../../graphql/videosQuery";

const accessTokenUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/AccessTokenWithPermission?permission=Contributor`


const config = {
    headers: {
        "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
    },
};


function NewSampleUpload(props) {
    const token = localStorage.getItem('token');
    const [file, setFile] = useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [loadingE, setLoadingE] = useState(false)
    const [channelId, setChannelId] = useState();
    const [thumnailId, setThumnailId] = useState();
    const [thumbnail, setThumbnail] = useState();

    const [createVideo, {data, loading, error}] = useMutation(CREATE_VIDEO)


    let loadingStateProgress = undefined
    const [loadingScreen, setLoadingScreen] = useState();


    async function handleSubmit(event) {
        let thumbnailbase64 = undefined
        event.preventDefault();
        setLoadingE(true)

        // Todo  step : 1 => get a access token form microsoft api\
        const getAccessToken = async () => {
            return axios.get(accessTokenUrl, config)
        }
        const getAccessTokenData = await getAccessToken()
        


        // Todo  step : 2 => Upload a video from microsoft api

        const postVideoOnMicrosoft = async () => {
            const uploadUrl = `https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos?name=${title}&privacy=Public&description=${desc}&language=English&fileName=${title}&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=false&accessToken=${await getAccessTokenData?.data}`;
            const formData = new FormData();
            formData.append("videoUrl", file);
            return await axios.post(uploadUrl, formData)
        }

        const postVideoOnMicrosoftData = await postVideoOnMicrosoft()
        const postVideoOnMicrosoftData_viid = await postVideoOnMicrosoftData?.data?.id
        

        // Todo  step : 3 => get a video loading state

        const getVideoInsights = async () => {
            const videoInsighstUrl = `
        https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos/${await postVideoOnMicrosoftData_viid}/Index?language=af-ZA&reTranslate=false&includeStreamingUrls=true&includeSummarizedInsights=true&accessToken=${await getAccessTokenData?.data}
        `;

            let result;


            const myinterval = setInterval(async () => {
                result = await axios.get(videoInsighstUrl, config)
                loadingStateProgress = await result?.data?.videos[0]?.processingProgress
                
                setLoadingScreen(loadingStateProgress);

                if (loadingStateProgress == '100%') {
                    await clearInterval(myinterval);
                    setThumnailId(await result?.data?.videos[0].thumbnailId)
                    thumbnailbase64 = await getThumbnail(await result?.data?.videos[0].thumbnailId)
                    let videoInsightsResponseData = await  videoInsightsResponse();
                    let insights = await videoInsightsResponseData?.data
                    let videoSaveWithThumbnailData = await videoSaveWithThumbnail(insights,await  thumbnailbase64?.data);
                    
                    setThumbnail(thumbnailbase64)
                    
                    return await result, thumbnailbase64
                }

            }, 2000)


            return await  thumbnailbase64

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

            return  await axios.get(videoInsighstUrl,config)



            // const graphqlCreateVideo = async ( result) => {
            //     try {
            //         await createVideo({
            //             variables: {
            //                 "title": title,
            //                 "desc": desc,
            //                 "channelId": 9,
            //                 "videoId": postVideoOnMicrosoftData_viid,
            //                 "insights": result?.data,
            //                 "thumbnail":await thumbnail,
            //                 "thumbnail_id": ''
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
            //
            // }

            // await graphqlCreateVideo(result);
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

        const videoSaveWithThumbnail = async (insights,thum) => {
            const videoSaveWithThumbnailUrl =  `http://localhost:1337/api/videos`;

            let Authorizationconfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return await axios.post(videoSaveWithThumbnailUrl,{

                data : {
                    "title": title,
                    "desc": desc,
                    "channelId": 9,
                    "videoId": postVideoOnMicrosoftData_viid,
                    "insights": insights,
                    "thumbnail": thum,
                    "thumbnail_id": ''
                }
            },Authorizationconfig)
        }

        // const videoSaveWithThumbnailData = await videoSaveWithThumbnail();
        // 


        setLoadingE(false)


    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    return (
        <Box>
            {/*<Button onClick={() => setModel(prevData => !prevData)}>Show Modal</Button>*/}
            {/*<p>{model}</p>*/}

            <BreadCrumb root="Upload Video" path="Administrator"/>

            {loadingE && <Loader/>}
            {loadingScreen && <p>Loading {loadingStateProgress}</p>}
            {loadingScreen == "100%" && <p>DONE.....DONE.....DONE</p>}
            <p>
                {loadingScreen}
            </p>
            <div>
                <form className='d-flex gap-5 ' onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange}/>

                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                           placeholder="Enter a title"/>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}
                           placeholder="Enter a Description"/>
                    <Button type='submit'>Submit</Button>

                </form>
            </div>
        </Box>
    );
}

export default NewSampleUpload;