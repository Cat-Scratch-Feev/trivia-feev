//import logo from './logo.svg';
import './reset.css';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Component Imports
import Header from './components/header.js';
import SideNav from './components/side-nav.js';
import Footer from './components/footer.js';
// Page Imports
import Home from './pages/home.js';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
 
function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Header/>
      <div className = "feev__page--wrap">
        <SideNav/>
      <Router>
        <div className="feev__router-page--wrap">
            
            {/* Wrap Route elements in a Routes component */}
            <Routes>
              {/* Define routes using the Route component to render different page components at different paths */}
            
              {/* Define a default route that will render the Home component */}
              <Route 
                path="/" 
                element={<Home />} 
              />
              {/* Define a route that will take in variable data */}
              {/* <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              /> */}
            </Routes>
            <Footer/>
          </div>
      </Router>
      </div>
    </div>
    </ApolloProvider>
  );
}

export default App;
