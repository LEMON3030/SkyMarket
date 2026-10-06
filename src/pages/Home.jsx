import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import '../pages/Products.css';
import { Link } from "react-router-dom";
import "./main.css";
import "./Carousel.css";

export default function Home() {
  const api = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(0);

  // سه محصول اول برای اسلایدر
  const slides = products.slice(0, 3);
  const total = slides.length;

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  async function getProducts() {
    try {
      const response = await fetch(api);

      if (response.ok) {
        const data = await response.json();

        setProducts(data.products);
        setLoading(false);
      } else {
        setMessage("Fetch Error! cannot resolve api url");
        setLoading(false);
      }

    } catch (e) {
      setMessage("Fetch Error! [" + e.message + "]");
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // حرکت خودکار اسلایدر
  useEffect(() => {
    if (total === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [current, total]);

  return (
    <>
      {loading && <h3 className="container mt-4">loading ..</h3>}

      {message && (
        <p className="container mt-4" style={{ color: "red" }}>
          {message}
        </p>
      )}

      {/* Carousel */}
      {total > 0 && (
        <div className="container mt-4">
          <div className="sky-carousel">
            {slides.map((product, index) => (
              <div
                key={product.id}
                className={`sky-slide ${index === current ? "active" : ""}`}
              >
                <img src={product.images[0] || product.thumbnail} alt={product.title} />
                <div className="sky-overlay"></div>
                <div className="sky-caption">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-info text-white mt-3"
                  >
                    مشاهده محصول
                  </Link>
                </div>
              </div>
            ))}

            <button className="sky-arrow sky-prev" type="button" onClick={prevSlide} aria-label="Previous">
              ‹
            </button>
            <button className="sky-arrow sky-next" type="button" onClick={nextSlide} aria-label="Next">
              ›
            </button>

            <div className="sky-dots">
              {slides.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  className={index === current ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => setCurrent(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mt-4">
        <div className="row g-4">

          {products.slice(0, 4).filter(product => product.rating >= 2.5).map((product) => (
            <div className="col-12 col-sm-6 col-md-3" key={product.id}>

              <div className="card h-100">
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {product.title}
                  </h5>

                  <p className="card-text">
                    ${product.price}
                    <br />
                    <span>
                    {"★".repeat(Math.round(product.rating))}
                    {"☆".repeat(5 - Math.round(product.rating))}
                    </span>
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary text-white mt-auto"
                  >
                    مشاهده محصول
                  </Link>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}