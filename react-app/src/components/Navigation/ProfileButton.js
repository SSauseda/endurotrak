import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    setShowMenu(false);
    history.push("/");
  };
  

  const closeMenuAndNavigate = (e) => {
    e.stopPropagation();
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button-container" onMouseLeave={() => setShowMenu(false)}>
      <button className="profile-button" onMouseEnter={openMenu}>
      <i class="fas fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="logged-in-container">
            <li className="user-greeting">Hello! {user.firstName}</li>
            {/* <li>{user.email}</li> */}
            <li className="dropdown-item-profile">
  <Link onClick={closeMenuAndNavigate} to='/athlete'>
    <div>My Profile</div>
  </Link>
</li>
<li className="dropdown-item-profile">
  <NavLink onClick={closeMenuAndNavigate} to='/user/challenges'>
    <div>My Created Challenges</div>
  </NavLink>
</li>
            <li className="log-out">
              <button className="logoutButton" onClick={handleLogout}>Log Out</button>
            </li>
          </div>
          </>
        ) : (
          <>
            {/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            /> */}

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
