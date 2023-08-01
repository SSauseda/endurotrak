import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Challenge from "./components/Challenges";
import UserProfile from "./components/UserProfile";
import AddChallengeForm from "./components/CreateChallengeForm";
import ChallengePage from "./components/ChallengePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/user">
            <UserProfile />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/challenges">
            <Challenge />
          </Route>
          <Route exact path="/challenges/new-challenge">
            <AddChallengeForm />
          </Route>
          <Route exact path="/challenges/:challengeId">
            <ChallengePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
