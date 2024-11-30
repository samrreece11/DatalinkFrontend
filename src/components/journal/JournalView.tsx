import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

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
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setContent(journal.content);
    if (journal.title == "Specific Reflection") {
      setTitle("");
    } else {
      setTitle(journal.title);
    }
  }, [journal]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title === "") {
      setTitle(journal.title);
    }
    try {
      const response = await api.patch(`/reflections/${journal.id}/`, {
        content: content,
        title: title,
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
            {journal.isSpecific && (
              <FormGroup>
                <label>Title</label>
                <Input
                  type="text"
                  required
                  className="journal-title-form"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </FormGroup>
            )}
            <FormGroup>
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
            </FormGroup>
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
