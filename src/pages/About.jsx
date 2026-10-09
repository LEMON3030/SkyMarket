import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaRocket, FaGem, FaHandshake } from "react-icons/fa";
import "./About.css";

const stats = [
  { id: 1, number: "10K+", label: "مشتری راضی" },
  { id: 2, number: "500+", label: "محصول متنوع" },
  { id: 3, number: "24/7", label: "پشتیبانی" },
  { id: 4, number: "5 ★", label: "امتیاز کاربران" },
];

const values = [
  {
    id: 1,
    icon: <FaRocket />,
    title: "ارسال سریع",
    text: "سفارش شما در کمترین زمان آماده و به دست شما می‌رسد.",
  },
  {
    id: 2,
    icon: <FaGem />,
    title: "کیفیت تضمینی",
    text: "همه محصولات قبل از عرضه بررسی و انتخاب می‌شوند.",
  },
  {
    id: 3,
    icon: <FaHandshake />,
    title: "پشتیبانی دوستانه",
    text: "تیم ما همیشه آماده پاسخ به سؤال‌های شماست.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>
            درباره <span>SkyMarket</span>
          </h1>
          <p>
            ما یک فروشگاه آنلاین هستیم که خرید ساده، سریع و مطمئن را برای
            همه فراهم می‌کنیم.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container about-story">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h2>داستان ما</h2>
            <p>
              SkyMarket با یک هدف ساده شروع شد: اینکه پیدا کردن و خریدن
              محصول مناسب، تجربه‌ای لذت‌بخش باشد. ما محصولات را با دقت
              انتخاب می‌کنیم تا شما بدون نگرانی خرید کنید.
            </p>
            <p>
              امروز با تیمی کوچک ولی پرانرژی، تلاش می‌کنیم هر روز سایت و
              خدماتمان را بهتر کنیم.
            </p>
          </div>

          <div className="col-md-6">
            <img
              src="https://picsum.photos/id/1011/800/500"
              alt="تیم SkyMarket"
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className="row g-4 about-stats">
          {stats.map((item) => (
            <div className="col-6 col-md-3" key={item.id}>
              <div className="stat-box">
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container about-values">
        <h2 className="text-center">چرا SkyMarket؟</h2>

        <div className="row g-4 mt-2">
          {values.map((item) => (
            <div className="col-12 col-md-4" key={item.id}>
              <div className="value-card">
                <div className="value-icon">{item.icon}</div>
                <h5>{item.title}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="about-cta">
          <h2>آماده‌اید خرید کنید؟</h2>
          <p>محصولات ما را ببینید و بهترین‌ها را انتخاب کنید.</p>
          <Link to="/products" className="btn btn-info text-white">
            مشاهده محصولات
          </Link>
        </div>
      </section>
    </>
  );
}