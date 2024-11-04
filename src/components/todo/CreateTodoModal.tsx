import React, { useEffect, useState } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import { TodoCategory, TodoData } from "./TodoTypes";

interface CreateTodoModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (todo: TodoData) => void;
  currentCategory: TodoCategory;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({
  show,
  handleClose,
  handleSave,
  currentCategory,
}) => {
  const [todo, setTodo] = useState<TodoData>({
    content: "",
    category: currentCategory.id,
    due_date: null,
  });

  useEffect(() => {
    setTodo({
      ...todo,
      category: currentCategory.id,
    });
  }, [currentCategory]);

  const handleSubmit = () => {
    handleSave(todo);
    setTodo({
      content: "",
      category: currentCategory.id,
      due_date: null,
    });
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevData) => ({
      ...prevData,
      [name]: name === "due_date" ? new Date(value) : value,
    }));
  };

  return (
    <BootstrapModal isOpen={show} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Create Todo</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Content</Label>
            <Input
              type="text"
              placeholder="Enter todo"
              name="content"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="date"
              name="due_date"
              placeholder="Enter due date"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value); // Convert string back to Date
                setTodo((prevData) => ({
                  ...prevData,
                  due_date: selectedDate.toISOString().slice(0, 10), // Update the state with the Date object
                }));
              }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </BootstrapModal>
  );
};

export default CreateTodoModal;
