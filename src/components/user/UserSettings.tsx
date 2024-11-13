import { Button } from "reactstrap";
import api from "../../types/api";

const UserSettings = () => {
  const handleRefresh = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    const user_id = localStorage.getItem("user_id");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      api
        .delete(`/users/delete/${user_id}/`)
        .then(() => handleRefresh())
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };
  return (
    <>
      <div className="title_block">
        <h1 className="title">Settings</h1>
      </div>
      <Button onClick={() => handleDeleteAccount} color="danger">
        Delete Account
      </Button>
    </>
  );
};

export default UserSettings;
