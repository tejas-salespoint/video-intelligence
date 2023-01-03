import React, {useState} from 'react';
import './channelsCard.scss'
import {Link} from "react-router-dom";
import TruncateString from "../../components/Utilities/Truncate";
import {DeleteIcon, EditIcon, newAvatarImage, permanentDeleteIcon, restoreIcon} from "../../contants";
import EditChannelModalForm from './ModelForm/EditChannelModalForm';
import ChannelDelete from './ModelForm/ChannelDelete';
import {useQuery} from "@apollo/client";
import {GET_ME_USER} from "../../graphql/userQuery";


function ChannelsCards({id, title, userrole,subtitle, cardtype, role, videoid,desc, image, channels, card_desc,}) {
    const [editType, setEditType] = useState(false);
    const [channelsDelete, setChannelsDelete] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [deleteModelStatus, setDeleteModelStatus] = useState('')

    const getmerole = useQuery(GET_ME_USER)
    const [roles, setRoles] = useState(getmerole?.data?.me?.role?.name);

    const videoIds = videoid?.data?.map(item => item?.id)

    const stateDataForwardVideos = {
        id: id,
        name: title,
        video_id: videoIds,

    }

    function statusDeleteFunction(id) {
        setChannelsDelete(true)
        setDeleteModelStatus('delete-status-channel')
        setDeleteId(id)
    }

    function restoreFunction(id) {
        setChannelsDelete(true)
        setDeleteModelStatus('restore-channel')
        setDeleteId(id)
    }

    function permanentDeleteFunction(id) {
        setChannelsDelete(true)
        setDeleteModelStatus('permanent-delete-channel')
        setDeleteId(id)
    }


    return (
        <div className="card group-channel-card " key={id}>


            <EditChannelModalForm
                cardtype={cardtype}
                show={editType}
                onHide={() => setEditType(false)}
                id={id}
                subtitle={subtitle}
                desc={desc}
                title={title}
                image={image}

            />


            <ChannelDelete deletecarddesc={deleteModelStatus} id={deleteId} show={channelsDelete}
                         onHide={() => setChannelsDelete(false)}/>


            {/* Group Create Model */}

            <div className="card-header d-flex align-items-center justify-content-between">

                <Link to={roles === 'Subscriber' || roles === 'Contributor' ?  '/subscriber/video/list' : '/video/list'}
                      state={stateDataForwardVideos}
                      aria-describedby='forward on video list'>
                    <div className='d-flex align-items-center gap-3'>

                        <img className='card-avatar-icon rounded-5' src={image ? image : newAvatarImage}
                             alt='company_image'/>
                        <p className='title' title={subtitle}><TruncateString num={18} str={title}/>   </p>
                    </div>
                </Link>

                {
                    !(["Subscriber", "Contributor"].includes(userrole)) &&

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
                }

            </div>


            <Link to={roles === 'Subscriber' || roles === 'Contributor' ?  '/subscriber/video/list' : '/video/list'}
                  state={stateDataForwardVideos}>
                <div className="card-body">
                    <h5 className="card-title">{subtitle}  </h5>
                    <p className="card-text">
                        {desc}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default ChannelsCards;