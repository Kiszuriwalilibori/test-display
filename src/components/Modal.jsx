import * as React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
//import DetailsModalBody from'./DetailsModalBody';

function SimpleModal(props) {
  const { isVisible, body, details } = props;

  return (
    <div>
      <Modal open={isVisible} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" id="my-modal">
        {body(details)}
       
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  isVisible: state.modal.isVisible,
  details: state.modal.details,
});
const MyModal = connect(mapStateToProps, null)(SimpleModal);
export default MyModal;
