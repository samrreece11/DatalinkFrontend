import api from "../../types/api";
import { BibleBook } from "./FaithTypes";

export const getAllVerses = async () => {

    try {
      const res = await api.get("/faith/verses/");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const getBookById = async (id: number): Promise<BibleBook> => {
  return api
    .get(`/faith/books/${id}/`)
    .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      }
    );
  };

export const idToVerse = async (id: number) => {
    return await getVerseById(id);
  };

export const getVerseById = async (id: number) => {
    try {
      const res = await api.get(`/faith/verses/${id}/`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };