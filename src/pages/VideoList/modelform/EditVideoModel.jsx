import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {PreviewUploadImage} from "../../../contants";
import {useMutation} from "@apollo/client";
import {getAllVideos, UPDATE_VIDEO} from "../../../graphql/videosQuery";

const EditVideoModel = (props) => {

    const [title, setTitle] = useState(props?.title)
    const [desc, setDesc] = useState(props?.desc)
    const [updateVideo, {data, loading, error}] = useMutation(UPDATE_VIDEO);


    function handleSubmit(event) {
        event.preventDefault();
        


        if (props.id && title && desc) {

            updateVideo({
                variables: {
                    "id": props?.id,
                    "title": title,
                    "desc": desc
                },
                refetchQueries: [getAllVideos]
            })

            props.onHide();
        } else {
            
        }


        //     graphql mutation
    }


    return (
        <div className='group-modal'>
            <Modal
                {...props}
                className='group-container'
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='group-header' closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='group-body'>

                    <p>
                        Edit a video
                    </p>


                    <form className='groupform' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-12 form-first-section-group'>
                                        <div className='mb-3'>


                                            <label htmlFor="name" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="name"
                                                   value={title}
                                                   onChange={(e) => setTitle(e.target.value)}

                                            />

                                        </div>


                                        <div className='mb-4'>
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <textarea className="form-control" id="desc" rows="4"
                                                      value={desc}
                                                      onChange={(e) => setDesc(e.target.value)}
                                                      maxLength='200'
                                                      placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim etiam semper neque, quis. '
                                            ></textarea>
                                        </div>


                                    </div>


                                </div>

                            </div>
                            <div>

                            </div>
                        </div>


                        <Modal.Footer className='group-footer mt-5'>
                            <div className='d-flex justify-content-end gap-3'>
                                <Button style={{
                                    padding: '0.6rem 2rem'
                                }} onClick={props.onHide}>Close</Button>
                                <Button style={{
                                    padding: '0.6rem 2rem'
                                }} type='submit'>Edit</Button>
                            </div>
                        </Modal.Footer>
                    </form>


                </Modal.Body>

            </Modal>
        </div>
    );
};

export default EditVideoModel;
