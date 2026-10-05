import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./main.css";

export default function MainFooter() {
  return (
    <footer className="sky-footer">
      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-logo">
              Sky<span>Market</span>
            </Link>

            <p className="footer-description">
              خریدی ساده، سریع و مطمئن با SkyMarket.
              بهترین محصولات را با بهترین قیمت پیدا کنید.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>

              <li>
                <Link to="/about">About us</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Customer Service</h5>

            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Contact Us</h5>

            <p className="footer-contact">
              📧 support@skymarket.com
            </p>

            <p className="footer-contact">
              📞 09333039857
            </p>
          </div>

        </div>

        <hr className="footer-line" />

        <div className="footer-bottom">
          <p>© 2026 SkyMarket. All rights reserved.</p>
          <p>Made with coffe for better shopping</p>
        </div>

      </div>
    </footer>
  );
}