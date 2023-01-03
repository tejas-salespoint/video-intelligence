import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './groupsCards.scss'
import EditGroupModalForm from "./ModalForm/EditGroupModalForm";
import GroupDelete from "./ModalForm/GroupDelete";
import TruncateString from "../../components/Utilities/Truncate";
import {DeleteIcon, EditIcon, newAvatarImage, permanentDeleteIcon, restoreIcon} from "../../contants";


function GroupCards({id,userrole, title, subtitle, cardtype,  desc,  image, channels, card_desc, channels_card_desc, channels_video_id}) {
    const [editType, setEditType] = useState(false);
    const [groupDelete, setGroupDelete] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [deleteModelStatus, setDeleteModelStatus] = useState('')


    let channelRender = channels?.data?.map(item => item.id)


    const stateDataForwardChannels = {
        id: id,
        name: title,
        channels: channelRender
    }



    function statusDeleteFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus('delete-status')
        setDeleteId(id)
    }

    function restoreFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus('restore')
        setDeleteId(id)
    }

    function permanentDeleteFunction(id) {
        setGroupDelete(true)
        setDeleteModelStatus('permanent-delete')
        setDeleteId(id)
    }


    return (
        <div className="card group-channel-card " key={id}>

            <EditGroupModalForm
                cardtype={cardtype}
                show={editType}
                onHide={() => setEditType(false)}
                id={id}
                desc={desc}
                title={title}
                subtitle={subtitle}
                image={image}

            />


            <GroupDelete deletecarddesc={deleteModelStatus} id={deleteId} show={groupDelete}
                         onHide={() => setGroupDelete(false)}/>
            {/* Group Create Model */}

            <div className="card-header d-flex align-items-center justify-content-between">

                <Link to={'/channels'}
                      state={stateDataForwardChannels}
                      aria-describedby='forward on video list'>
                    <div className='d-flex align-items-center gap-3'>

                        <img className='card-avatar-icon rounded-5' src={image ? image : newAvatarImage}
                             alt='company_image'/>
                        <p className='title' title={title}> <TruncateString num={18} str={title} /> </p>
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


            <Link to={'/channels'}
                  state={stateDataForwardChannels} aria-describedby='forward on video list'>
                <div className="card-body">
                    <h5 className="card-title">{subtitle}</h5>
                    <p className="card-text">
                        {desc}
                    </p>


                </div>
            </Link>
        </div>
    );
}

export default GroupCards;