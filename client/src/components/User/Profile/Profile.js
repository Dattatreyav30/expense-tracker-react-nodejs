import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();

  const profileCompleteHandler = () => {
    navigate("/enter-details");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile">
      <h1 style={{ display: "inline-block" }}>Hi welcome to expense tracker</h1>
      <p className="profile-incomplete">your profile is incomplete </p>
      <Link>
        <p onClick={profileCompleteHandler} className="profile-incomplete-link">
          complete now
        </p>
      </Link>
      <button className="logout-button" onClick={logoutHandler}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
