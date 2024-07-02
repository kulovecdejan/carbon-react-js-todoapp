import React from "react";
import { Modal } from "carbon-components-react";

const DeleteModal = ({ open, taskToDelete, onConfirmDelete, onCancelDelete }) => (
  <Modal
    open={open}
    danger
    modalHeading="Confirm Delete"
    primaryButtonText="Delete"
    secondaryButtonText="Cancel"
    onRequestClose={onCancelDelete}
    onRequestSubmit={onConfirmDelete}
  >
    <p>Are you sure you want to delete the task "{taskToDelete?.text}"?</p>
  </Modal>
);

export default DeleteModal;
