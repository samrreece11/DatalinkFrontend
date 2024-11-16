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
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}

const JournalModal: React.FC<ModalProps> = ({
  journal,
  isOpen,
  onClose,
  refresh,
}) => {
  const [content, setContent] = useState<string>(journal.content);
  useEffect(() => {
    setContent(journal.content);
  }, [journal]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.patch(`/journals/${journal.id}/`, {
        content: content,
      });
      console.log("Update successful:", response.data);
      refresh();
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  if (!isOpen) return null;
  return (
    <BootstrapModal
      className="reflect-modal"
      scrollable={true}
      fullscreen={true}
      isOpen={isOpen}
      toggle={onClose}
    >
      <ModalHeader toggle={onClose}>
        <h1>Journal for {journal.date}</h1>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
    </BootstrapModal>
  );
};

export default JournalModal;
