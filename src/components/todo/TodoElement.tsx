import { useState } from "react";
import { TodoItem } from "./TodoTypes";

interface Props {
  todoItem: TodoItem;
  handleCheck: (todoItem: TodoItem) => void;
  handleDelete: (id: number) => void;
}
const TodoElement = ({ todoItem, handleCheck, handleDelete }: Props) => {
  const [isChecked, setIsChecked] = useState(todoItem.is_done);

  const handleCheckboxChange = () => {
    setTimeout(() => {
      if (!isChecked !== todoItem.is_done) {
        handleCheck(todoItem);
      }
    }, 1000);
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="todo-item" key={todoItem.id}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="todo-checkbox"
        />
        <span
          style={{ textDecoration: todoItem.is_done ? "line-through" : "none" }}
          className="todo-content"
        >
          {todoItem.content}
        </span>
        <button
          onClick={() => handleDelete(todoItem.id)}
          style={{ alignItems: "start", color: "red", cursor: "pointer" }}
          className="todo-delete"
        >
          X
        </button>
      </div>
    </>
  );
};

export default TodoElement;
