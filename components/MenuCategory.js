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
          /* This creates a responsive grid that automatically adjusts the number of columns
             based on the available width. Each item will be at least 300px wide. */
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      `}</style>
    </section>
  );
}