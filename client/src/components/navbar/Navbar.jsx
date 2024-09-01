import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../store/auth";

const Navbar = () => {
  const { isloggedIn, user } = useAuth();

  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (isloggedIn && user?.isAdmin) {
      setShowAdmin(true);
    } else {
      setShowAdmin(false);
    }
  }, [isloggedIn, user]);

  return (
    <>
      <header>
        <div className="container">
          <div className="brand-logo">
            <NavLink to="/">Dashboard</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About</NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {showAdmin && (
                <li>
                  <NavLink to="/admin"> Admin</NavLink>
                </li>
              )}

              {isloggedIn ? (
                <li>
                  <NavLink to="/logout"> Logout </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
