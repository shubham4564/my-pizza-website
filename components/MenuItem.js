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
    </div>
  );
}