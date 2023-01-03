import React from 'react';
import './profiletabs.scss'


function ProfileTabs({users }) {

    return (
        <form className="profileTabs row g-3 p-5 px-0">
            <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                    User Name:
                </label>
                <input disabled   value={users.username} placeholder='Enter First Name ' type="text" className="form-control my-2" id="firstName"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                    Email :
                </label>
                <input disabled value={users.email} placeholder='Enter Email ' type="email" className="form-control my-2" id="email"/>
            </div>
            <div className="col-md-6 ">
                <label htmlFor="firstName" className="form-label">
                    First Name :
                </label>
                <input disabled value={users.first_name ? users.first_name : "null"} placeholder='Enter First Name ' type="text" className="form-control my-2 " id="firstName"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="LastName" className="form-label">
                    Last Name :
                </label>
                <input disabled value={users.last_name ? users.last_name : "null"} placeholder='Enter Last Name ' type="text" className="form-control my-2" id="lastName"/>
            </div>
            <div className="col-md-6 ">
                <label htmlFor="firstName" className="form-label">
                    Organization Name :
                </label>
                <input disabled value={users.org_name ?  users.org_name : "null"} placeholder='Enter First Name ' type="text" className="form-control my-2 " id="firstName"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="LastName" className="form-label">
                    Organization Designation :
                </label>
                <input disabled value={users.org_designation ? users.org_designation : "null"} placeholder='Enter Last Name ' type="text" className="form-control my-2" id="lastName"/>
            </div>





            <div className="col-12 py-2">
                <label htmlFor="inputAddress" className="form-label">
                    Address
                </label>

                <textarea disabled className="form-control my-2"
                          value={users.address ? users.address : "null"}
                          id="inputAddress"
                          placeholder="1234 Main St" rows="2" cols="30"></textarea>
            </div>
        </form>

    );
}

export default ProfileTabs;