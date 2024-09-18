"use client";

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import "./NavBar.module.css";
import SearchBar from "../../reusableComponents/SerachBar/SearchBar";
import { fetchUserDetails, logout } from "@/utils/userUtils";
import SignInPopup from "../SignInPopup/SignInPopup";
const NavBar = () => {
  const [searchParams, setSearchParams] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [profileName, setProfleName] = useState("");
  const [showAccountNavigation, setShowAccountNavigation] = useState(false);
  const token = localStorage.getItem("token");
  const [showSigninComponent, setShowSigninComponent] = useState(false);

  const handleAccountNavigation = (
    setShowAccountNavigation: (status: boolean) => void,
    showAccountNavigation: boolean
  ) => {
    setShowAccountNavigation(!showAccountNavigation);
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails({token:token,setProfileName:setProfleName,setProfileUrl:setProfileUrl});
    }
  }, [token, setProfileUrl, setProfleName]);

  const openPopup = () => setShowSigninComponent(true);
  const closePopup = () => setShowSigninComponent(false);

  return (
    <div className={styles.navBar}>
      <img src="/images/logo.svg" alt="" className={styles.logo} />
      <SearchBar onSearch={setSearchParams} />
      {!token && (
        <>
          <button className={styles.login} onClick={() => openPopup()}>
            Login
          </button>
            <SignInPopup isOpen={showSigninComponent} onClose={closePopup}/>
        </>
      )}
      {token && (
        <div className={styles.userAccount}>
          <img
            src={profileUrl}
            alt=""
            onClick={() =>
              handleAccountNavigation(
                setShowAccountNavigation,
                showAccountNavigation
              )
            }
          />
          <p
            onClick={() =>
              handleAccountNavigation(
                setShowAccountNavigation,
                showAccountNavigation
              )
            }
          >
            {profileName}
          </p>
          {showAccountNavigation && (
            <div className={styles.accountNavigation}>
              <ul>
                <li onClick={()=>{
                  window.location.href = '/User/Dashboard'
                }}>Dashboard</li>
                <li onClick={() => logout()}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
