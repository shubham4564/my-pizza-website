// components/MenuCategory.js
import MenuItem from './MenuItem';

export default function MenuCategory({ name, items }) {
  // If there are no items for this category, don't show anything
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="category-section">
      <h2 className="category-title">{name}</h2>
      <div className="items-grid">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>

      <style jsx>{`
        .category-section {
          margin-bottom: 50px;
        }
        .category-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          border-bottom: 3px solid #d92027; /* Red accent */
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        .items-grid {
          display: grid;
          gap: 25px;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          align-items: stretch;
        }

        /* Ensure single items don't become overly wide on huge screens */
        @media (min-width: 1200px) {
          .items-grid { 
            max-width: 1100px; /* Keeps cards from stretching too far */
            margin: 0 auto; /* Center the grid */
          }
        }
      `}</style>
    </section>
  );
}