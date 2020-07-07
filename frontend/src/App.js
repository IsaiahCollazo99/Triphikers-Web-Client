import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import LocationPage from "./components/Location/LocationPage";
import { Switch, Route, useHistory } from 'react-router-dom';

function App() {
  // const history = useHistory();
  // const locationRedirect = (id) => history.push(`/location/${id}`);

  // const fetchLocation = (id) => {
  //   locationRedirect(id);
  // };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <TripsPage />
        </Route>
        <Route path={"/location/:id"}>
          <LocationPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
