import { Journal } from "./journalTypes";

interface Props {
  journal: Journal;
  onClick: (journal: Journal) => void;
  isLongForm?: boolean;
}
const JournalElement = ({ journal, onClick, isLongForm }: Props) => {
  const getDayWithSuffix = (day: number) => {
    if (day > 31 || day < 1) return day.toString();
    const suffixes = ["th", "st", "nd", "rd"];
    const value = day % 100;
    return (
      day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
    );
  };
  return (
    <div onClick={() => onClick(journal)} className="journal-element">
      {journal.isSpecific
        ? journal.title
        : isLongForm
        ? journal.date
        : getDayWithSuffix(parseInt(journal.date.split("-")[2], 10))}
    </div>
  );
};

export default JournalElement;
