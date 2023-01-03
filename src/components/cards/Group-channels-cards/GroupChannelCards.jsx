import React, {useState} from 'react';
import './groupchannelcards.scss'
import {DeleteIcon, EditIcon, newAvatarImage, permanentDeleteIcon, restoreIcon} from "../../../contants";
import GroupDelete from "../../../pages/groups/ModalForm/GroupDelete";
import EditGroupModalForm from "../../../pages/groups/ModalForm/EditGroupModalForm";
import {Link} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GROUP_FILTER} from "../../../graphql/filters/filterQuery";
import channels from "../../../pages/channels/Channels";
import {DeleteGroupStatus} from "../../../graphql/groupQuery";
import Truncate from "../../Utilities/Truncate";
import TruncateString from "../../Utilities/Truncate";

function GroupChannelCards({id, title, name, cardtype, role, desc, time, image, channels, card_desc, channels_card_desc, channels_video_id}) {
    const [editType, setEditType] = useState(false);
    const [groupDelete, setGroupDelete] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [deleteModelStatus, setDeleteModelStatus] = useState('')
    let channelRender = channels?.data?.map(item => item.id)


    const stateDataForwardChannels = {
        id: id,
        name: name,
        channels: channelRender
    }

    const stateDataForwardVideos = {
        id: id,
        name: name,
        video_id: [1, 2],

    }

    function statusDeleteFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus(channels_card_desc === 'channel_card' ? 'delete-status-channel' : 'delete-status')
        setDeleteId(id)
    }

    function restoreFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus(channels_card_desc === 'channel_card' ? 'restore-channel' : 'restore')
        setDeleteId(id)
    }

    function permanentDeleteFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus(channels_card_desc === 'channel_card' ? 'permanent-delete-channel' : 'permanent-delete')
        setDeleteId(id)
    }


    return (
        <div className="card group-channel-card " key={id}>

            <EditGroupModalForm
                cardtype={cardtype}
                show={editType}
                onHide={() => setEditType(false)}
                id={id}
                name={name}
                desc={desc}
                title={title}
                image={image}

            />


            <GroupDelete deletecarddesc={deleteModelStatus} id={deleteId} show={groupDelete}
                         onHide={() => setGroupDelete(false)}/>
            {/* Group Create Model */}

            <div className="card-header d-flex align-items-center justify-content-between">

                <Link to={window.location.pathname === '/channels' ? '/video/list' : '/channels'}
                      state={window.location.pathname === '/channels' ? stateDataForwardVideos : stateDataForwardChannels}
                      aria-describedby='forward on video list'>
                    <div className='d-flex align-items-center gap-3'>

                        <img className='card-avatar-icon rounded-5' src={image ? image : newAvatarImage}
                             alt='company_image'/>
                        <p className='title' title={name}> <TruncateString num={18} str={name} /> </p>
                    </div>
                </Link>


                <div className='d-flex align-items-center gap-2'>

                    {
                        card_desc === 'deleteGroups' ?
                            <>
                                <div onClick={() => restoreFunction(id)}
                                     className='delete' title='restore'>
                                    <img className='card-side-icon' src={restoreIcon} alt="restoredeleteicon"/>
                                </div>

                                <div onClick={() => permanentDeleteFunction(id)} className='delete'
                                     title='permanent delete'>
                                    <img className='card-side-icon' src={permanentDeleteIcon}
                                         alt="permanentdeleteicon"/>
                                </div>
                            </> :

                            <>
                                <div title='Edit' onClick={() => setEditType(true)} className='edit'>
                                    <img className='card-side-icon' src={EditIcon} alt="editicon"/>
                                </div>


                                <div onClick={() => statusDeleteFunction(id)} className='delete'>
                                    <img className='card-side-icon' src={DeleteIcon} alt="deleteicon"/>
                                </div>
                            </>
                    }


                </div>


            </div>


            <Link to={window.location.pathname === '/channels' ? '/video/list' : '/channels'}
                  state={window.location.pathname === '/channels' ? stateDataForwardVideos : stateDataForwardChannels} aria-describedby='forward on video list'>
                <div className="card-body">
                    <h5 className="card-title">{role}</h5>
                    <p className="card-text">
                        {desc}
                    </p>

                    {/*<div className='footer'>*/}
                    {/*    <button className='d-flex gap-3'>*/}
                    {/*        <img className='plus-button' src={PlusIcon} alt="plusicon" />*/}
                    {/*        Add Discription*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                </div>
            </Link>
        </div>
    );
}

export default GroupChannelCards;