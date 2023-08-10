import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className="form-input"
        placeholder="Your username"
        name="username"
        type="text"
        value={formState.username}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Your email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="******"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button
        className="btn btn-block btn-info"
        style={{ cursor: "pointer" }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Signup;
