import { useState } from "react";
import api from "../../types/api";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Title from "../utils/TitleBlock";

const LoginPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setIsCreateUserModalOpen(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setErrorType("");
  };
  const handleLogin = (username: string, password: string) => {
    console.log(username, password);
    api
      .post("/users/login/", { username, password })
      .then((res) => {
        setUsername("");
        setPassword("");
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

  const handleCreateUser = async (
    username: string,
    password: string,
    email: string
  ) => {
    await api
      .post("/users/register/", { username, password, email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorType(error.response.data);
        console.log(errorType);
      });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const handleSubmitCreateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateUser(username, password, email);
    console.log("Error: ", errorType);
    if (!errorType || errorType !== "") {
      console.log("No error");
      handleLogin(username, password);
      handleClose();
      setEmail("");
    } else {
      console.log(errorType);
    }
  };

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <header className="login-header">Daily Sync</header>

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
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
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
            <>
              <div className="login-intro">
                <p>
                  Track your Books, Journals, To Do Lists, and more with Daily
                  Sync!
                </p>
              </div>
              <a
                onClick={() => setIsLoginModalOpen(true)}
                className="login-ctaBtn"
              >
                Log In
              </a>
              <br />
              <button
                onClick={() => setIsCreateUserModalOpen(true)}
                className="create-user-btn hover"
              >
                Don't have an account?
              </button>
            </>
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
