import React, {useEffect, useRef, useState} from "react";
import "./profile.scss";

import BreadCrumb from "components/breadcrumb/BreadCrumb";
import {Button, Col, Row} from "react-bootstrap";
import FillDetails from "./fillDetails/FillDetails";
import {useSelector} from "react-redux";
import {useMutation, useQuery} from "@apollo/client";
import {GET_OUR_USER, UpdateUserInfo} from "../../graphql/userQuery";
import Loader from "../../components/Loader/Loader";
import {newAvatarImage} from "../../contants";

function Profile(props) {
    const users = useSelector(state => state.auth.user)

    const fileInputRef = useRef()
    const [preview, setPreview] = useState(props.image);
    const [fileImage, setFileImage] = useState()
    const reader = new FileReader();

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

    const {loading, error, data} = useQuery(GET_OUR_USER, {
        variables: {
            "id": users?.id
        }
    })

    const [updateProfile, updateProfileData] = useMutation(UpdateUserInfo);


    function profileSet(e) {
        e.preventDefault();

        updateProfile({
            variables: {
                id: users?.id,
                image: preview
            },
            refetchQueries: [GET_OUR_USER]
        }).then(r => setPreview(''))

    }

    if (loading) return <Loader/>;
    if (error) return <p>Error :(  </p>;

    return (

        <div className="main">

            {/*  breadcrumb */}
            {/*<BreadCrumb root="Profile" path={users?.username}/>*/}
            <BreadCrumb root="Profile" />

            {/* main profile */}
            <Row className="mainContainer">
                <Col xs={4} className="editNotification ">
                    <Row>
                        <Col xs={12} className="editProfile rounded-5">
                            <p className='m-3'>Edit Profile</p>
                            <Row>
                                <Col
                                    xs={12}
                                    className="d-flex photo-upload-section  flex-column  align-items-center "
                                >
                                    <img
                                        style={{
                                            borderRadius: '100%',
                                            border: '3px solid white'
                                        }}
                                        src={data?.usersPermissionsUser?.data?.attributes?.image ? data?.usersPermissionsUser?.data?.attributes?.image : newAvatarImage}
                                        alt="avatar"
                                        className="avatar"
                                    />

                                    <form onSubmit={profileSet} style={{
                                        display : 'flex',
                                        flexDirection : 'column',
                                        alignItems : 'center'
                                    }} >
                                        <div className='photo-upload-input'>


                                            <input required type="file" ref={fileInputRef}
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
                                        <Button type='submit' className='photo-upload-input-button'>Upload</Button>
                                    </form>
                                </Col>

                                {/*      <Col*/}
                                {/*          xs={12}*/}
                                {/*          className="d-flex justify-content-center align-item-center"*/}
                                {/*      >*/}
                                {/*          <div className="forms">*/}
                                {/*              <label className="custom-radio-btn">*/}
                                {/*                  <input type="radio" name="sample"/>*/}
                                {/*                  <span className="checkmark"/>*/}
                                {/*                  <span*/}
                                {/*                      className=""*/}
                                {/*                      style={{*/}
                                {/*                          fontSize: 16, fontWeight: "normal"*/}
                                {/*                      }}*/}
                                {/*                  >*/}
                                {/*  Show my timezone*/}
                                {/*</span>*/}

                                {/*              </label>*/}
                                {/*              <br/>*/}
                                {/*              <label className="custom-radio-btn">*/}
                                {/*                  <input type="radio" name="sample"/>*/}
                                {/*                  <span className="checkmark"/>*/}
                                {/*                  <span*/}
                                {/*                      className=""*/}
                                {/*                      style={{*/}
                                {/*                          fontSize: 16,*/}
                                {/*                          fontWeight: "normal",*/}

                                {/*                      }}*/}
                                {/*                  >*/}
                                {/*  Set Email alert*/}
                                {/*</span>*/}

                                {/*              </label>*/}
                                {/*              <br/>*/}
                                {/*              <label*/}
                                {/*                  className="custom-radio-btn"*/}
                                {/*                  style={{marginBottom: "20PX"}}*/}
                                {/*              >*/}
                                {/*                  <input type="radio" name="sample"/>*/}
                                {/*                  <span className="checkmark"/>*/}
                                {/*                  <span*/}
                                {/*                      className=""*/}
                                {/*                      style={{fontSize: 16, fontWeight: "normal"}}*/}
                                {/*                  >*/}
                                {/*  Set messaging alert*/}
                                {/*</span>*/}

                                {/*              </label>*/}
                                {/*          </div>*/}
                                {/*      </Col>*/}
                            </Row>
                        </Col>
                        <Col xs={12} className="Notification rounded-5">

                            <p className='m-3'>Notification</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={8} className="fillDetails rounded-5">
                    <p className='m-3'>Fill Details</p>
                    <FillDetails users={data?.usersPermissionsUser?.data?.attributes}
                                 userid={data?.usersPermissionsUser?.data?.id}/>
                </Col>
            </Row>
        </div>


    )

}

export default Profile;
