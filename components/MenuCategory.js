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
    </section>
  );
}