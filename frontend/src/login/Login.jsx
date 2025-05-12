import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import Navbar from "../navbar/NavBar";

const AuthModal = ({ onClose, fetchEntries }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState("");
  const [signUpBtn,setSignUpBtn] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [loading, setLoading] = useState(false); // ✅ Prevent multiple calls

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {

    if (loading) return; // ✅ Prevent double request
    setLoading(true); // ✅ Set loading state

    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    console.log("is login is:",endpoint)
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`,{
        email,
        password,
        ...(isLogin ? {} : { username })
      })

      console.log("response is: ",response);
      
      const data = response.data;

      if (response.data.token) {
          localStorage.setItem("token", data.token);
          setIsAuthenticated(true);
          alert("Login successful!");
          onClose(); 
       
      } else {
          alert(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Try again!");
    } finally {
      setLoading(false); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
  };

  return (
    <div className="auth-modal">
      <div className="auth-model-form">
      <div className="auth-modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <div className="auth-tabs">
          <button
            className={isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="auth-form">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button className="auth-btn" type="submit">
              {isLogin ? (loading ? "Logging in..." : "Login") : "Sign Up"}
            </button>
          </form>
        </div>
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default AuthModal;
