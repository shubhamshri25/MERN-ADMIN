import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const URL = "http://localhost:3000/api/auth/login";
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res_data = response.data;
      console.log("res from  server", res_data);

      if (response.status >= 200 && response.status < 300) {
        storeTokenInLs(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("login", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="Login image"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />

                {/* Form Starts here  */}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
