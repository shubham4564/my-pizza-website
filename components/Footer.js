// components/Footer.js
export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Little Italy Pizza</h4>
          <p>Bite Into Happiness!</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>702-876-3999</p>
          <p>3711 S Valley View Blvd,<br />Las Vegas, NV 89103</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>
            Mon - Thu: 11:00 AM - 11:30 PM<br />
            Fri - Sun: 11:00 AM - 11:30 PM
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Little Italy Pizza LV. All Rights Reserved.</p>
      </div>

      <style jsx>{`
        .footer-container {
          background-color: #333;
          color: #eee;
          padding: 40px 20px 20px;
          margin-top: 50px;
        }
        .footer-content {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          text-align: center;
        }
        /* On screens wider than 600px, use 3 columns */
        @media (min-width: 600px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
            text-align: left;
          }
        }
        .footer-section h4 {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
          margin-bottom: 15px;
        }
        .footer-section p {
          margin: 5px 0;
          line-height: 1.6;
          color: #ccc;
        }
        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #555;
          color: #aaa;
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}