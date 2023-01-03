import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {PreviewUploadImage} from "../../contants";
import {useFormik} from "formik";
import axios from "axios";
import {graphqlclient} from "../../index";
import {getGroupData} from "../../graphql/groupQuery";
import {useMutation} from "@apollo/client";
import {UPDATE_ROLES} from "../../graphql/rolesQuery";

const PermissionModel = (props) => {
    // permission labels

    const [updateRole, updateRoleData] = useMutation(UPDATE_ROLES)


    const formik = useFormik({


        initialValues: {
            name: props?.username, role: ''
        },


        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));


            updateRole({
                variables: {
                    "id": props?.user,
                    "role_id": values?.role
                },
                refetchQueries: [getGroupData]
            })

            //submit function

            // createPost();
            values.name = ''

            values.role = ''
            props.onHide()

        },
    });
    return (<div className='group-modal'>
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
                    Change the permission roles
                </p>


                <form className='groupform' onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-md-6 form-first-section-group'>
                                    <div className='mb-3'>


                                        <label htmlFor="name" className="form-label">User</label>
                                        <input disabled type="text" className="form-control" id="name"
                                               placeholder="name"
                                               onChange={formik.handleChange}
                                               value={formik.values.name}/>
                                    </div>


                                </div>
                                <div className='col-md-6'>

                                    <div className='mb-3'>
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select id='role' className="form-select"
                                                aria-label="Default select example" onChange={formik.handleChange}
                                                value={formik.values.role}>
                                            {/*<option selected>Open this select menu</option>*/}

                                            <option selected value="">Select Role ...</option>
                                            <option value="6">Administrator</option>
                                            <option value="7">Approver</option>
                                            <option value="10">Author</option>
                                            <option value="8">contributor</option>
                                            <option value="9">Subscriber</option>
                                        </select>


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
    </div>);
};

export default PermissionModel;
