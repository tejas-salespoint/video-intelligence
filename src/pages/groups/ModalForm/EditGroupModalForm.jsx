import React, {useEffect, useRef, useState} from 'react';
import './groupModalForm.scss'
import {Button, Modal} from "react-bootstrap";
import {PreviewUploadImage} from "../../../contants";
import {getGroupData, UpdateGroupData} from "../../../graphql/groupQuery";
import {useMutation} from "@apollo/client";



function EditGroupModalForm(props) {

    const fileInputRef = useRef()
    const [preview, setPreview] = useState(props?.image);
    const [fileImage, setFileImage] = useState()
    const reader = new FileReader();


    useEffect(() => {
        if (fileImage) {
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(fileImage);
        } else {
            setPreview(props?.image);
        }
    }, [fileImage])


    //form edit

    //usestate
    const [title, setTitle] = useState(props.title)
    const [subtitle, setSubtitle] = useState(props.subtitle)
    const [description, setDescription] = useState(props.desc)

    const [editGroupData, {data, loading, error}] = useMutation(UpdateGroupData);


    function onSubmit(e) {
        e.preventDefault();

        editGroupData({
            variables: {
                id: props.id,
                title: title,
                desc: description,
                subtitle: subtitle,
                image: preview

            },
            refetchQueries: [getGroupData]
        }).then(() => {
            props.onHide()


        })
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
                        Edit Group
                        {props?.config?.cardType}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='group-body'>


                    <form className='groupform' onSubmit={onSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6 form-first-section-group'>
                                        <div className='mb-3'>

                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input required type="text" className="form-control" id="title"
                                                   placeholder="title"
                                                   value={title}
                                                   onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>


                                        <div className='mb-4'>
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <textarea className="form-control" id="desc" rows="4"
                                                      value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
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
                                                   value={subtitle}
                                                   onChange={(e) => setSubtitle(e.target.value)}
                                            />
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6'>
                                             
                                                <label htmlFor="Upload"> Upload</label>
                                                <button
                                                    onClick={(event) => {
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
                                                       id="file" name="file"/>
                                            </div>
                                            <div className='col-md-6 file-upload-preview-image d-flex flex-column'>
                                                <label htmlFor="Upload"> Preview </label>
                                                {
                                                    preview ?
                                                        <>
                                                            {/*<img className='mt-2' src={preview} alt="image"/>*/}
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

export default EditGroupModalForm;