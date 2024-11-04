import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import { TodoCategory } from "./TodoTypes";
import Category from "./Category";
import TitleBlock from "../utils/TitleBlock";

interface TodoSideBarProps {
  categories: TodoCategory[];
  onSelectedCategory: (category: TodoCategory) => void;
  onAddCategory: (categoryName: string) => void;
  onEditCategory: (category: TodoCategory) => void;
}

const TodoSideBar: React.FC<TodoSideBarProps> = ({
  categories,
  onSelectedCategory,
  onAddCategory,
  onEditCategory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line
      if (newCategory.trim() === "") return;
      onAddCategory(newCategory.trim());
      setNewCategory("");
      setIsEditing(false);
    }
  };

  return (
    <div className="sidebar">
      <TitleBlock size={3}>Todo Lists</TitleBlock>
      <div className="sidebar-content">
        {categories.map((category) => (
          <Category
            category={category}
            onSelectedCategory={onSelectedCategory}
            key={category.id}
            handleEditCategory={onEditCategory}
          />
        ))}
        {isEditing ? (
          <div className="category-create-form">
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="category"
                id="category"
                className="switch-input"
                value={newCategory}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
              />
            </Form>
          </div>
        ) : (
          <div className="create-category" onClick={() => setIsEditing(true)}>
            Add Category
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoSideBar;
