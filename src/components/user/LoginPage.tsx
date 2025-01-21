import { useState } from "react";
import api from "../../types/api";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Title from "../utils/TitleBlock";
import axios from "axios";
import LoginButton from "../utils/LoginButton";

const LoginPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorType, setErrorType] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleClose = () => {
    console.log("Closing Modal");
    setIsLoginModalOpen(false);
    setIsCreateUserModalOpen(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setErrorType("");
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await api.post("/users/login/", { username, password });
      console.log(res.data);
      setUsername("");
      setPassword("");
      // Save token and username to local storage
      localStorage.setItem("token", res.data["token"]);
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", res.data["user"].id);
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(true);
      }
    }
  };

  const handleCreateUser = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      await api.post("/users/register/", {
        username,
        password,
        email,
      });
      // Return the user from the post request and then use that data.
      handleLogin(username, password);
      setEmail("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Setting Error Type: " + error.response.data);
        setErrorType(error.response.data);
      }
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleSubmitCreateForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    handleCreateUser(username, password, email);
  };

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <header className="login-header">Daily Sync</header>
          <p className="login-notice" style={{ color: "red" }}>
            <b>
              Do not reuse your password for this site. This site is currently
              proof of concept, and does not guarantee security. Please don't
              include any senseitive information within this website. Thank you!
            </b>
          </p>

          {isLoginModalOpen ? (
            <>
              <div className="login-portal">
                <Title>Log In</Title>
                <Form onSubmit={handleSubmitForm}>
                  <FormGroup>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => (
                        setUsername(e.target.value), setLoginError(false)
                      )}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => (
                        setPassword(e.target.value), setLoginError(false)
                      )}
                      required
                    />
                  </FormGroup>
                  {loginError ? (
                    <p className="error-msg">Invalid Username or Password</p>
                  ) : null}
                  <Button
                    className="mx-2 bg-lblue-btn"
                    type="submit"
                    color="primary"
                  >
                    Log In
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => handleClose()}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Form>
              </div>
            </>
          ) : isCreateUserModalOpen ? (
            <>
              <div className="create-portal">
                <Title>Create User</Title>
                <Form onSubmit={handleSubmitCreateForm}>
                  <FormGroup>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => (
                        setUsername(e.target.value), setErrorType("")
                      )}
                      required
                    />
                  </FormGroup>
                  {errorType ? <p className="error-msg">{errorType}</p> : null}
                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button
                    className="mx-2 bg-lblue-btn"
                    type="submit"
                    color="primary"
                  >
                    Create User
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => handleClose()}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Form>
              </div>
            </>
          ) : (
            <div className="login-box">
              <div className="login-intro">
                <p>
                  Track your Books, Reflections, Goals, and Faith with Daily
                  Sync!
                </p>
              </div>
              <LoginButton
                className={"m-auto"}
                onClick={() => setIsLoginModalOpen(true)}
              />
              {/* <a
                onClick={() => setIsLoginModalOpen(true)}
                className="login-ctaBtn"
              >
                Log In
              </a> */}
              <button
                onClick={() => setIsCreateUserModalOpen(true)}
                className="create-user-btn hover"
              >
                Don't have an account? Create One!
              </button>
            </div>
          )}
          <footer className="login-footer">
            <p>© 2024 Daily Sync. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
