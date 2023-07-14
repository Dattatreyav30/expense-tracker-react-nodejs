import "./SignUp.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const notify = (message) => toast(message);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confPass: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState("");
  const [signup, setsignup] = useState(false);

  useEffect(() => {
    if (password === confPass) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, confPass]);

  const emailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    setFormData({ ...formData, password: e.target.value });
  };

  const conformPasswordChange = (e) => {
    setConfPass(e.target.value);
    setsignup(true);
    setFormData({ ...formData, confPass: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const fecthedResponse = await response.json();

    notify(fecthedResponse.message);

    setFormData({ email: "", password: "", confPass: "" });
  };

  return (
    <form className="form-signup" onSubmit={onSubmitHandler}>
      <h1 className="form-signup-name">SignUp</h1>
      <input
        value={formData.email}
        onChange={emailChange}
        className="form-signup-input"
        type="text"
        name="email"
        placeholder="Email"
        required
      />
      <input
        value={formData.password}
        onChange={passwordChange}
        className="form-signup-input"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        value={formData.confPass}
        onChange={conformPasswordChange}
        className={`form-signup-input ${
          isValid ? "isValidInput" : signup ? "notValidInput" : ""
        }`}
        type="password"
        name="confirm-password"
        placeholder="Confirm password"
        required
      />
      <button
        className={`form-signup-button ${isValid ? "isValid" : "notValid"}`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
