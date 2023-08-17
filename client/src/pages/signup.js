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

  const [addUser, { error, data }] = useMutation(ADD_USER);
  
  //Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <div className="login-signup-page__wrap">
      <div className="login-signup__wrap">
      {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
        <form className="login-signup__form" onSubmit={handleFormSubmit}>
          <h2 className="form__title">create an account</h2>
          <div className="form__label-input--pair">
            <label className="form__label">your username</label>
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
          <label className="form__label">your email</label>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          </div>
          <div className="form__label-input--pair">
          <label className="form__label">your password</label>
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          </div>
          <button
            className="login__button btn-block btn-info"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </form>
        )}
        {error && (
            <div className="my-3 p-3 bg-danger text-white">
              Error signing up!
            </div>
          )}
      </div>
    </div>
  );
};

export default Signup;
