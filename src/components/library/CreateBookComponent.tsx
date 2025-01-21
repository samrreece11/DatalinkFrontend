import React from "react";
import CreateBookForm from "./CreateBookForm";

interface Props {
  refresh: () => void;
}
const CreateBookComponent = ({ refresh }: Props) => {
  const [isCreating, setIsCreating] = React.useState(false);

  return (
    <div>
      {isCreating ? (
        <CreateBookForm
          refresh={refresh}
          handleClose={() => setIsCreating(false)}
        />
      ) : (
        <>
          <button className="add-book-btn" onClick={() => setIsCreating(true)}>
            + Book
          </button>
        </>
      )}
    </div>
  );
};

export default CreateBookComponent;
