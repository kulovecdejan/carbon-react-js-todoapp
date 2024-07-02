import React from "react";
import { Modal, TextInput, Dropdown } from "carbon-components-react";

const importanceOptions = [
  { id: "low", text: "Low" },
  { id: "medium", text: "Medium" },
  { id: "high", text: "High" },
];

const AddEditTodoModal = ({
  open,
  newTodo,
  setNewTodo,
  handleSubmit,
  handleModalClose,
  editMode,
}) => (
  <Modal
    open={open}
    modalHeading={editMode ? "Edit Task" : "Add New Task"}
    primaryButtonText={editMode ? "Update Task" : "Add Task"}
    secondaryButtonText="Cancel"
    onRequestClose={handleModalClose}
    onRequestSubmit={handleSubmit}
  >
    <form onSubmit={handleSubmit}>
      <TextInput
        id="name"
        labelText="Task Name"
        value={newTodo.name}
        onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
      />
      <TextInput
        id="description"
        labelText="Description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
      />
      <Dropdown
        id="importance"
        titleText="Importance"
        label="Select importance"
        items={importanceOptions}
        itemToString={(item) => (item ? item.text : "")}
        selectedItem={importanceOptions.find((opt) => opt.id === newTodo.importance)}
        onChange={({ selectedItem }) => setNewTodo({ ...newTodo, importance: selectedItem.id })}
      />
    </form>
  </Modal>
);

export default AddEditTodoModal;
