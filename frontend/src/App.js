import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/">
        <TripsPage />
      </Route>
    </Switch>
  );
}

export default App;
