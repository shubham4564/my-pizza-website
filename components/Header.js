// components/Header.js
import Link from 'next/link';

export default function Header() {
  // We'll link the "Order Now" to an external site, or you can make an /order page later
  const orderOnlineUrl = 'https://www.your-online-order-link.com'; // Replace this
  const googleMapsUrl = 'https://goo.gl/maps/YOUR_GOOGLE_MAPS_LINK'; // Replace this

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="branding">
          <Link href="/">
            <span className="brand-title">Little Italy Pizza</span>
          </Link>
          <span className="brand-phone">702-876-3999</span>
        </div>
        <nav className="header-nav">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="nav-link">
            Get Directions
          </a>
          <a href={orderOnlineUrl} target="_blank" rel="noopener noreferrer" className="cta-button">
            Order Now
          </a>
        </nav>
      </div>

      <style jsx>{`
        .header-container {
          width: 100%;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 15px 20px;
          position: sticky; /* Makes it stick to the top on scroll */
          top: 0;
          z-index: 100;
        }
        .header-content {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .branding {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: #d92027; /* Red */
          text-decoration: none;
          cursor: pointer;
        }
        .brand-phone {
          font-size: 1rem;
          color: #555;
          font-weight: bold;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .nav-link {
          font-size: 1rem;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #d92027;
        }
        .cta-button {
          background-color: #28a745; /* Green */
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        .cta-button:hover {
          background-color: #218838;
        }
        
        /* Simple mobile styles */
        @media (max-width: 600px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }
          .branding {
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
}