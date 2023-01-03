import React, {useState, useEffect} from 'react';
import './card.scss'
import {AvatarHeaderIcon, EditIcon, newAvatarImage} from "../../../contants";
import PermissionModel from "../../../components/models/permissionModel";
import ReactTimeAgo from "react-time-ago";


function Card({
                  image,
                  id,
                  first_name,
                  last_name,
                  username,
                  org_name,
                  org_designation,
                  createdAt,
                  roles,
                  name,
                  role,
                  desc,
                  time
              }) {
    const [model, setModel] = useState(false);

    
    


    return (
        <div className="card update-card ">

            {/*  permission models   */}
            <PermissionModel show={model}
                             user={id}
                             username={username}
                             onHide={() => setModel(false)}/>
            {/*  permission models end  */}

            <div className="card-header d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center gap-3'>

                    <img style={{
                        borderRadius : '100%'
                    }} className='card-avatar-icon' src={image ? image : newAvatarImage} alt='img'/>
                    {/*{username ? <p className='title'>{*/}
                    {/*    username */}
                    {/*}</p>}*/}

                    {/*{!first_name && <p className='title'>{*/}
                    {/*    username*/}
                    {/*}</p>}*/}

                    <p className='title'> { username ? username : 'Unknown' } </p>


                </div>
                <div className='d-flex align-items-center gap-2'>
                    <div className='edit' style={{
                        cursor : "pointer"
                    }}>
                        <img onClick={() => setModel(true)} className='card-side-icon' src={EditIcon} alt="editicon"/>
                    </div>
                    {/*<div className='delete'>*/}
                    {/*    <img className='card-side-icon' src={DeleteIcon} alt="deleteicon"/>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{role}</h5>
                {/*<p className="card-text">*/}
                {/*    <span>User Discription </span>*/}
                {/*    - {desc}*/}
                {/*</p>*/}

                <div className='footer'>
                    Join Since :  <ReactTimeAgo date={createdAt} locale="en-US" />

                </div>

            </div>
        </div>
    );
}

export default Card;