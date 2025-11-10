// components/MenuItem.js

export default function MenuItem({ item }) {
  // Strapi gives us 'attributes' which is where the data is
  const { name, description, price, image } = item.attributes;

  // This part is a bit tricky, but it's how we get the image URL.
  // We check if an image exists before trying to build its URL.
  const imageUrl = image.data
    ? `http://127.0.0.1:1337${image.data.attributes.url}`
    : null;

  return (
    <div className="menu-item-card">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="item-image" />
      )}
      <div className="item-content">
        <h4 className="item-name">{name}</h4>
        <p className="item-description">{description}</p>
      </div>
      <div className="item-price">${price.toFixed(2)}</div>

      <style jsx>{`
        .menu-item-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden; /* This keeps the image corners rounded */
          display: flex;
          flex-direction: column; /* Lays out content, then price */
        }
        .item-image {
          width: 100%;
          height: 180px;
          object-fit: cover; /* This scales the image nicely */
        }
        .item-content {
          padding: 15px;
          flex-grow: 1; /* This makes the content fill available space */
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