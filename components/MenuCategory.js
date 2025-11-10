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
          /* This is responsive! 1 column on mobile, 2 on tablet+ */
          grid-template-columns: 1fr;
          gap: 25px;
        }

        /* On screens wider than 768px, use 2 columns */
        @media (min-width: 768px) {
          .items-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}