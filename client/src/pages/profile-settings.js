import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "../utils/mutations";

import Auth from "../utils/auth";

const ProfileSettings = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [updateuser, { error, data }] = useMutation(UPDATE_USER_MUTATION);

  // Update state based on form input changes
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

    try {
      await updateuser({
        variables: { ...formState },
      });

      Auth.logout();
      // clear form values
      setFormState({
        email: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="login-signup-page__wrap">
      <div className="login-signup__wrap">
        {data ? (
          <p>
            Success! We are bringing you{""}
            <Link to="/"> back to the home page.</Link>
          </p>
        ) : (
          <form className="login-signup__form profile-settings__form" onSubmit={handleFormSubmit}>
            <h2 className="form__title">Profile Settings</h2>
            <div className="form__label-input--pair">
              <label className="form__label">Username</label>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div className="form__label-input--pair">
              <label className="form__label">Email</label>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <button
              className="profile-settings__button login__button  btn-block btn-info"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Update User
            </button>
          </form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};
export default ProfileSettings;
