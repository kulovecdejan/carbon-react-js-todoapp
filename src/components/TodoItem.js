import React from "react";
import { Button } from "carbon-components-react";
import {
  TrashCan,
  IbmEloMethodComposer,
  CheckmarkOutline,
  CloseFilled,
} from "@carbon/icons-react";

const TodoItem = ({
  id,
  text,
  description,
  importance,
  completed,
  onToggleCompleted,
  onDelete,
  onEdit,
}) => {
  const handleToggleCompleted = () => onToggleCompleted(id);
  const handleDelete = () => onDelete(id);
  const handleEdit = () => onEdit(id);

  let importanceClass;
  switch (importance) {
    case "high":
      importanceClass = "high-importance";
      break;
    case "medium":
      importanceClass = "medium-importance";
      break;
    case "low":
      importanceClass = "low-importance";
      break;
    default:
      importanceClass = "";
  }

  const listItemClasses = ["todo-item", importanceClass, completed ? "completed" : ""].join(" ");

  return (
    <li className={listItemClasses} style={{ display: "flex", alignItems: "center" }}>
      <Button
        id={`todo-${text}`}
        kind="ghost"
        hasIconOnly
        renderIcon={completed ? CloseFilled : CheckmarkOutline}
        iconDescription={completed ? "Mark as Uncompleted" : "Mark as Completed"}
        onClick={handleToggleCompleted}
        size="small"
      />
      <Button
        kind="ghost"
        hasIconOnly
        renderIcon={IbmEloMethodComposer}
        iconDescription="Edit"
        onClick={handleEdit}
        size="small"
      />
      <Button
        kind="ghost"
        hasIconOnly
        renderIcon={TrashCan}
        iconDescription="Delete"
        onClick={handleDelete}
        size="small"
      />
      <div className="task-info">
        <span className="task-title">{text}</span>
        <span className="task-description">{description}</span>
      </div>
    </li>
  );
};

export default TodoItem;
