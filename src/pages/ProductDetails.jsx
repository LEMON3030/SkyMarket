import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaUndo, FaArrowRight } from "react-icons/fa";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const api = "https://dummyjson.com/products/" + id;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);

  async function getProduct() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(api);

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);
      } else {
        setMessage("Fetch Error ! product not found");
      }
    } catch (e) {
      setMessage("Fetch Error ! cannot resolve api url [" + e.message + "]");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  const images = product.images || [];
  const stars = Math.round(product.rating || 0);
  const finalPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <>
      {loading && <h3 className="container mt-4">loading .. </h3>}

      {message && (
        <p className="container mt-4" style={{ color: "red" }}>
          {message}
        </p>
      )}

      {!loading && product.id && (
        <div className="container details-page">
          <Link to="/products" className="back-link">
            <FaArrowRight /> بازگشت به محصولات
          </Link>

          <div className="row g-5 mt-1">
            {/* Gallery */}
            <div className="col-12 col-md-6">
              <div className="details-main-image">
                <img
                  src={images[selectedImage] || product.thumbnail}
                  alt={product.title}
                />
              </div>

              <div className="details-thumbs">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === selectedImage ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="col-12 col-md-6">
              <span className="details-category">{product.category}</span>

              <h1 className="details-title">{product.title}</h1>

              {product.brand && (
                <p className="details-brand">Brand: {product.brand}</p>
              )}

              <div className="details-rating">
                <span>
                  {"★".repeat(stars)}
                  {"☆".repeat(5 - stars)}
                </span>
                <small> ({product.rating})</small>
              </div>

              <div className="details-price">
                <span className="new-price">${finalPrice}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="old-price">${product.price}</span>
                    <span className="discount">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  </>
                )}
              </div>

              <h5 className="details-subtitle">Description</h5>
              <p className="details-description">{product.description}</p>

              <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
                {product.stock > 0
                  ? `موجود در انبار (${product.stock} عدد)`
                  : "ناموجود"}
              </p>

              <button
                type="button"
                className="btn btn-primary text-white details-btn"
                disabled={product.stock === 0}
              >
                افزودن به سبد خرید
              </button>

              <ul className="details-features">
                {product.shippingInformation && (
                  <li>
                    <FaTruck /> {product.shippingInformation}
                  </li>
                )}
                {product.warrantyInformation && (
                  <li>
                    <FaShieldAlt /> {product.warrantyInformation}
                  </li>
                )}
                {product.returnPolicy && (
                  <li>
                    <FaUndo /> {product.returnPolicy}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="details-reviews">
              <h3>Reviews</h3>

              <div className="row g-4 mt-1">
                {product.reviews.map((review, index) => (
                  <div className="col-12 col-md-4" key={index}>
                    <div className="review-card">
                      <strong>{review.reviewerName}</strong>
                      <div className="review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}