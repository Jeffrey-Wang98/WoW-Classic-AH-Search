// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Nav from './components/Nav';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ProfessionsPage from './pages/ProfessionsPage';

// Define the function that renders the content in routes using State.
function App() {

  const [item, setItem] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>WoW WotLK Classic Item Price Search</h1>
            <p>
              Did you want to find out what an item costs without logging into your character? Did you want to calculate how much
              leveling one of professions from 1-450 will cost? Did you want to calculate how much it will cost to make X amount of consumes
              with current auction house prices? You've come to the right place!
              </p>
          </header>

          <Nav />

          <main>
            <Route path="/" exact>
              <HomePage setItem={setItem} />
            </Route>

            <Route path="/search">
              <CreatePage />
            </Route>
            
            <Route path="/edit">
              <EditPage item={item} />
            </Route>

            <Route path="/professions">
              <ProfessionsPage />
            </Route>
          </main>

          <footer>
            <p>&copy; {new Date().getFullYear()} Jeffrey Wang</p>
          </footer> 

      </Router>
    </>
  );
}

export default App;