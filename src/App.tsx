import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./components/library/Library";
import "./App.css"; // Import your CSS file
import JournalHome from "./components/journal/JournalHome";
import HomePage from "./components/home/HomePage";
import TodoHome from "./components/todo/TodoHome";
import LoginPage from "./components/user/LoginPage";
import { setAuthToken } from "./types/api";
import { useEffect } from "react";
import NavBar from "./components/home/NavBar";
import UserSettings from "./components/user/UserSettings";
import FaithHome from "./components/faith/FaithHome";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken();
    }
  }, []);

  return (
    <>
      {localStorage.getItem("username") ? (
        <>
          <NavBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/library/" element={<Library />} />
              <Route path="/journal/" element={<JournalHome />} />
              <Route path="/todo/" element={<TodoHome />} />
              <Route path="/settings/" element={<UserSettings />} />
              <Route path="/faith/" element={<FaithHome />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
