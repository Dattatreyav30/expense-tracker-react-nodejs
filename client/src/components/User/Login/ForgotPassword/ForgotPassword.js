import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });

  const notify = (message) => toast(message);

  const navigate = useNavigate();

  const onChnageEmailHandler = (e) => {   
    setEmail({ email: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    const fetchData = await response.json();
    notify(fetchData.message);
    navigate('/login')
  };
  return (
    <div onSubmit={onSubmitHandler}>
      <form className="form-signup">
        <input
          onChange={onChnageEmailHandler}
          type="email"
          name="email"
          placeholder="Enter registered email"
          className="form-signup-input"
        />
        <button className="form-signup-button">confirm</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
