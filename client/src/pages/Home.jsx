import React from "react";
import { Link } from "react-router-dom";
import Analytics from "../components/Analytics";

const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to Mern Admin Dashboard</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Mern Admin, we
                specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <Link to="/contact">
                  <button className="btn">connect now</button>
                </Link>
                <Link to="/service">
                  <button className="btn secondary-btn">learn more</button>
                </Link>
              </div>
            </div>

            {/* hero images */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Anyaltics section */}
      <Analytics />

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              lets discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <Link to="/contact">
                <button className="btn">connect now</button>
              </Link>
              <Link to="/service">
                <button className="btn secondary-btn">learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
