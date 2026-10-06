import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import "./pages/main.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand logo" to="/" onClick={closeMenu}>
            Sky<span>Market</span>
          </Link>

          {/* Mobile button */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products" onClick={closeMenu}>
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeMenu}>
                  About us
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </>
  );
}