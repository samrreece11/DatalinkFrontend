import { useState } from "react";
import LoginModal from "./LoginModal";
import { Button } from "reactstrap";
import api from "../../types/api";

const LoginPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (username: string, password: string) => {
    console.log(username, password);
    api
      .post("/users/login/", { username, password })
      .then((res) => {
        console.log(res.data);
        // Save token and username to local storage
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", res.data["user"].id);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <header className="login-header">Daily Sync</header>
          <div className="login-intro">
            <p>
              Track your Books, Journals, To Do Lists, and more with Daily Sync!
            </p>
          </div>
          <a onClick={() => setIsLoginModalOpen(true)} className="login-ctaBtn">
            Log In
          </a>
          <footer className="login-footer">
            <p>© 2024 Daily Sync. All rights reserved.</p>
          </footer>
        </div>
      </div>
      <div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          handleLogin={handleLogin}
        />
      </div>
    </>
  );
};

export default LoginPage;
