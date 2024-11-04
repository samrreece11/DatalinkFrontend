import { useEffect, useState } from "react";
import api from "../../types/api";
import { GroupedJournals, Journal } from "./journalTypes";
import JournalGroup from "./JournalGroup";
import JournalModal from "./JournalModal";
import { Button } from "reactstrap";

const JournalHome = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [groupedJournals, setGroupedJournals] = useState<GroupedJournals>({});
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev",
  ];

  const [isJournalModalOpen, setIsJournalModalOpen] = useState<boolean>(false);
  const [currentJournal, setCurrentJournal] = useState<Journal>({
    id: -1,
    content: "",
    date: "",
  });

  useEffect(() => {
    refreshList();
  }, []); // Only runs on first render

  useEffect(() => {
    setGroupedJournals(groupByMonthYear(journals));
  }, [journals]); // Only runs on first render

  const refreshList = async () => {
    api.get("/journals/").then((res) => setJournals(res.data));
  };

  const groupByMonthYear = (journals: Journal[]): GroupedJournals => {
    const grouped: GroupedJournals = {};
    const sortedJournals = journals.sort((a, b) => {
      const dateA = new Date(a.date).getTime(); // Convert to timestamp
      const dateB = new Date(b.date).getTime(); // Convert to timestamp
      return dateB - dateA; // Sort in ascending order (earliest first)
    });

    sortedJournals.forEach((journal) => {
      const date = new Date(journal.date);
      const year = date.getUTCFullYear(); // Ensure we get the full year
      const month = date.getUTCMonth(); // Ensure month is between 0-11
      const monthYear = `${months[month]} ${year}`; // Format month and year properly
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(journal);
    });
    return grouped;
  };

  const handleOpenJournalModal = (journal: Journal) => {
    setCurrentJournal(journal);
    setIsJournalModalOpen(true);
  };

  const openOrCreateJournal = async () => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });
    const existingJournal = journals.find((journal) => journal.date === today);
    if (existingJournal) {
      handleOpenJournalModal(existingJournal);
    } else {
      handleOpenJournalModal(await createJournal({ date: today, content: "" }));
    }
    console.log(journals);
  };

  const createJournal = async (journalData: {
    date: string;
    content: string;
  }) => {
    try {
      const response = await api.post("/journals/", journalData);
      console.log("Journal created:", response.data);
      await refreshList();
      return response.data;
    } catch (error) {
      console.error("Error creating Journal:", error);
      // Handle error (e.g., show notification to user)
    }
  };

  return (
    <>
      <div className="title_block">
        <h1 className="title">
          Journal
          <Button
            className="journal-btn"
            color="secondary"
            onClick={openOrCreateJournal}
          >
            Today's Journal
          </Button>
        </h1>
      </div>

      <div className="journal-main">
        {Object.entries(groupedJournals).map(([monthYear, journals]) => (
          <JournalGroup
            key={monthYear}
            journals={journals}
            monthYear={monthYear}
            onClick={handleOpenJournalModal}
          />
        ))}
      </div>
      <div className="modal-cont">
        <JournalModal
          refresh={refreshList}
          journal={currentJournal}
          isOpen={isJournalModalOpen}
          onClose={() => setIsJournalModalOpen(false)}
        />
      </div>
    </>
  );
};

export default JournalHome;
