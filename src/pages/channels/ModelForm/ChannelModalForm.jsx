import React, {useEffect, useRef, useState} from 'react';
import './channelmodalform.scss'
import {Button, Modal} from "react-bootstrap";
import {useFormik} from 'formik';
import axios from "axios";
import {PreviewUploadImage} from "../../../contants";
import {useMutation} from "@apollo/client";
import {CREATE_CHANNEL, GET_CHANNELS} from "../../../graphql/channelsQuery";
import Loader from "../../../components/Loader/Loader";
import {GET_OUR_USER} from "../../../graphql/userQuery";


function ChannelModalForm(props) {
    const [createChannel, {data, loading, error}] = useMutation(CREATE_CHANNEL)

    const [title,setTitle] = useState('')
    const [subTitle,setSubTitle] = useState('')
    const [desc,setDesc] = useState('')

    const [newChannels, setNewChannels] = useState({
        title: 'hello',
        subtitle: 'hello',
        desc: 'hello',
    })


    const fileInputRef = useRef()
    const [preview, setPreview] = useState('');
    const [fileImage, setFileImage] = useState()

    useEffect(() => {
        if (fileImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(fileImage);
        } else {
            setPreview(null);
        }
    }, [fileImage])




    async function handleSubmit(event) {
        event.preventDefault();

        await createChannel({
            variables: {
                "title": title,
                "subtitle": subTitle,
                "desc": desc,
                "image": preview

            },

            refetchQueries: [GET_CHANNELS],
        })

        setSubTitle('')
        setPreview()
        setTitle('')
        setDesc('')
        props.onHide()


    }

    // function changeValue(field) {
    //     setNewChannels({
    //         ...newChannels,
    //         field
    //     })
    // }

    return (
        <div className='channel-modal'>

            <Modal
                {...props}
                className='channel-container'
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='channel-header' closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Channel 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='channel-body'>

                    <p>
                        Set up a channel to organize your videos.
                    </p>




                    <form className='channelform' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6 form-first-section-channel'>
                                        <div className='mb-3'>


                                            <label htmlFor="name" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="name"
                                                // onChange={formik.handleChange}
                                                // value={formik.values.name}/>
                                                   value={title}
                                                   onChange={(event) => setTitle(event.target.value)}


                                            />
                                        </div>


                                        <div className='mb-4'>
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <textarea className="form-control" id="desc" rows="4"
                                                      value={desc}
                                                      onChange={(event) => setDesc(event.target.value)}
                                                      placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim etiam semper neque, quis. '
                                            ></textarea>
                                        </div>


                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>


                                            <label htmlFor="subtitle" className="form-label">Subtitle</label>
                                            <input type="text" className="form-control" id="subtitle"
                                                   placeholder="subtitle"
                                                   value={subTitle}
                                                   onChange={(e) => setSubTitle(e.target.value)}
                                            />
                                        </div>
                                        {/*<div className='mb-4'>*/}
                                        {/*    <label htmlFor="desc" className="form-label">Description</label>*/}
                                        {/*    <textarea className="form-control" id="desc" rows="4"*/}
                                        {/*              onChange={formik.handleChange}*/}
                                        {/*              value={formik.values.desc}*/}
                                        {/*              placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim etiam semper neque, quis. '*/}
                                        {/*    ></textarea>*/}
                                        {/*</div>*/}

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                {/*<label htmlFor="file" className="form-label">Upload*/}
                                                {/*    <input name='file'*/}
                                                {/*           value={formik.values.file}*/}
                                                {/*           onChange={(event) => ("file", event.target.files[0])}*/}
                                                {/*           type="file" className="form-control" id="file"*/}
                                                {/*    />*/}

                                                {/*</label>*/}
                                                <label htmlFor="Upload"> Upload</label>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    fileInputRef.current.click();
                                                }} className='channel-form-upload-button mt-2'>
                                                    image
                                                </button>
                                                <input type="file" style={{display: "none"}} ref={fileInputRef}
                                                       accept="image/*"
                                                       onChange={(event) => {
                                                           const file = event.target.files[0];
                                                           if (file && file.type.substring(0, 5) === 'image') {
                                                               setFileImage(file)
                                                           } else {
                                                               setFileImage(null)
                                                           }
                                                       }}
                                                       name="file" id="file"/>
                                            </div>
                                            <div className='col-md-6 file-upload-preview-image d-flex flex-column'>
                                                <label htmlFor="Upload"> Preview </label>
                                                {
                                                    preview ?
                                                        <>
                                                            <img className='mt-2' src={preview} alt="image"/>
                                                            <button onClick={() => setPreview(null)} style={{
                                                                background: 'red'
                                                            }
                                                            } className='btn-danger'>Remove
                                                            </button>
                                                        </>
                                                        :

                                                        <img className='mt-2' src={PreviewUploadImage} alt="image"/>

                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>

                            </div>
                        </div>


                        <Modal.Footer className='channel-footer mt-5'>
                            <div className='d-flex justify-content-end gap-3'>
                                <Button onClick={props.onHide}>Close</Button>
                                <Button type='submit'>Create</Button>
                            </div>
                        </Modal.Footer>
                    </form>


                </Modal.Body>

            </Modal>
        </div>
    );
}

export default ChannelModalForm