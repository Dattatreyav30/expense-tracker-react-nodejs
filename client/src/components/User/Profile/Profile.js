import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const profileCompleteHandler = () => {
    navigate("/enter-details");
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
    </div>
  );
};

export default Profile;
