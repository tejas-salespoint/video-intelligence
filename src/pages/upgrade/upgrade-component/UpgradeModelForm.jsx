import React, {useState} from 'react';

import '../../groups/ModalForm/groupModalForm.scss'
import {Button, Modal} from "react-bootstrap";
import {getGroupData} from "../../../graphql/groupQuery";
import {useMutation} from "@apollo/client";


function EditGroupModalForm(props) {


    //form edit

    //usestate
    const [name, setName] = useState(props.name)
    const [roles, setRoles] = useState(props.title)


    const [editGroupData, {data, loading, error}] = useMutation();

    function onSubmit(e) {
        e.preventDefault();

        


        editGroupData({
            variables: {
                id: props.id,
                roles: roles
            },
            refetchQueries: {
                getGroupData
            }
        });

        {
            data &&
            props.onHide()
            setName('')
            setRoles('')
        }


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
                        Upgrade User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='group-body'>


                    <form className='groupform' onSubmit={onSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-md-6 form-first-section-group'>
                                        <div className='mb-3'>


                                            <label htmlFor="name" className="form-label">Group Name</label>
                                            <input required type="text" className="form-control" id="name"
                                                   placeholder="name"
                                                   value={name}
                                                   onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
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