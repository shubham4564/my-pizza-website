// components/Hero.js

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Bite Into Happiness</h1>
        <p className="hero-subtitle">
          Authentic Italian flavors, delivered right to your door.
        </p>
        <a href="#menu" className="hero-button">
          View Full Menu
        </a>
      </div>

      <style jsx>{`
        .hero-container {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('/hero-background.jpg'); /* Make sure you have this image in /public */
          background-size: cover;
          background-position: center;
          padding: 100px 20px;
          text-align: center;
          color: white;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin: 0;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          margin: 15px 0 30px 0;
        }
        .hero-button {
          background-color: #d92027; /* Red */
          color: white;
          padding: 15px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        .hero-button:hover {
          background-color: #b81a21; /* Darker Red */
        }
      `}</style>
    </div>
  );
}