// components/MenuItem.js

export default function MenuItem({ item }) {
  // --- THIS IS THE FIRST FIX ---
  // We remove ".attributes" because your data is flat.
  const { name, description, price, image } = item;

  // --- THIS IS THE SECOND FIX ---
  // We get the live Strapi URL from the environment
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

  // --- THIS IS THE THIRD FIX ---
  // We simplify the image URL logic to match your API's JSON
  // We check if 'image' exists, and if so, use 'image.url'
  const imageUrl = image ? `${strapiUrl}${image.url}` : null;

  // Guard for price values that may be strings or undefined
  const priceNumber = typeof price === 'number' ? price : parseFloat(price);

  return (
    <div className="menu-item-card">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="item-image" />
      )}
      <div className="item-content">
        <h4 className="item-name">{name}</h4>
        <p className="item-description">{description}</p>
      </div>
      {Number.isFinite(priceNumber) && (
        <div className="item-price">${priceNumber.toFixed(2)}</div>
      )}

      <style jsx>{`
        .menu-item-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden; 
          display: flex;
          flex-direction: column; 
          width: 100%;
          max-width: 520px; /* prevent over-wide single cards */
          margin: 0 auto; /* center within grid cell */
        }
        .item-image {
          width: 100%;
          height: 180px;
          object-fit: cover; 
        }
        .item-content {
          padding: 15px;
          flex-grow: 1; 
        }
        .item-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0 0 10px 0;
        }
        .item-description {
          font-size: 0.9rem;
          color: #555;
          margin: 0;
        }
        .item-price {
          font-size: 1.25rem;
          font-weight: bold;
          color: #d92027; /* Little Italy Red */
          padding: 15px;
          border-top: 1px solid #f0f0f0;
          text-align: right;
        }
      `}</style>
    </div>
  );
}