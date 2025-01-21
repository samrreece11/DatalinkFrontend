import { useEffect, useState } from "react";
import api from "../../types/api";
import { GroupedJournals, Journal } from "./journalTypes";
import JournalGroup from "./JournalGroup";
import { Button } from "reactstrap";

import JournalView from "./JournalView";
import SearchBox from "../library/SearchBox";

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
    "Dec",
  ];

  const [isViewingJournal, setIsViewingJournal] = useState<boolean>(false);
  const [currentJournal, setCurrentJournal] = useState<Journal>({
    id: -1,
    title: "",
    isSpecific: false,
    content: "",
    date: "",
  });

  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchJournals, setSearchJournals] = useState<Journal[]>([]);

  useEffect(() => {
    if (search) {
      setSearchJournals(
        journals.filter(
          (journal) =>
            journal.title.toLowerCase().includes(search.toLowerCase()) ||
            journal.date.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (!search) {
      setSearchJournals([]);
    }
  }, [search]);

  useEffect(() => {
    refreshList();
  }, []); // Only runs on first render

  useEffect(() => {
    setGroupedJournals(groupByMonthYear(journals));
  }, [journals]); // Only runs on first render

  const refreshList = async () => {
    api.get("/reflections/").then((res) => setJournals(res.data));
  };

  const groupByMonthYear = (journals: Journal[]): GroupedJournals => {
    const grouped: GroupedJournals = {};
    let sortedJournals = journals.sort((a, b) => {
      const dateA = new Date(a.date).getTime(); // Convert to timestamp
      const dateB = new Date(b.date).getTime(); // Convert to timestamp
      return dateB - dateA; // Sort in ascending order (earliest first)
    });
    sortedJournals.sort((a, b) => {
      return Number(b.isSpecific) - Number(a.isSpecific);
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

  const openOrCreateDailyReflection = async () => {
    console.log("Opening or creating daily reflection");
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });
    const existingJournal = journals.find(
      (journal) => journal.date === today && !journal.isSpecific
    );
    if (existingJournal) {
      viewJournal(existingJournal);
    } else {
      viewJournal(await createJournal({ date: today, content: "" }));
    }
    console.log(journals);
  };

  const openSpecificReflection = async () => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });
    viewJournal(
      await createJournal({
        date: today,
        content: "",
        isSpecific: true,
        title: "Specific Reflection",
      })
    );
  };

  const createJournal = async (journalData: {
    date: string;
    content: string;
    isSpecific?: boolean;
    title?: string;
  }) => {
    try {
      const response = await api.post("/reflections/", journalData);
      console.log("Journal created:", response.data);
      await refreshList();
      return response.data;
    } catch (error) {
      console.error("Error creating Journal:", error);
      // Handle error (e.g., show notification to user)
    }
  };

  const viewJournal = (journal: Journal) => {
    setCurrentJournal(journal);
    setIsViewingJournal(true);
  };

  const handleCloseViewJournal = () => {
    refreshList();
    setIsViewingJournal(false);
  };

  return (
    <>
      {isViewingJournal ? (
        <JournalView
          journal={currentJournal}
          onClose={() => handleCloseViewJournal()}
        ></JournalView>
      ) : (
        <>
          <div className="title_block">
            <h1 className="title">Reflections</h1>
          </div>
          <div className="center">
            {isSearching ? (
              <SearchBox
                search={search}
                setSearch={setSearch}
                onBlur={() => setIsSearching(false)}
              ></SearchBox>
            ) : (
              <>
                <Button
                  color="secondary"
                  onClick={openSpecificReflection}
                  className="search-btn mx-2"
                >
                  + Specific Reflection
                </Button>
                <Button
                  color="secondary"
                  onClick={openOrCreateDailyReflection}
                  className="search-btn mx-2"
                >
                  Daily Reflection
                </Button>
                <Button
                  color="secondary"
                  onClick={setIsSearching.bind(null, true)}
                  className="search-btn mx-2"
                >
                  Search
                </Button>
              </>
            )}
          </div>
          <div className="main">
            <div className="journal-main">
              {search ? (
                <JournalGroup
                  journals={searchJournals}
                  monthYear="Search Results"
                  onClick={viewJournal}
                  isLongForm
                />
              ) : (
                Object.entries(groupedJournals).map(([monthYear, journals]) => {
                  return (
                    <JournalGroup
                      key={monthYear}
                      journals={journals}
                      monthYear={monthYear}
                      onClick={viewJournal}
                    />
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JournalHome;
