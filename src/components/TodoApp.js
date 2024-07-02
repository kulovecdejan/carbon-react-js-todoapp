import React, { useState, useEffect } from "react";
import { Button } from "carbon-components-react";
import TodoItem from "./TodoItem";
import AddEditTodoModal from "./AddEditTodoModal";
import FilterButtons from "./FilterButtons";
import DeleteModal from "./DeleteModal";
import logo from "../assets/flowzone-logo.svg";
import "../styles/custom.scss";
import { AddFilled } from "@carbon/icons-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOCAL_STORAGE_KEY = "todos";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    return storedTodos.map((todo, index) => ({ ...todo, id: index + 1 }));
  });
  const [newTodo, setNewTodo] = useState({ name: "", description: "", importance: "low" });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("descending");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const getNextId = () => todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0) + 1;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.name.trim() !== "" && newTodo.description.trim() !== "") {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editIndex
            ? { ...todo, text: newTodo.name, description: newTodo.description, importance: newTodo.importance }
            : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        toast.info('Task updated successfully');
      } else {
        setTodos([...todos, { id: getNextId(), text: newTodo.name, description: newTodo.description, importance: newTodo.importance, completed: false }]);
        toast.success('New task added successfully');
      }
      setNewTodo({ name: "", description: "", importance: "low" });
      setOpen(false);
    }
  };

  const handleToggleCompleted = (id) => setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

  const handleDelete = (id) => {
    const task = todos.find((todo) => todo.id === id);
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== taskToDelete.id));
    setDeleteModalOpen(false);
    setTaskToDelete(null);
    toast.error('Task deleted');
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTodo({
      name: todoToEdit.text,
      description: todoToEdit.description,
      importance: todoToEdit.importance,
    });
    setEditIndex(id);
    setOpen(true);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "incompleted" && !todo.completed);
    const matchesSearch =
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  const sortedTodos = filteredTodos.sort((a, b) => {
    const importanceOrder = { high: 1, medium: 2, low: 3 };
    const importanceComparison = importanceOrder[b.importance] - importanceOrder[a.importance];

    if (importanceComparison === 0) {
      return sortOrder === "ascending" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
    } else {
      return sortOrder === "ascending" ? importanceComparison : -importanceComparison;
    }
  });
  

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleModalClose = () => {
    setOpen(false);
    setEditIndex(null);
    setNewTodo({ name: "", description: "", importance: "low" });
  };

  return (
    <div className="todo-list-wrapper">
      <div className="todo-list-header">
        <img src={logo} className="logo-img" alt="Flowzone logo" />
        <Button className="add-task-btn" onClick={() => setOpen(true)} renderIcon={AddFilled}>
          Add New Task
        </Button>
      </div>
      <div className="break-line"></div>
      <div className="filter-wrapper">
          <FilterButtons
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange}
          />
      </div>
      <ul className="todo-list-body">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggleCompleted={handleToggleCompleted}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      <AddEditTodoModal
        open={open}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSubmit={handleSubmit}
        handleModalClose={handleModalClose}
        editMode={editIndex !== null}
      />
      <DeleteModal
        open={deleteModalOpen}
        taskToDelete={taskToDelete}
        onConfirmDelete={confirmDelete}
        onCancelDelete={cancelDelete}
      />
      <ToastContainer />
    </div>
  );
}

export default TodoApp;
