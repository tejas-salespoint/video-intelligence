import React, {useState} from 'react';
import './filldetails.scss'
import {useDispatch} from "react-redux";
import {GET_OUR_USER, UpdateUserInfo} from "../../../graphql/userQuery";
import {useMutation} from "@apollo/client";
import {Button} from "reactstrap";

function FillDetails({users, userid}) {
    // const dispatch = useDispatch(UpdateUserInfo)
    const [updateUserInfo, {data, loading, error}] = useMutation(UpdateUserInfo)

    const [username, setUsername] = useState(users.username)
    const [firstName, setFirstName] = useState(users?.first_name)
    const [org, setOrg] = useState(users?.org_name)
    const [orgDesignation, setOrgDesignation] = useState(users?.org_designation)
    const [lastName, setLastName] = useState(users?.last_name)
    const [email, setEmail] = useState(users?.email)

    const [Address, setAddress] = useState(users?.address)

    const [onSaveBtn, setOnSaveBtn] = useState(false)
    const [onSuccess, setOnSuccess] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();
        
        updateUserInfo({
            variables: {
                "id": userid,
                "first_name": firstName,
                "last_name": lastName,
                "org_name": org,
                "org_designation": orgDesignation,
                "address": Address
            },
            refetchQueries: [{query: GET_OUR_USER}],
        })
    }

    return (
<>

        <form onSubmit={handleSubmit} className="filldetails row g-3 p-5">
            {
                data &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Profile Updated Successfully
                </div>
            }
            {
                error &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {JSON.stringify(error)}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
            <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                    User Name:
                </label>
                <input placeholder='Username'

                       disabled value={username} type="text" className="form-control my-2" id="firstName"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                    Email :
                </label>
                <input disabled placeholder='Enter Email ' value={email} type="email" className="form-control my-2"
                       id="email"/>
            </div>
            <div className="col-md-6 ">
                <label htmlFor="first_name" className="form-label">
                    First Name :
                </label>
                <input placeholder='Enter First Name '
                       value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       type="text" className="form-control my-2 " id="first_name"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="LastName" className="form-label">
                    Last Name :
                </label>
                <input placeholder='Enter Last Name'
                       value={lastName} onChange={(e) => setLastName(e.target.value)}
                       type="text" className="form-control my-2" id="lastName"/>
            </div>
            <div className="col-md-6 ">
                <label htmlFor="org_name" className="form-label">
                    Organization Name :
                </label>
                <input placeholder='Enter org name... '
                       value={org} onChange={(e) => setOrg(e.target.value)}
                       type="text" className="form-control my-2 " id="org_name"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="org_designation" className="form-label">
                    Organization Designation :
                </label>
                <input placeholder='Enter org Designation...'
                       value={orgDesignation} onChange={(e) => setOrgDesignation(e.target.value)}
                       type="text" className="form-control my-2" id="setOrgDesignation"/>
            </div>


            <div className="col-12 py-2">
                <label htmlFor="inputAddress" className="form-label">
                    Address
                </label>

                <textarea className="form-control my-2"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                          id="inputAddress"
                          placeholder="1234 Main St" rows="2" cols="30"></textarea>
            </div>



            <div className=" mt-5">
                <button type="submit" className="btn btn-save  p-2 col-md-12 ">
                    Save
                </button>
            </div>

        </form>


</>
    );
}

export default FillDetails;