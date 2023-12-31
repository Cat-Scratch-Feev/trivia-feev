import "./reset.css";
import React, { useState } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./utils/auth";
// Component Imports
import Header from "./components/header.js";
import SideNav from "./components/side-nav.js";
import Footer from "./components/footer.js";
// Page Imports
import Home from "./pages/home.js";
import Landing from "./pages/landing-page.js";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
// ADD QUIZ SELECTION PAGE
import Quizzes from "./pages/quiz-selection.js";
import Leaderboard from "./pages/leaderboard.js";
import Quiz from "./pages/quiz.js";
import ProfileSettings from "./pages/profile-settings.js";

let uri;

//Ensure correct uri if in development mode or in production deployment
if (process.env.NODE_ENV === "development") {
  uri = "http://localhost:3001/graphql";
} else {
  uri = "/graphql";
}

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("auth_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  //Check if user is logged in, used in App to conditionally render.
  const isLoggedIn = Auth.loggedIn();
  const [quizState, setQuizState] = useState("start");
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          {/* Render pages and routes based on if user authentification, otherwise render landing and login/signup */}
          {isLoggedIn ? (
            <div className="feev__page--wrap">
              <SideNav />
              <div className="feev__router-page--wrap">
                {/* Wrap Route elements in a Routes component */}
                <Routes>
                  {/* Define routes using the Route component to render different page components at different paths */}
                  {/* Define a default route that will render the Home component */}
                  <Route path="/" element={<Home quizState={quizState} setQuizState={setQuizState}/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/quizzes"
                    element={
                      <Quizzes
                        quizState={quizState}
                        setQuizState={setQuizState}
                      />
                    }
                  />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route
                    path="/quiz"
                    element={
                      <Quiz quizState={quizState} setQuizState={setQuizState} />
                    }
                  />
                  <Route
                    path="/profilesettings"
                    element={<ProfileSettings />}
                  />
                </Routes>
                <Footer />
              </div>
            </div>
            
          ) : (
            <div className="feev__landing-wrap">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              <Footer />
            </div>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
