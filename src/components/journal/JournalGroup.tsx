import BoxComponent from "../structure/BoxComponent";
import JournalElement from "./JournalElement";
import { Journal } from "./journalTypes";
// Takes title, list of books to display

interface Props {
  journals: Journal[];
  monthYear: string;
  onClick: (journal: Journal) => void;
  isLongForm?: boolean;
}
const JournalGroup = ({ journals, monthYear, onClick, isLongForm }: Props) => {
  return (
    <>
      <BoxComponent title={monthYear} className="w-400 m-1 grey-box flex-grow1">
        <div className="journal-container">
          {journals.map((journal, index) => (
            <JournalElement
              onClick={onClick}
              key={index}
              journal={journal}
              isLongForm={isLongForm}
            />
          ))}
        </div>
      </BoxComponent>
    </>
  );
};

export default JournalGroup;
