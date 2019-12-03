import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.scss';

import 'normalize.css';
import './assets/fonts/fonts.scss';
import './assets/stylesheets/_reset.scss';

import PartOne from './components/PartOne';

function App() {
  return (
    <div className="App">
    
      <Router>
        <div>
        <div className="nav">
        
          <Link className="nav-item nav-one" to="/"  > 
                <h1>Step One</h1>
                <p>Create A Pattern By Creating Conditions And Select Files</p>
          </Link>
    
          <Link className="nav-item" to="/"  > 
                <h1>Step Two</h1>
                <p>Select A Pattern Or Globally Target And Update The Content</p>
          </Link>
    
          <Link className="nav-item" to="/"  > 
                <h1>Step Three</h1>
                <p>Confirmation And File Destination</p>
          </Link>
  
        </div>
          <Route
            path='/'
            render={() => <PartOne />}
          />
        </div>
      </Router>
    
    </div>
  );
}

export default App;
