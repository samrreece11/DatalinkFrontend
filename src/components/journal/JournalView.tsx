import React, { useEffect, useState } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import api from "../../types/api";
import { Journal } from "./journalTypes";
import { editorConfig } from "../utils/CKeditor";

interface ModalProps {
  journal: Journal;
  onClose: () => void;
}

const JournalModal: React.FC<ModalProps> = ({ journal, onClose }) => {
  const [content, setContent] = useState<string>(journal.content);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setContent(journal.content);
  }, [journal]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.patch(`/reflections/${journal.id}/`, {
        content: content,
      });
      console.log("Update successful:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this journal?")) {
      return;
    }
    try {
      const response = await api.delete(`/reflections/${journal.id}/`);
      console.log("Delete successful:", response.data);
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="journal-view">
      <div className="title_block">
        <h1 onClick={() => setDropdown(!dropdown)} className="title">
          {journal.title} {!journal.isSpecific && `for ${journal.date}`}{" "}
        </h1>
        {dropdown && (
          <Button
            color="danger"
            className="title-btn"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="reflection-container">
        <div className="reflection">
          <Form>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={journal.content}
              onChange={(_event, editor) => {
                const data = editor.getData();
                setContent(data);
                console.log(content);
              }}
            />
          </Form>
        </div>
      </div>
      <Button
        type="submit"
        color="success"
        size="lg"
        className="save-btn"
        onClick={(event) => handleSubmit(event)}
      >
        Save
      </Button>
    </div>
  );
};

export default JournalModal;
