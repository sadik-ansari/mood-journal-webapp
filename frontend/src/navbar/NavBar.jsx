import React, { useState, useCallback, useEffect} from "react";
import "./NavBar.css";
import Login from "../login/Login";

const Navbar = ({signUpBtn, fetchEntries}) => {
  const [showAuth, setShowAuth] = useState(false);
  const [logOut, setLogOut] = useState(signUpBtn);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const onCloseHandler = useCallback(() => setShowAuth(false), []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    alert("You have been logged out.");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p>Mood Journal</p>
      </div>
      <div className="navbar-middle">
        <p>Dashboard</p>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <button onClick={handleLogout} aria-label="Logout">Logout</button>
        ) : (
          <button onClick={() => setShowAuth(true)} aria-label="Sign in">Sign In</button>
        )}
      </div>
      {showAuth && <Login onClose={() => setShowAuth(false)} setIsAuthenticated={setIsAuthenticated} fetchEntries={fetchEntries}/>}
    </nav>
  );
};

export default Navbar;
