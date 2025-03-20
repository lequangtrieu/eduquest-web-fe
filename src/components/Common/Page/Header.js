import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../public/assets/css/header.css";

export default function Header() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("avatar");
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.nameid || decodedToken.sub);
        setAdmin(decodedToken.role === "Admin");
      } catch (error) {
        console.error("Invalid token:", error);
        setAdmin(false);
      }
    }

    if (storedUserName) {
      setUserName(storedUserName);
      setAvatar(storedAvatar);
    }
  }, []);

  useEffect(() => {
    const updateAvatar = () => {
      setAvatar(localStorage.getItem("avatar") || "default-avatar.png");
    };

    window.addEventListener("avatarUpdated", updateAvatar);

    return () => {
      window.removeEventListener("avatarUpdated", updateAvatar);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("logoutSuccess", "true");
    navigate("/login");
  };

  const navigateAdmin = () => {
    navigate("/admin");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header id="header" className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-between">
          <div className="contact-info">
            <i className="bi bi-envelope">
              <a href="mailto:contact@example.com">
                EduQuest.service@gmail.com
              </a>
            </i>
            <i className="bi bi-phone">+84386543757</i>
          </div>
          <div className="social-links">
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container">
          <Link to={"/"} className="logo">
            <img src="/img/EduQuestLogo.png" alt="EduQuest Logo" />
            EduQuest<span>.</span>
          </Link>

          <nav className="navmenu">
            <ul className="nav-links">
              {userName ? (
                <>
                  <li>
                    <Link to="/courses">
                      <i className="fas fa-book"></i> Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/subscriptions">
                      <i className="fas fa-dollar-sign"></i> Subscriptions
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <i className="fas fa-info-circle"></i> About
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">
                      <i className="fas fa-home"></i> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <i className="fas fa-info-circle"></i> About
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="auth-buttons">
            {userName ? (
              <div className="nav-item dropdown" ref={dropdownRef}>
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                  <span>{userName}</span>
                  <img
                    src={avatar || "../img/client-Avatar/clientAvatar-1.jpg"}
                    alt="Avatar"
                    className="avatar-img"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu show">
                    <a
                      className="dropdown-item"
                      onClick={() => navigate(`/profile/${userId}`)}
                    >
                      Profile
                    </a>
                    {isAdmin && (
                      <a onClick={navigateAdmin} className="dropdown-item">
                        Admin Panel
                      </a>
                    )}
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
