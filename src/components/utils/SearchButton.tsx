import { useState } from "react";
import { Button } from "reactstrap";
import SearchBox from "./SearchBox";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  title: string;
}
const SearchButton = ({ search, setSearch, title }: Props) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleBlur = () => {
    if (!search) {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-bar mb-3">
      {isSearching ? (
        <SearchBox
          search={search}
          setSearch={setSearch}
          onBlur={() => handleBlur()}
        />
      ) : (
        <Button
          color="secondary"
          onClick={setIsSearching.bind(null, true)}
          className="search-btn mx-2"
        >
          {title}
        </Button>
      )}
    </div>
  );
};

export default SearchButton;
