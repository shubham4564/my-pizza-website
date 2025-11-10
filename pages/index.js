// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout'; // Import the Layout
import MenuCategory from '../components/MenuCategory';

// This function is perfect and does not need to change.
// This is your NEW, more robust function
// pages/index.js

// ... keep your 'import' statements at the top ...
// ... keep your 'Home' component at the bottom ...

// This is your NEW, highly-robust data fetching function
// This is the final version. It works both locally and on Vercel.
export async function getStaticProps() {
  
  // THIS IS THE FIX: We add a fallback to your local Strapi server
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  
  // This will just warn you locally, not log a scary error
  if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
    console.warn("Warning: NEXT_PUBLIC_STRAPI_API_URL not set. Using local fallback 'http://127.0.0.1:1337'.");
  }
  
  const apiUrl = `${strapiUrl}/api/menu-items?populate=*`;
  console.log(`Attempting to fetch data from: ${apiUrl}`);
  
  let groupedMenu = {}; // Start with an empty menu

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(`API fetch failed with status: ${res.status}`);
      throw new Error(`Failed to fetch API: ${res.status}`);
    }

    const jsonResponse = await res.json();
    const data = jsonResponse.data;

    if (data && Array.isArray(data)) {
      console.log(`Successfully fetched ${data.length} menu items.`);
      data.forEach((item) => {
        if (item) {
          const category = item.category || 'Other'; 
          if (!groupedMenu[category]) {
            groupedMenu[category] = [];
          }
          groupedMenu[category].push(item);
        }
      });
    } else {
      console.warn("API response was OK, but 'data' was not an array.");
    }
    
  } catch (error) {
    console.error("A critical error occurred in getStaticProps:", error.message);
  }

  // Always return the menu (even if it's empty) so the page can build
  return {
    props: {
      groupedMenu,
    },
    revalidate: 10,
  };
}

// ... keep your 'Home' component function ...

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