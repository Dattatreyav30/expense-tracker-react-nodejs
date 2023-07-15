import { useState } from "react";
import { toast } from "react-toastify";
import "./UserDetails.css";

const UserDetails = () => {
  const notify = (message) => toast(message);
  const [formData, setFormData] = useState({ fullName: "", imageUrl: "" });

  const onChangeName = (e) => {
    return setFormData({ ...formData, fullName: e.target.value });
  };
  const onChangeUrl = (e) => {
    return setFormData({ ...formData, imageUrl: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const resposne = await fetch("http://localhost:5000/user-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });

    const fetchedData = await resposne.json();
    setFormData({ fullName: "", imageUrl: "" });
    notify(fetchedData.message);
  };

  return (
    <form className="user-form" onSubmit={onSubmitHandler}>
      <input
        onChange={onChangeName}
        name="full-name"
        type="text"
        className="user-input"
        placeholder="Full Name"
        value={formData.fullName}
      />
      <input
        onChange={onChangeUrl}
        name="fphoto-url"
        type="text"
        className="user-input"
        placeholder="Photo Url"
        value={formData.imageUrl}
      />
      <button className="form-signup-button">Send</button>
    </form>
  );
};

export default UserDetails;
