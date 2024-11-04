import { useEffect, useState } from "react";
import { TodoCategory, TodoData, TodoItem } from "./TodoTypes";
import api from "../../types/api";
import CreateTodoModal from "./CreateTodoModal";
import TodoListDisplay from "./TodoListDisplay";
import TodoSideBar from "./TodoSideBar";
import { capitalize } from "../utils/functions";
import EditCategoryModal from "./EditCategoryModal";

const TodoHome = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [categories, setCategories] = useState<TodoCategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<TodoCategory | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<TodoCategory | null>(null);

  useEffect(() => {
    getTodos();
    getCategories();
    setCurrentCategory(categories[0]);
  }, []); // Only runs on first render

  const getTodos = async () => {
    await api.get("/todo/").then((response) => {
      setTodos(response.data);
    });
    setTodos((prevTodos) => {
      const sortedTodos = [...prevTodos].sort((a, b) => {
        if (a.is_done === b.is_done) return 0;
        return a.is_done ? 1 : -1;
      });
      return sortedTodos;
    });
  };

  const handleCreateTodo = async (todoData: TodoData) => {
    console.log("Creating todo", todoData);
    await api.post("/todo/", todoData);
    getTodos();
  };

  const getCategories = async () => {
    api.get("/todocategory/").then((response) => {
      setCategories(response.data);
    });
  };

  const categoryIdToName = (id: number): string => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : "";
  };

  const onSelectCategory = (category: TodoCategory) => {
    setCurrentCategory(category);
  };

  const createCategory = async (categoryName: string) => {
    console.log("Creating category", categoryName);
    await api.post("/todocategory/", { name: categoryName });
    getCategories();
  };

  const handleCheckboxChange = async (todo: TodoItem) => {
    await api
      .put(`/todo/${todo.id}/`, {
        ...todo,
        is_done: !todo.is_done,
      })
      .then(() => getTodos())
      .catch((error) => console.error(error));
  };

  const handleDeleteToDo = async (id: number) => {
    await api.delete(`/todo/${id}/`).then(() => getTodos());
  };

  const handleEditCategory = (todoCategory: TodoCategory) => {
    setEditCategory(todoCategory);
    setIsEditModalOpen(true);
  };

  const updateCategory = async (category: TodoCategory) => {
    await api.put(`/todocategory/${category.id}/`, category);
    getCategories();
    setIsEditModalOpen(false);
  };

  const DeleteCategory = async (id: number) => {
    await api.delete(`/todocategory/${id}/`);
    getCategories();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="todo-body">
        <TodoSideBar
          categories={categories}
          onSelectedCategory={onSelectCategory}
          onAddCategory={createCategory}
          onEditCategory={handleEditCategory}
        />
        <div className="main">
          <div className="title-block">
            <h1 className="title">
              {currentCategory &&
                capitalize(categoryIdToName(currentCategory.id))}
            </h1>
          </div>
          {currentCategory && (
            <TodoListDisplay
              key={currentCategory.id}
              category={currentCategory}
              todoItems={todos}
              handleCheck={handleCheckboxChange}
              handleDelete={handleDeleteToDo}
              handleCreate={handleCreateTodo}
            />
          )}
        </div>
      </div>

      <div>
        {currentCategory && (
          <CreateTodoModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={handleCreateTodo}
            currentCategory={currentCategory}
          />
        )}
        ;
        {editCategory && (
          <EditCategoryModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            editCategory={editCategory}
            onSave={updateCategory}
            onDelete={DeleteCategory}
          />
        )}
      </div>
    </>
  );
};
export default TodoHome;
