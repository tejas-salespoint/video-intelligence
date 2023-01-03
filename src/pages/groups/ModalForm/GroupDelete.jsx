import React from 'react';
import {Button, Modal} from "react-bootstrap";
import './groupdelete.scss'
import {useMutation} from "@apollo/client";
import {
    DeleteGroupStatus,
    getDeleteGroupData,
    getGroupData,
    PermanentDeleteGroup,
    RestoreDeleteStatus
} from "../../../graphql/groupQuery";

function GroupDelete(props) {

    // groups
    const [deleteStatusGroup,deleteStatusGroupData ]= useMutation(DeleteGroupStatus);
    const [restore,restoreData ]= useMutation(RestoreDeleteStatus);
    const [permanentDelete,permanentDeleteData ]= useMutation(PermanentDeleteGroup);





    function paragraphDesc(desc) {
        switch (desc){
            case desc == 'restore':
                return <p>Are you sure you want to <b>Restore this group</b> </p>
            case desc == 'permanent-delete':
                return <p>Are you sure you want to <b>Permanently Delete group</b> </p>
            default :
                <p>Are you sure you want to move to deleted group </p>
        }
    }


    

    function customMutation(desc) {
        if ( desc === 'restore') {
            restore({
                variables: {
                    "id": props?.id
                }
                ,
                refetchQueries :[ getGroupData,getDeleteGroupData]
            })
        }

        else if (desc === 'permanent-delete') {
            permanentDelete({
                variables: {
                    "id": props?.id
                }
                ,
                refetchQueries :[ getGroupData,getDeleteGroupData]
            })
        }

      else if (desc === 'delete-status') {
            deleteStatusGroup({
                variables: {
                    "id": props?.id
                }
                ,
                refetchQueries :[ getGroupData,getDeleteGroupData]
            })
        }


        props.onHide();


    }


    function paragraph(desc) {
        if ( desc === 'restore')
            return <p>Are you sure you want to Restore !</p>

        else if (desc === 'permanent-delete') return <p>Are you sure you want to Permanent Delete !</p>

        else if (desc === 'delete-status')return <p>Are you sure you want to Delete !</p>

    }

    const paragraphResult = paragraph(props?.deletecarddesc)

    return (
        <div className='group-modal'>
            <Modal
                {...props}
                className='group-container'
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className='group-delete-card d-flex flex-column gap-4'>

                    {/*<p>Are you sure you want to delete group </p>*/}
                    {paragraphResult}

                    <div className='d-flex gap-4'>
                        <Button onClick={props.onHide} className='btn-primary'>Close</Button>
                        <Button
                            onClick={() => customMutation(props?.deletecarddesc)
                        }

                            className='btn-danger'>Delete </Button>
                    </div>
                </div>


            </Modal>
        </div>
    );
}

export default GroupDelete;