import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const notify = (message) => toast(message);

  const params = useParams();
  const navigate = useNavigate();

  const [resetDetails, setResetDetails] = useState({ password: "", id: "" });

  const onChnageHandler = (e) => {
    setResetDetails({
      ...resetDetails,
      password: e.target.value,
      id: params.id,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(resetDetails);
    const response = await fetch("http://localhost:5000/user/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetDetails),
    });
    const fetchData = await response.json();
    notify(fetchData.message);
    setResetDetails({ password: "", id: "" });
    navigate("/login");
  };
  return (
    <form className="form-signup" onSubmit={onSubmitHandler}>
      <input
        value={resetDetails.password}
        type="password"
        name="password"
        className="form-signup-input"
        onChange={onChnageHandler}
        placeholder="Enter a new Password"
      />
      <button className="form-signup-button">Update</button>
    </form>
  );
};

export default ResetPassword;
