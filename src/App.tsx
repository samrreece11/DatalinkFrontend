import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./components/library/Library";
import "./App.css"; // Import your CSS file
import JournalHome from "./components/journal/JournalHome";
import HomePage from "./components/home/HomePage";
import NavigationBar from "./components/NavigationBar";
import TodoHome from "./components/todo/TodoHome";
import LoginPage from "./components/login/LoginPage";
import api, { setAuthToken, setUserId } from "./types/api";
import { useEffect } from "react";
import NavBar from "./components/home/NavBar";

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    if (token) {
      setAuthToken();
    }
    if (userId) {
      setUserId();
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
