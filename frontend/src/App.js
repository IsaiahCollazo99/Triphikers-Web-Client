import React from 'react';
import './App.css';
import TripsPage from './components/TripsPage/TripsPage';
import { Switch, Route } from 'react-router-dom';
import CreateTripsContainer from './components/CreateTrip/CreateTripContainer';
import DetailedTripPage from './components/DetaliedTripPage/DetailedTripPage';
import LandingPage from "./components/General/Landing";
import SignUpForm from "./components/Login/SignUpForm";
import SignUpFormWithEmail from "./components/Login/SignUpFormWithEmail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
            <LandingPage />
        </Route>

        <Route path="/sign_up">
          <SignUpForm />
        </Route>
        {/* <Route path="/signUp_facebook">
          <SignUpFormWithFacebook />
        </Route>
        <Route path="/signUp_google">
          <SignUpFormWithGoogle/>
        </Route> */}
        
        <Route path="/signUp_email">
					<SignUpFormWithEmail/>
				</Route>

        <Route exact path="/trips">
          <TripsPage />
        </Route>

        <Route exact path="/trips/create">
          <CreateTripsContainer />
        </Route>

        <Route path="/trips/:id">
          <DetailedTripPage />
        </Route>
      </Switch>
    </div>
	);
}

export default App;
