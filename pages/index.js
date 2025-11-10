// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout';
import MenuCategory from '../components/MenuCategory';
import Hero from '../components/Hero'; // 1. Import the new Hero
import { useState } from 'react'; // 2. Import useState

// This data-fetching function is perfect and DOES NOT need to change.
export async function getStaticProps() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  let groupedMenu = {}; 

  if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
    console.warn("Warning: NEXT_PUBLIC_STRAPI_API_URL not set. Using local fallback 'http://127.0.0.1:1337'.");
  }
  
  const apiUrl = `${strapiUrl}/api/menu-items?populate=*`;
  console.log(`Attempting to fetch data from: ${apiUrl}`);

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

  return {
    props: {
      groupedMenu,
    },
    revalidate: 10,
  };
}


// 3. THIS IS THE NEW HOME COMPONENT
export default function Home({ groupedMenu = {} }) {
  const categoryNames = Object.keys(groupedMenu);

  // Set the default active category to the first one in the list
  const [activeCategory, setActiveCategory] = useState(categoryNames[0] || null);

  return (
    <Layout>
      <Head>
        <title>Little Italy Pizza LV - Menu</title>
        <meta name="description" content="Bite Into Happiness! Pizzas, Pastas, Subs and more." />
      </Head>

      <div className="container">
        <Hero /> {/* 4. Add the Hero component here */}

        <main id="menu">
          {/* 5. This is the new Tab Navigation */}
          <div className="tabs-container">
            {categoryNames.map((category) => (
              <button
                key={category}
                className={`tab-button ${category === activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 6. This now only renders the one active category */}
          <div className="menu-content">
            {activeCategory ? (
              <MenuCategory
                name={activeCategory}
                items={groupedMenu[activeCategory]}
              />
            ) : (
              <h2 style={{ textAlign: 'center', color: '#555' }}>
                No menu items have been added yet.
              </h2>
            )}
          </div>
        </main>
      </div>

      {/* 7. We add styles for the new tab buttons */}
      <style jsx>{`
        .tabs-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
        }
        .tab-button {
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          background-color: #eee;
          border: 1px solid #ddd;
          border-radius: 30px; /* Pill shape */
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-button:hover {
          background-color: #ddd;
        }
        .tab-button.active {
          background-color: #d92027; /* Red */
          color: white;
          border-color: #d92027;
        }
      `}</style>
    </Layout>
  );
}