import React, {useEffect, useState} from 'react';
import './uploadvideo.scss'
import Box from "../../components/Box/Box";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import {UploadVideoIcon} from "../../contants";

import {Formik} from "formik";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";



const URL = "https://api.videoindexer.ai/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/Videos?name=video-website&privacy=Private&description=video_website&language=English&fileName=video_website&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=false&accessToken=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJlMGI2YzFmZC1lMmU3LTQ5ZmEtYjlmZi02NzFjMzVkNDE0YTAiLCJQZXJtaXNzaW9uIjoiQ29udHJpYnV0b3IiLCJFeHRlcm5hbFVzZXJJZCI6IjE3OTI1MDlFQjZERTRDMjBCMjAzOTEzRDlEOUI3NDdBIiwiVXNlclR5cGUiOiJNaWNyb3NvZnRDb3JwQWFkIiwiSXNzdWVyTG9jYXRpb24iOiJUcmlhbCIsIm5iZiI6MTY2NzU0NjgzOCwiZXhwIjoxNjY3NTUwNzM4LCJpc3MiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIiwiYXVkIjoiaHR0cHM6Ly9hcGkudmlkZW9pbmRleGVyLmFpLyJ9.qEmtTTz2wLiThaXV8bed-J-q7YBp0MIftvjofbiDXPQ"
const apiUrl = "https://api.videoindexer.ai";

const accountId = "e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0";
//primary subscription key
const apiKey = "f70e6ddb41b74a5880d773f63bc1c1ab";



function SecondUploadVideo(props) {


    const [name,setName] = useState()
    const [desc, setDesc] = useState()
    const [accountAccessToken,setAccountAccessToken] = useState('')
    const accountAccessUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/${accountId}/AccessToken?allowEdit=true`

    const [accToken,setAccToken] = useState('')
    //Access an account token
   async function accountAccessTokenRequestResult() {
         await fetch(accountAccessUrl, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': 'f70e6ddb41b74a5880d773f63bc1c1ab',
            }
        }).then((response) => response.json())
            .then((data) => setAccountAccessToken(data)).catch((error) =>  console.log(error))


        // 
        // 


    }






    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault();
        accountAccessTokenRequestResult().then(() => {
            const uploadUrl = `https://api.videoindexer.ai/trial/Accounts/${accountId}/Videos?name=${name}&privacy=Private&description=${desc}&language=English&fileName=${name}&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=false&accessToken=${accountAccessToken}`
            const formData = new FormData();
            formData.append("videoUrl", file)

            axios.post(uploadUrl, formData).then((response) => {
                
            }).catch((error) =>  console.log(error))
        }
    )

        }


    return (
        <Box>
            <BreadCrumb root='Upload Video' path='Administrator'/>
            <div className='upload-video-section'>

                <Button onClick={accountAccessTokenRequestResult}>Get Account Access Token</Button>

                <Form onSubmit={handleSubmit} >

                    <FormGroup>
                        <Label for="name">
                            name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="video name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="token">
                            accesstoken
                        </Label>
                        <Input
                            id="token"
                            name="token"
                            placeholder="video token name"
                            value={accToken}
                            onChange={(e) => setAccToken(e.target.value)}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desc">
                            desc
                        </Label>
                        <Input
                            id="desc"
                            name="desc"
                            placeholder="video desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}

                        />
                    </FormGroup>
                    <Input type='file' name='file'  onChange={handleChange} />
                    <Button type='submit'>Submit</Button>
                </Form>

            </div>
        </Box>
    );
}

export default SecondUploadVideo;