// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout'; // Import the Layout
import MenuCategory from '../components/MenuCategory';

// This function is perfect and does not need to change.
export async function getStaticProps() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  const res = await fetch(`${strapiUrl}/api/menu-items?populate=*`);
  const { data } = await res.json();

  const groupedMenu = {};
  data.forEach((item) => {
    const category = item.attributes.category;
    if (!groupedMenu[category]) {
      groupedMenu[category] = [];
    }
    groupedMenu[category].push(item);
  });

  return {
    props: {
      groupedMenu: groupedMenu || null, // Handle no data
    },
    revalidate: 10,
  };
}

// This is our new, cleaner page component
export default function Home({ groupedMenu = {} }) {
  const categoryNames = Object.keys(groupedMenu);

  return (
    <Layout> {/* We wrap everything in the Layout component */}
      <Head>
        <title>Little Italy Pizza LV - Menu</title>
        <meta name="description" content="Bite Into Happiness! Pizzas, Pastas, Subs and more." />
      </Head>

      <div className="container">
        {/* We can remove the old header, the Layout provides it now */}
        <main>
          {categoryNames.length > 0 ? (
            categoryNames.map((category) => (
              <MenuCategory
                key={category}
                name={category}
                items={groupedMenu[category]}
              />
            ))
          ) : (
            <h2>Loading menu...</h2>
          )}
        </main>
      </div>
    </Layout>
  );
}