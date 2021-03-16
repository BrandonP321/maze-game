import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      <Router basename='/maze-game'>
        <Switch>
          <Route exact path='/'>
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
