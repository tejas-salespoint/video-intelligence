import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import './videoModelForm.scss'

const VideoModelForm = (props) => {
  return (
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


                    <form className='groupform' >
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6 form-first-section-group'>
                                        <div className='mb-3'>


                                            <label htmlFor="name" className="form-label">Group Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="name"
                                                  
                                                   />
                                        </div>



                                        <div className='mb-4'>
                                            <label htmlFor="desc" className="form-label">Description</label>
                                            <textarea className="form-control" id="desc" rows="4"
                                                      
                                                      maxLength='200'
                                                      placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor enim etiam semper neque, quis. '
                                            ></textarea>
                                        </div>


                                    </div>
                                    <div className='col-md-6'>

                                        <div className='mb-3'>
                                            {/*<label htmlFor="role" className="form-label">Role</label>*/}
                                            {/*<select id='role' className="form-select"*/}
                                            {/*        aria-label="Default select example" onChange={formik.handleChange}*/}
                                            {/*        value={formik.values.role}>*/}
                                            {/*    /!*<option selected>Open this select menu</option>*!/*/}
                                            {/*    <option selected value="Administrator">Administrator</option>*/}
                                            {/*    <option value="Approver">Approver</option>*/}
                                            {/*    <option value="Editor">Editor</option>*/}
                                            {/*    <option value="Subscriber">Subscriber</option>*/}
                                            {/*</select>*/}

                                            <label htmlFor="name" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="name"
                                                  />
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6'>
                                               <input type="text" />
                                            </div>
                                            <div className='col-md-6 file-upload-preview-image d-flex flex-column'>
                                            <input type="text" />
                                               
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
  )
}

export default VideoModelForm