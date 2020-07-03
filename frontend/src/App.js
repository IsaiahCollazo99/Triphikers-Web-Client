import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <TripsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
