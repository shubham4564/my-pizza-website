// components/Layout.js
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />

      <style jsx>{`
        .main-content {
          /* This is a flex-column trick to make the footer
             stick to the bottom, even on short pages */
          display: flex;
          flex-direction: column;
          min-height: 80vh; /* Viewport Height */
        }
      `}</style>

      {/* These are our global styles from index.js.
          Let's move them here so they apply to ALL pages. */}
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f9f9f9;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }
        a { /* Simple link default */
          color: #d92027;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}