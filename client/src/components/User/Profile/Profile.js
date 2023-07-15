import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const profileCompleteHandler = () => {
    navigate("/enter-details");
  };

  const onClickVerify = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/email", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const fetchData = await response.json();
    notify(fetchData.message);
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
      <button onClick={onClickVerify} className="form-signup-button">
        Verify email
      </button>
    </div>
  );
};

export default Profile;
