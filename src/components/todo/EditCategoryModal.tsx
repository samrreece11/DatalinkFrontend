import React, { useState, useEffect } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { TodoCategory } from "./TodoTypes";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editCategory: TodoCategory;
  onSave: (todoItem: TodoCategory) => void;
  onDelete: (id: number) => void;
}

const EditCategoryModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  editCategory,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<TodoCategory>(editCategory);

  // Update formData when the modal opens or editCategory changes
  useEffect(() => {
    setFormData(editCategory);
  }, [isOpen, editCategory]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Form");
    onSave(formData);
    onClose();
  };

  // Handle deletion
  const handleDelete = () => {
    onDelete(formData.id);
    onClose();
  };

  // If the modal isn't open, return null
  if (!isOpen) return null;

  return (
    <BootstrapModal scrollable={true} isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Edit Category</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Category Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter name"
              onChange={handleChange}
            />
          </FormGroup>
          <ModalFooter>
            <Button color="success" type="submit">
              Save
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete Category
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </BootstrapModal>
  );
};

export default EditCategoryModal;
