//import logo from './logo.svg';
import "./reset.css";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component Imports
import Header from "./components/header.js";
import SideNav from "./components/side-nav.js";
import Footer from "./components/footer.js";
// Page Imports
import Home from "./pages/home.js";
import Landing from "./pages/landing-page.js";
import Login from "./pages/login.js";
// ADD QUIZ SELECTION PAGE
// import Quizzes from "./pages/quiz-selection.js";
import Leaderboard from "./pages/leaderboard.js";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
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
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className="feev__page--wrap">
          <SideNav />
          <Router>
            <div className="feev__router-page--wrap">
              {/* Wrap Route elements in a Routes component */}
              <Routes>
                {/* Define routes using the Route component to render different page components at different paths */}

                {/* Define a default route that will render the Home component */}
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                {/* Define a route that will take in variable data */}
                {/* <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              /> */}
              </Routes>
              <Footer />
            </div>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
