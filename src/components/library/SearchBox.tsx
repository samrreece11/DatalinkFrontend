import { Form } from "reactstrap";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  onBlur: () => void;
}
const SearchBox = ({ search, setSearch, onBlur }: Props) => {
  const handleBlur = () => {
    if (!search) {
      onBlur();
    }
  };

  return (
    <>
      <Form onBlur={handleBlur}>
        <input
          className="search-box"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </Form>
    </>
  );
};

export default SearchBox;
