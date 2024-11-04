import { capitalize } from "../utils/functions";
import { TodoCategory } from "./TodoTypes";

interface Props {
  category: TodoCategory;
  onSelectedCategory: (category: TodoCategory) => void;
  handleEditCategory: (category: TodoCategory) => void;
}
const Category = ({
  category,
  onSelectedCategory,
  handleEditCategory,
}: Props) => {
  return (
    <>
      <div
        onDoubleClick={() => handleEditCategory(category)}
        onClick={() => onSelectedCategory(category)}
        className="list-item p-2 m-2"
      >
        {capitalize(category.name)}
      </div>
    </>
  );
};

export default Category;
