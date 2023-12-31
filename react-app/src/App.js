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
import EditChallengeForm from "./components/EditChallenges";
import ManageChallenges from "./components/ManageChallenges";
import ResultModal from "./components/ResultModal";
import Homepage from "./components/Homepage";
import AthletePage from "./components/AthletePage";
import Footer from "./components/Footer";


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
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/athlete">
            <UserProfile />
          </Route>
          <Route exact path="/athlete/:userId">
            <AthletePage />
          </Route>
          <Route exact path="/user/challenges">
            <ManageChallenges />
          </Route>
          {/* <Route exact path="/login" >
            <LoginFormPage />
          </Route> */}
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
          <Route exact path="/challenges/:challengeId/edit">
            <EditChallengeForm />
          </Route>
          <Route exact path="/challenges/:challengeId/results/:resultId">
            <ResultModal />
          </Route>
        </Switch>
      )}
      <Footer>
        <Footer isLoaded={ isLoaded }/>
      </Footer>
    </>
  );
}

export default App;
