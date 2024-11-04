import JournalElement from "./JournalElement";
import { Journal } from "./journalTypes";
// Takes title, list of books to display

interface Props {
  journals: Journal[];
  monthYear: string;
  onClick: (journal: Journal) => void;
}
const JournalGroup = ({ journals, monthYear, onClick }: Props) => {
  return (
    <>
      <div key={monthYear} id={monthYear} className="journal-month-box">
        <div className="title_block">
          <h3 className="title">
            {monthYear} - {journals.length} Entries
          </h3>
        </div>
        <div className="journal-container">
          {journals.map((journal, index) => (
            <JournalElement onClick={onClick} key={index} journal={journal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default JournalGroup;
