import { Journal } from "./journalTypes";

interface Props {
  journal: Journal;
  onClick: (journal: Journal) => void;
}
const JournalElement = ({ journal, onClick }: Props) => {
  return (
    <div onClick={() => onClick(journal)} className="journal-element">
      {journal.date}
    </div>
  );
};

export default JournalElement;
