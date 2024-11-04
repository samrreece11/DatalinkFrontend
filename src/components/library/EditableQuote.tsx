import { useEffect, useState, useRef } from "react";
import { Book, Quote } from "./libraryTypes";
import { Form, Button } from "reactstrap";

interface Props {
  quote: Quote;
  book: Book;
  handleSubmit: (quote: Quote) => void;
  handleDeleteQuote: (quote: Quote) => void;
}

const EditableQuote: React.FC<Props> = ({
  quote,
  handleSubmit,
  handleDeleteQuote,
}) => {
  const [formData, setFormData] = useState<Quote>(quote);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false); // Track button click
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for textarea

  useEffect(() => {
    setFormData(quote);
  }, [quote]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditing(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Set cursor position logic (if needed)

      // Does not work --------------------------
      // Calculate cursor position based on the mouse position
      const offsetY =
        e.clientY - textareaRef.current.getBoundingClientRect().top;
      const lineHeight = parseInt(
        window.getComputedStyle(textareaRef.current).lineHeight,
        10
      );

      const clickedLine = Math.floor(offsetY / lineHeight);
      const lines = formData.contents.split("\n");

      let charIndex = 0;
      for (let i = 0; i < clickedLine && i < lines.length; i++) {
        charIndex += lines[i].length + 1; // +1 for newline character
      }

      // Set the cursor position in the textarea
      textareaRef.current.setSelectionRange(charIndex, charIndex);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = () => {
    if (!isButtonClicked) {
      // Only blur if button wasn't clicked
      setFormData(quote);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line
      handleSubmit(formData);
      setIsEditing(false);
    }
  };

  const handleButtonMouseDown = () => {
    setIsButtonClicked(true); // Set the button clicked state
  };

  const handleButtonMouseUp = () => {
    setIsButtonClicked(false); // Reset the button clicked state
  };

  return (
    <div style={{ width: "100%" }}>
      {isEditing ? (
        <>
          <div onBlur={handleBlur}>
            <Form>
              <textarea
                ref={textareaRef}
                name="contents"
                className="edit-quote-form"
                value={formData.contents}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <Button
                size="sm"
                color="danger"
                onMouseDown={handleButtonMouseDown} // Track mouse down
                onMouseUp={handleButtonMouseUp} // Reset on mouse up
                onClick={() => handleDeleteQuote(quote)}
              >
                Delete Quote
              </Button>
            </Form>
            <p>
              - Page {quote.pageNum}
              {"  "}
            </p>
          </div>
        </>
      ) : (
        <div onDoubleClick={handleDoubleClick}>
          "{quote.contents}" - Page {quote.pageNum}
        </div>
      )}
    </div>
  );
};

export default EditableQuote;
