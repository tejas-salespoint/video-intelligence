import React, {useEffect, useState} from "react";
import "./uploadvideo.scss";
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {AnimatedIndexButton, UploadVideoIcon,} from "../../contants";
import axios from "axios";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {CREATE_VIDEO} from "../../graphql/videosQuery";

function UploadVideo({model, setModel}) {




    const accountId = "e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0";
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [accountAccessToken, setAccountAccessToken] = useState("");
    const accountAccessUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/${accountId}/AccessToken?allowEdit=true`;
    const [videoId, setVideoId] = useState("");
    const [videoInsights, setVideoInsights] = useState("");
    const [insights, setInsights] = useState("");
    const [videoDone, setVideoDone] = useState(true)

    const [loadingScreen, setLoadingScreen] = useState();

    const [loadingScreenUpload, setLoadingScreenUpload] = useState(false);
    const [loadingScreenVideoIndexUpload, setLoadingScreenVideoIndexUpload] =
        useState(false);

    let testaccesstokjen = undefined
    let testvideoid = undefined

    let testloadingNumber = undefined
    let videoInsightsData = undefined
    const [videoInsightsFull, setVideoInsightsFull] = useState('')

    const [createVideo, {data, loading, error}] = useMutation(CREATE_VIDEO)

    //Access an account token
    function accountAccessTokenRequestResult() {
        fetch(accountAccessUrl, {
            method: "GET",
            headers: {
                "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                    setAccountAccessToken(data)
                    return data
                }
            )
            .catch((error) =>  console.log(error))


        // 
        // 
    }

    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.get(accountAccessUrl, {
            headers: {
                "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
            }
        }).then((data) => data.data).then((accesstoken) => {
            setAccountAccessToken(accesstoken);
            testaccesstokjen = accesstoken;
            const uploadUrl = `https://api.videoindexer.ai/trial/Accounts/${accountId}/Videos?name=${name}&privacy=Public&description=${desc}&language=English&fileName=${name}&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=false&accessToken=${accesstoken}`;
            const formData = new FormData();
            formData.append("videoUrl", file);

            axios
                .post(uploadUrl, formData)
                .then((response) => {
                    
                    setInsights(response.data);
                    setVideoId(response?.data?.id);
                    testvideoid = response?.data?.id
                    setLoadingScreenUpload(false);
                    setLoadingScreenVideoIndexUpload(true);
                    setVideoDone(false)

                })
                .then(() => {

                    getVideoInsights(testaccesstokjen, testvideoid)
                    


                }).then(() => {

            })

                .catch((error) =>  console.log(error))

        });
    }


    async function getVideoInsights(token, viid) {
        const myinterval = setInterval(function () {
            
            const videoInsighstUrl = `
        https://api.videoindexer.ai/trial/Accounts/${accountId}/Videos/${viid}/Index?language=af-ZA&reTranslate=false&includeStreamingUrls=true&includeSummarizedInsights=true&accessToken=${token}
        `;
            const config = {
                headers: {
                    "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
                },
            };
            const response = axios
                .get(videoInsighstUrl, config)
                .then((response) =>
                    testloadingNumber = response.data.videos[0].processingProgress,
                )
                .catch((error) =>  console.log(error))

            setVideoInsights(videoInsightsData);
            
            // testloadingNumber = response.videos
            setLoadingScreen(testloadingNumber);

            
            if (testloadingNumber == "100%") {
                clearInterval(myinterval);
                fullvideoinsights(token, viid)
                
            }

        }, 2000)
    }

    function fullvideoinsights(token, viid) {
        
        const videoInsighstUrl = `
        https://api.videoindexer.ai/trial/Accounts/${accountId}/Videos/${viid}/Index?language=af-ZA&reTranslate=false&includeStreamingUrls=true&includeSummarizedInsights=true&accessToken=${token}
        `;
        const config = {
            headers: {
                "Ocp-Apim-Subscription-Key": "f70e6ddb41b74a5880d773f63bc1c1ab",
            },
        };
        const response = axios
            .get(videoInsighstUrl, config).then()
            .then((response) =>
                (
                    createVideo({
                        variables: {
                            "title": name,
                            "desc": desc,
                            "channelId": 9,
                            "videoId": viid,
                            "insights": response,
                            "thumbnail_id": response?.data?.videos[0]?.thumbnailId,

                        }
                    }),
                        setVideoInsightsFull(response)
                        

                )
            )
            .catch((error) =>  console.log(error))
        
    }

    useEffect(() => {
        
    }, [videoInsightsFull])


    return (
        <Box>
            <Button onClick={() => setModel(prevData => !prevData)}>Show Modal</Button>
            <p>{model}</p>

            <BreadCrumb root="Upload Video" path="Administrator"/>
            <div className="upload-video-section">
                <form onSubmit={handleSubmit} className="card" style={{
                    width: '128rem !important'
                }}>
                    <div className="card-header">Add Videos</div>
                    <div className="card-body">
                        <div className="card-body-inner">
                            <div
                                className="card-body-inner-upload-button d-flex flex-column align-items-center justify-content-center gap-4">
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    {/* <Spinner
                
                  style={{
                    width: "7rem",
                    height: "7rem",
                    position:'absolute',
                    top:'-6px',
                    bottom: 0,
                    left: '-5px',
                  }}
                  animation="border"
                /> */}
                                    {/*{loadingScreenUpload &&*/}
                                    {/*    loadingScreenVideoIndexUpload == false && (*/}
                                    {/*        <div>*/}
                                    {/*            <img*/}
                                    {/*                style={{*/}
                                    {/*                    borderRadius: "50%",*/}
                                    {/*                    height: "7rem",*/}
                                    {/*                    width: "7rem",*/}
                                    {/*                }}*/}
                                    {/*                src={AnimatedCheckButton}*/}
                                    {/*                alt="animation"*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*    )}*/}
                                    {loadingScreenVideoIndexUpload && (
                                        <div>
                                            <img
                                                style={{
                                                    borderRadius: "50%",
                                                    height: "7rem",
                                                    width: "7rem",
                                                }}
                                                src={AnimatedIndexButton}
                                                alt="animation"
                                            />
                                            <p>
                                                loading
                                                {" " + loadingScreen}
                                            </p>
                                        </div>
                                    )}
                                    {/*<div>*/}
                                    {/*    <img*/}
                                    {/*        style={{*/}
                                    {/*            borderRadius: "50%",*/}
                                    {/*            height: "7rem",*/}
                                    {/*            width: "7rem",*/}
                                    {/*        }}*/}
                                    {/*        src={AnimatedIndexButton}*/}
                                    {/*        alt="animation"*/}
                                    {/*    />*/}
                                    {/*</div>*/}


                                    {
                                        loadingScreenVideoIndexUpload == false && (
                                            <img
                                                className="upload-button-icon"
                                                src={UploadVideoIcon}
                                                alt="UploadVideoIcon"
                                            />
                                        )}


                                </div>

                                {videoDone &&
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

                            </div>
                        </div>

                        {videoDone &&
                            <div className="card-body-inner-form">
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Video Name"
                                            aria-label="Video Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            aria-label="Description"
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                    </div>
                                    {/*<div className="col-3">*/}
                                    {/*    <select className="form-select" aria-label="Default select example">*/}
                                    {/*        <option selected>Select Channel</option>*/}
                                    {/*        <option value="1">One</option>*/}
                                    {/*        <option value="2">Two</option>*/}
                                    {/*        <option value="3">Three</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className="col-3">
                                        <div className="d-flex align-items-center ">
                                            <div className="upload-btn flex-grow-1">
                                                <button disabled={!name && !desc && !file} type="submit">upload video
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

            {/*{insights && (*/}
            {/*    <div*/}
            {/*        className="upload-video-section my-5"*/}
            {/*        style={{*/}
            {/*            width: "86%",*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <div className="card">*/}
            {/*            <div className="card-header">Insights</div>*/}
            {/*            <div className="card-body">*/}
            {/*                <div className="card-body-inner">*/}
            {/*                    <p> {JSON.stringify(insights)} </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{videoInsights && (*/}
            {/*    <div*/}
            {/*        className="upload-video-section my-5"*/}
            {/*        style={{*/}
            {/*            width: "86%",*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <div className="card">*/}
            {/*            <div className="card-header">Insights</div>*/}
            {/*            <div className="card-body">*/}
            {/*                <div className="card-body-inner">*/}
            {/*                    <p> {JSON.stringify(videoInsights)} </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* <Button
        className="my-5"
        onClick={() => {
          getVideoInsights();
        }}
      >
        Get Video Insights{" "}
      </Button> */}
            <br/>
            <Link
                to={`/video/list/${videoId}`}
                state={{
                    id: videoId,
                    accessToken: accountAccessToken,
                }}
            >
                <Button className="btn-primary">Video Insights Page</Button>

                {loadingScreen && (
                    <button class="btn btn-primary" type="button" disabled>
            <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
            ></span>
                        Loading
                        {loadingScreen}
                    </button>
                )}
            </Link>

            <Button>Change Value</Button>
        </Box>
    );
}

export default UploadVideo;
