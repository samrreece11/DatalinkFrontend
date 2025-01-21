import { useEffect, useState } from "react";
import { BibleVerse } from "../faith/FaithTypes";
import api from "../../types/api";
import HomePageComponent from "../structure/BoxComponent";

const DailyVerseDisplay = () => {
  const [currentDailyVerse, setCurrentDailyVerse] = useState<BibleVerse>(
    {} as BibleVerse
  );

  useEffect(() => {
    getDailyVerse();
  }, []); // runs only once on component mount

  const getOrCreateDailyVerse = async () => {
    try {
      const res = await api.get("/faith/dailyVerses/get-or-create/");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getDailyVerse = async () => {
    setCurrentDailyVerse(await getOrCreateDailyVerse());
  };

  return (
    <HomePageComponent
      title="Daily Verse"
      className="grey-box m-2 w-300 flex-grow"
    >
      {currentDailyVerse.content ? (
        <div>
          <b>
            {currentDailyVerse.book.title} {currentDailyVerse.chapter}:
            {currentDailyVerse.endVerse}
          </b>
          <p>{currentDailyVerse.content}</p>
        </div>
      ) : (
        <p>No Daily Verses Found... Try adding some in Faith Section!</p>
      )}
    </HomePageComponent>
  );
};

export default DailyVerseDisplay;
