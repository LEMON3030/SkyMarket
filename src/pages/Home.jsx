import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import '../pages/Products.css';
import { Link } from "react-router-dom";
import "./main.css";
export default function Home() {
  const api = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

  return (
    <>
      {loading && <h3>loading ..</h3>}

      {message && (
        <p style={{ color: "red" }}>
          {message}
        </p>
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