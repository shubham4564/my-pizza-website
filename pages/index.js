// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout'; // Import the Layout
import MenuCategory from '../components/MenuCategory';

// This function is perfect and does not need to change.
// This is your NEW, more robust function
export async function getStaticProps() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  
  let groupedMenu = {}; // Start with an empty object

  try {
    const res = await fetch(`${strapiUrl}/api/menu-items?populate=*`);
    
    // Check if the server responded OK (status 200)
    if (!res.ok) {
      throw new Error(`Failed to fetch API: ${res.status}`);
    }

    const { data } = await res.json();

    // **THIS IS THE FIX**
    // We check if data is a valid array before trying to loop it.
    if (data && Array.isArray(data)) {
      data.forEach((item) => {
        // We also check if the item and its attributes exist
        if (item && item.attributes) {
          const category = item.attributes.category || 'Other'; // Default to 'Other' if no category
          if (!groupedMenu[category]) {
            groupedMenu[category] = [];
          }
          groupedMenu[category].push(item);
        }
      });
    }
    
  } catch (error) {
    // If the fetch fails (e.g., Render app is asleep), log the error
    // and just return an empty menu.
    console.error("Error in getStaticProps:", error.message);
    // groupedMenu will remain {}, so the page won't crash.
  }

  // Always return props, even if empty
  return {
    props: {
      groupedMenu,
    },
    revalidate: 10, // Re-check every 10 seconds
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