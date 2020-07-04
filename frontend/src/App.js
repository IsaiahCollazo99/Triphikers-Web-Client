import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import { Switch, Route } from 'react-router-dom';
import CreateTripsContainer from './components/CreateTrip/CreateTripContainer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/trips">
          <TripsPage />
        </Route>

        <Route path="/trips/create">
          <CreateTripsContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
