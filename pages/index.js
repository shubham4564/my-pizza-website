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
export async function getStaticProps() {
  
  // 1. Get the API URL from Vercel's environment variables
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  let groupedMenu = {}; // Start with an empty menu

  // 2. Check if the URL is even set
  if (!strapiUrl) {
    console.error("Error: NEXT_PUBLIC_STRAPI_API_URL is not set in Vercel.");
    return { props: { groupedMenu }, revalidate: 10 };
  }
  
  const apiUrl = `${strapiUrl}/api/menu-items?populate=*`;
  console.log(`Attempting to fetch data from: ${apiUrl}`);

  try {
    // 3. Try to fetch the data
    const res = await fetch(apiUrl);

    if (!res.ok) {
      // 4. If the server responds with an error (like 403, 404, 500)
      console.error(`API fetch failed with status: ${res.status}`);
      throw new Error(`Failed to fetch API: ${res.status}`);
    }

    // 5. If successful, parse the JSON
    const jsonResponse = await res.json();
    
    // 6. The data is in a property called 'data'
    const data = jsonResponse.data;

    // 7. Check if 'data' is a valid array
    if (data && Array.isArray(data)) {
      console.log(`Successfully fetched ${data.length} menu items.`);
      data.forEach((item) => {
        if (item) {
          // We read 'item.category' directly (no .attributes)
          const category = item.category || 'Other'; 
          if (!groupedMenu[category]) {
            groupedMenu[category] = [];
          }
          groupedMenu[category].push(item);
        }
      });
    } else {
      // 8. The API responded, but 'data' was not an array
      console.warn("API response was OK, but 'data' property was not an array.");
      console.warn("API Response:", jsonResponse);
    }
    
  } catch (error) {
    // 9. This catches network errors or JSON parsing errors
    console.error("A critical error occurred in getStaticProps:", error.message);
  }

  // 10. Always return the menu (even if it's empty) so the page can build
  return {
    props: {
      groupedMenu,
    },
    revalidate: 10, // Tell Vercel to re-fetch every 10 seconds
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