import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import TodoElement from "./TodoElement";
import { TodoCategory, TodoData, TodoItem } from "./TodoTypes";
import { useEffect, useRef, useState } from "react";
import { Form } from "reactstrap";

interface Props {
  // Define the props for the component here
  todoItems: TodoItem[];
  category: TodoCategory;
  handleCheck: (todoItem: TodoItem) => void;
  handleDelete: (id: number) => void;
  handleCreate: (todoData: TodoData) => void;
}
const TodoListDisplay = ({
  todoItems,
  category,
  handleCheck,
  handleDelete,
  handleCreate,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoItem, setNewTodoItem] = useState<TodoData>({
    content: "",
    category: category.id,
    due_date: null,
  });
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  const handleSubmit = () => {
    if (newTodoItem.content.trim()) {
      handleCreate(newTodoItem);
      setNewTodoItem({
        content: "",
        category: category.id,
        due_date: null,
      });
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodoItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line
      if (newTodoItem.content === "") return;
      handleSubmit();
    }
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-items">
          {todoItems
            .filter(
              (todoItem) =>
                todoItem.category === category.id && !todoItem.is_done
            )
            .map((todoItem) => (
              <TodoElement
                key={todoItem.id}
                todoItem={todoItem}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />
            ))}
          {isEditing ? (
            <div className="todo-create-form pd-5 font-lg" ref={formRef}>
              <Form className="flex" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="content"
                  id="content"
                  className="switch-input-todo flex-grow1"
                  value={newTodoItem.content}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <label htmlFor="due_date" className="switch-input-todo pr-5">
                  Due Date:{"  "}
                </label>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  className="switch-input-todo"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value); // Convert string back to Date
                    setNewTodoItem((prevData) => ({
                      ...prevData,
                      due_date: selectedDate.toISOString().slice(0, 10), // Update the state with the Date object
                    }));
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Form>
            </div>
          ) : (
            <div
              className="create-todo font-lg pd-5 color-blue hover-pointer"
              onClick={() => setIsEditing(true)}
            >
              Add Todo
            </div>
          )}
          {todoItems.filter(
            (todoItem) => todoItem.category === category.id && todoItem.is_done
          ).length > 0 && (
            <Menu>
              <MenuButton className="completed-tasks-dropdown">
                <h5>Completed </h5>
              </MenuButton>
              <MenuItems>
                {todoItems
                  .filter(
                    (todoItem) =>
                      todoItem.category === category.id && todoItem.is_done
                  )
                  .map((todoItem) => (
                    <TodoElement
                      key={todoItem.id}
                      todoItem={todoItem}
                      handleCheck={handleCheck}
                      handleDelete={handleDelete}
                    />
                  ))}
              </MenuItems>
            </Menu>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoListDisplay;
