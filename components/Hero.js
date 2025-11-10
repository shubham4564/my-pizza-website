// components/Hero.js
export default function Hero() {
  // You can get a good hero image from a free site like unsplash.com
  // or upload your best pizza photo to your Strapi admin
  const heroImageUrl = 'https://placehold.co/1200x400/d92027/ffffff?text=Your+Best+Pizza+Deal';

  return (
    <div className="hero-container">
      {/* This is a simple way to have a background image.
        For a real image, use a URL from your admin.
      */}
      <style jsx>{`
        .hero-container {
          background-color: #222; /* Fallback color */
          background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImageUrl});
          background-size: cover;
          background-position: center;
          padding: 60px 20px;
          text-align: center;
          color: white;
          border-radius: 8px;
          margin-bottom: 40px;
        }
        .hero-content h1 {
          font-size: 3rem;
          margin: 0 0 10px 0;
        }
        .hero-content p {
          font-size: 1.25rem;
          margin-bottom: 30px;
        }
        .hero-button {
          background-color: #d92027; /* Red */
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
          font-size: 1.1rem;
          transition: background-color 0.2s;
        }
        .hero-button:hover {
          background-color: #a6131a;
        }
      `}</style>

      <div className="hero-content">
        <h1>Bite Into Happiness</h1>
        <p>Serving Las Vegas' best pizza, pasta, and subs.</p>
        <a href="#menu" className="hero-button">
          View Full Menu
        </a>
      </div>
    </div>
  );
}