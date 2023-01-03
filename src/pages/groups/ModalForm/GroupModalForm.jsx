import React, {useEffect, useRef, useState} from 'react';
import './groupModalForm.scss'
import {Button, Modal} from "react-bootstrap";
import {useFormik} from 'formik';
import {PreviewUploadImage} from "../../../contants";
import {create_group, getGroupData, UpdateGroupData} from "../../../graphql/groupQuery";
import {useMutation} from "@apollo/client";


function GroupModalForm(props) {
    const fileInputRef = useRef()
    const [preview, setPreview] = useState('');
    const [fileImage, setFileImage] = useState()
    const reader = new FileReader();
    const [CreateGroupData, {data, loading, error}] = useMutation(create_group);

    useEffect(() => {
        if (fileImage) {

            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(fileImage);
        } else {
            setPreview(null);
        }
    }, [fileImage])


    //Edit group form


    const formik = useFormik({


        initialValues: {
            title: '',
            subtitle: '',
            desc: '',
            file: ''
        },


        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            function createPost() {

                CreateGroupData({
                    variables: {
                        id: props.id,
                        title: values.title,
                        desc: values.desc,
                        subtitle: values.subtitle,
                        image: preview
                    },
                    refetchQueries: [getGroupData]
                }).then(() => {
                    values.title = ''
                    values.subtitle = ''
                    values.desc = ''
                    setPreview('')
                    props.onHide()
                })
            }

            createPost();


        },
    });
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
                        Create Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='group-body'>

                    <p>
                        Create a microsoft Stream group connected to an Office 365 group as an easy way to organize who
                        has permission to see and edit your videos and channels.
                    </p>


                    <form className='groupform' onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6 form-first-section-group'>
                                        <div className='mb-3'>


                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title"
                                                   placeholder="Title"
                                                   onChange={formik.handleChange}
                                                   value={formik.values.title}/>
                                        </div>


                                        <div className='mb-4'>
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <textarea className="form-control" id="desc" rows="4"
                                                      onChange={formik.handleChange}
                                                      value={formik.values.desc}
                                                      maxLength='200'
                                                      placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim etiam semper neque, quis. '
                                            ></textarea>
                                        </div>


                                    </div>
                                    <div className='col-md-6'>

                                        <div className='mb-3'>


                                            <label htmlFor="subtitle" className="form-label">Subtitle</label>
                                            <input type="text" className="form-control" id="subtitle"
                                                   placeholder="subtitle"
                                                   onChange={formik.handleChange}
                                                   value={formik.values.subtitle}/>
                                        </div>

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
                                                    // accept="image/*"
                                                       accept=".jpg, .jpeg"
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


                        <Modal.Footer className='group-footer mt-5'>
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

export default GroupModalForm;