import React from "react";
import { Link } from "react-router-dom";

import Auth from "./../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="header__wrap">
      <header>
        {Auth.loggedIn() && (
          <button
            className="btn btn-primary mobile-nav__show"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
        )}
        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabindex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header">
            <div className="name__wrap header__name">
              <i className="fa-solid fa-cat header__name--icon footer__name--icon"></i>
              <h4 className="footer__name--title">
                feev<span className="header__name--color">.io</span>
              </h4>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <nav>
                <ul className="sideNav__list">
                  <li>
                    <i class="fa-solid fa-house"></i> home
                  </li>
                  <li>
                    <p>
                      <i class="fa-solid fa-list"></i> trivia{" "}
                      <i
                        class="fa-solid fa-caret-down"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample"
                        aria-expanded="false"
                        aria-controls="collapseWidthExample"
                      ></i>
                    </p>
                    <div>
                      <div
                        class="collapse collapse-horizontal"
                        id="collapseWidthExample"
                      >
                        <div class="card card-body">
                          This is some placeholder content for a horizontal
                          collapse. It's hidden by default and shown when
                          triggered.
                          {/* Eventually place links here */}
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <i class="fa-solid fa-trophy"></i> leaders
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <Link to="/">
        <div className="name__wrap header__name">
          <i className="fa-solid fa-cat header__name--icon"></i>
          <h1 className="header__name--title">
            feev<span className="header__name--color">.io</span>
          </h1>
        </div>
        </Link>
        {Auth.loggedIn() ? (
          <div className="dropdown">
            <button
              className="btn  dropdown-toggle user__nav--button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <i class="fa-solid fa-gear"></i> settings
                </a>
              </li>
              <li>
                <button className="dropdown-item" href="#" onClick={logout}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="login__buttons--wrap">
            <Link to="/login">
              <button className="login__nav--button">log in</button>
            </Link>
            <Link to="/signup">
            <button className="signup__nav--button">sign up</button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};
export default Header;
