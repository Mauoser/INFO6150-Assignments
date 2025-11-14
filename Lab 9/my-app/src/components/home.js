import React from "react";
import Card from "./card";
import Counter from "./counter";
import "./layout.css";

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-content">
          <a href="/" className="nav-brand">
            MyApp
          </a>
          <div className="nav-links">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#counter" className="nav-link">
              Counter
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Amazing App</h1>
          <p className="hero-subtitle">
            Discover beautiful cards and interactive features that make your
            experience unique
          </p>
          <a href="#features" className="hero-button">
            Explore Features
          </a>
        </div>
      </section>

      <section id="features" className="section">
        <h2 className="section-title">Featured Cards</h2>
        <Card />
      </section>

      <section id="counter" className="counter-section">
        <h2 className="section-title">Interactive Counter</h2>
        <Counter />
      </section>

      <footer className="footer">
        <p>&copy; 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
