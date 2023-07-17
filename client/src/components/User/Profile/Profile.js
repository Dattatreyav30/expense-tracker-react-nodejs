import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await fetch("http://localhost:5000/check-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const fetchData = await userData.json();
      if (fetchData.message === "successfull") {
        navigate("/expense-form");
      }
      console.log(fetchData.message)
    };
    fetchUserDetails();
  });
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
