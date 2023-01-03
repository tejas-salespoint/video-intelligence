import { useMutation } from "@apollo/client";
import {
  DeleteChannelsStatus,
  DELETE_STATUS_CHANNELS,
  GET_CHANNELS,
  PermanentDeleteChannels,
  RestoreChanenlsStatus,
} from "graphql/channelsQuery";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./channeldelete.scss";

function ChannelDelete(props) {
  // groups
  //    const [deleteStatusGroup,deleteStatusGroupData ]= useMutation(DeleteGroupStatus);
  //    const [restore,restoreData ]= useMutation(RestoreDeleteStatus);
  //    const [permanentDelete,permanentDeleteData ]= useMutation(PermanentDeleteGroup);

  // channels
  const [deleteStatuschannels, deleteStatuschannelsData] =
    useMutation(DeleteChannelsStatus);
  const [restoreChannels, restoreChannelsData] = useMutation(
    RestoreChanenlsStatus
  );
  const [permanentChannelsDelete, permanentChannelsDeleteData] = useMutation(
    PermanentDeleteChannels
  );


  // const para =  paragraphDesc(props?.deletecarddesc)

  function customMutation(desc) {
    if (desc === "restore-channel") {
      console.log("restore channel");
      restoreChannels({
        variables: {
          id: props?.id,
        },
        refetchQueries: [GET_CHANNELS, DELETE_STATUS_CHANNELS],
      });
    } else if (desc === "permanent-delete-channel") {
      console.log("permanent delete chanenl");
      permanentChannelsDelete({
        variables: {
          id: props?.id,
        },
        refetchQueries: [GET_CHANNELS, DELETE_STATUS_CHANNELS],
      });
    } else if (desc === "delete-status-channel") {
      console.log("delete status channel");
      deleteStatuschannels({
        variables: {
          id: props?.id,
        },
        refetchQueries: [GET_CHANNELS, DELETE_STATUS_CHANNELS],
      });
    }

    props.onHide();
  }

  function paragraph(desc) {
    if ( desc === 'restore-channel')
      return <p>Are you sure you want to Restore !</p>

    else if (desc === 'permanent-delete-channel') return <p>Are you sure you want to Permanent Delete !</p>

    else if (desc === 'delete-status-channel')return <p>Are you sure you want to Delete !</p>

  }

  const paragraphResult = paragraph(props?.deletecarddesc)



  return (
    <div className="channel-modal">
      <Modal
        {...props}
        className="channel-container"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="channel-delete-card d-flex flex-column gap-4">
          <p>{paragraphResult}</p>

          <div className="d-flex gap-4">
            <Button onClick={props.onHide} className="btn-primary">
              Close
            </Button>
            <Button
              onClick={() => customMutation(props?.deletecarddesc)}
              className="btn-danger"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChannelDelete;
