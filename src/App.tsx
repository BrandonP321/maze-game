import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router basename='/maze-game'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/game/:difficulty'>
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
