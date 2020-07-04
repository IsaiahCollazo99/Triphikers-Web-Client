import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import LocationPage from "./components/Location/LocationPage";
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <TripsPage />
        </Route>
        <Route path="/location">
          <LocationPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
