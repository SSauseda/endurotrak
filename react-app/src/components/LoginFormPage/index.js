import React, { useState, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const ulRef = useRef();

  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  }

  return (
    <>
    <div className="login-form-container">
      <h1 className="login-header">Sweat. Share. Bravo.</h1>
      <form className={`login-form-page ${isSignupModalOpen ? 'no-pointer-events' : ''}`} onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
        <label className="login-label">
          Email
          <input
          className="input-box"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
          />
        </label>
        <label className="login-label">
          Password
          <input
          className="input-box"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
          />
        </label>
        <button className="login-button" type="submit">Log In</button>
        <button onClick={demoLogin} className="demoLogin">Demo User</button>
        <div className="new-member">
          <p className="member-signup">Not a member?</p>
          <OpenModalButton
              buttonText="Sign Up"
              onItemClick={() => {
                closeMenu();
                setIsSignupModalOpen(true);
              }}
              onModalClose={() => setIsSignupModalOpen(false)}
              modalComponent={<SignupFormModal />}
              />
        </div>
      </form>
    </div>
    </>
  );
}

export default LoginFormPage;
