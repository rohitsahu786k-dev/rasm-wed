import { SiteSettings, BlogPost, Destination, MediaItem, MenuItem, WPPage } from '../types';

const WP_GRAPHQL_URL = 'https://rasmwed.com/graphql';
const WP_REST_URL = 'https://rasmwed.com/wp-json';

export async function fetchSiteData(): Promise<{
  settings: SiteSettings;
  posts: BlogPost[];
  media: MediaItem[];
  destinations: Destination[];
  menus: MenuItem[];
  pages: WPPage[];
}> {
  // Official user logo placed in /rasm-official-logo.png
  let settings: SiteSettings = {
    title: 'Rasm Wedding & Events',
    description: 'Premier Luxury Destination Wedding Architects in Udaipur & Rajasthan',
    url: 'https://rasmwed.com',
    logoUrl: '/rasm-official-logo.png',
    phone: '+91 98290 12345',
    whatsapp: '919829012345',
    email: 'ankitab890@gmail.com',
    address: 'Near Lake Pichola, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001',
    heroHeadline: 'Where Royal Heritage Meets Timeless Romance',
    heroSubheadline: 'Curating bespoke palatial celebrations across Udaipur, Jaipur, and iconic regal destinations for discerning couples worldwide.',
    instagramUrl: 'https://instagram.com/rasmwed',
    stats: {
      experience: '12+ Years',
      weddings: '450+ Curated',
      destinations: '18+ Palaces',
      satisfaction: '100% Bliss'
    }
  };

  let posts: BlogPost[] = [];
  let media: MediaItem[] = [];
  let menus: MenuItem[] = [];
  let pages: WPPage[] = [];

  // 1. Fetch Backend Pages
  try {
    const pagesRes = await fetch(`${WP_REST_URL}/wp/v2/pages?per_page=50`);
    if (pagesRes.ok) {
      const pData = await pagesRes.json();
      if (Array.isArray(pData)) {
        pages = pData.map((p: any) => ({
          id: p.id,
          title: p.title?.rendered || '',
          slug: p.slug,
          link: p.link,
          content: p.content?.rendered || ''
        }));
      }
    }
  } catch (err) {
    console.warn('Pages fetch warning:', err);
  }

  // 2. Fetch Backend Menus
  try {
    const menuRes = await fetch(`${WP_REST_URL}/wp/v2/menu-items?menus=4`);
    if (menuRes.ok) {
      const mData = await menuRes.json();
      if (Array.isArray(mData)) {
        menus = mData.map((m: any) => ({
          id: m.id,
          title: m.title?.rendered || '',
          url: m.url || '#',
          slug: m.url ? m.url.replace('https://rasmwed.com/', '').replace('/', '') : '',
          parent: m.parent || 0
        }));
      }
    }
  } catch (err) {
    console.warn('Menu items fetch warning:', err);
  }

  if (menus.length === 0 && pages.length > 0) {
    menus = [
      { id: 1, title: 'Destinations', url: '/wedding-destination', slug: 'wedding-destination' },
      { id: 2, title: 'Services', url: '/services', slug: 'services' },
      { id: 3, title: 'Gallery', url: '/gallery', slug: 'gallery' },
      { id: 4, title: 'About Us', url: '/about-us', slug: 'about-us' },
      { id: 5, title: 'Journal', url: '/blog', slug: 'blog' },
      { id: 6, title: 'Contact', url: '/contact-us', slug: 'contact-us' },
    ];
  }

  // 3. Fetch WPGraphQL Posts (Images WITH text are ONLY allowed in blogs)
  const GRAPHQL_QUERY = `
    query GetRasmData {
      generalSettings {
        title
        description
        url
      }
      posts(first: 10) {
        nodes {
          id
          title
          slug
          date
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const gqlRes = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      if (gqlData.data) {
        if (gqlData.data.generalSettings) {
          settings.title = gqlData.data.generalSettings.title || settings.title;
        }

        if (gqlData.data.posts?.nodes) {
          posts = gqlData.data.posts.nodes.map((node: any) => ({
            id: node.id,
            title: node.title,
            slug: node.slug,
            date: new Date(node.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            excerpt: node.excerpt ? node.excerpt.replace(/<[^>]*>?/gm, '').trim() : '',
            content: node.content || '',
            author: 'Rasm Editorial · Senior Wedding Architect',
            readTime: '6 min read',
            category: 'Royal Palaces & Destination Guides',
            featuredImageUrl: node.featuredImage?.node?.sourceUrl || 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg'
          }));
        }
      }
    }
  } catch (err) {
    console.warn('WPGraphQL fetch warning:', err);
  }

  // 4. Pure Real Wedding & Palatial Venue Photography (100% Text-Free Images from WordPress Media)
  media = [
    {
      id: 'm1',
      title: 'Sacred Vows by Lake Pichola',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
      altText: 'Vedic wedding vows by Lake Pichola',
    },
    {
      id: 'm2',
      title: 'Everlasting Vows & Pheras',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
      altText: 'Bride and groom during traditional rituals',
    },
    {
      id: 'm3',
      title: 'The Oberoi Udaivilas Grandeur',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
      altText: 'Iconic Mewar palatial architecture on Lake Pichola',
    },
    {
      id: 'm4',
      title: 'Jagmandir Island Palace Mandap',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
      altText: 'Waterfront palace mandap illuminated at dusk',
    },
    {
      id: 'm5',
      title: 'Palatial Floral Mandap Architecture',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
      altText: 'Bespoke royal mandap and floral scenography',
    },
    {
      id: 'm6',
      title: 'Royal Baraat & Palatial Entry',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
      altText: 'Grand Rajputana wedding procession and celebrations',
    },
    {
      id: 'm7',
      title: 'Royal Couple Portrait at The Palace',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
      altText: 'Bride and groom palatial celebration portrait',
    },
    {
      id: 'm8',
      title: 'Fateh Garh Hilltop Palace',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
      altText: 'Heritage palace overlooking Udaipur valley',
    },
    {
      id: 'm9',
      title: 'The Leela Palace Waterfront',
      sourceUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
      altText: 'Luxury lakefront palatial celebration setting',
    }
  ];

  // Destinations using ONLY clean, pure wedding & palatial photographs with NO text overlays!
  const destinations: Destination[] = [
    {
      id: 'udaipur',
      title: 'Udaipur, Rajasthan',
      slug: 'wedding-planner-in-udaipur',
      tagline: 'The City of Lakes · Iconic Royal Palaces',
      season: 'October to March',
      venues: 'The Oberoi Udaivilas, Taj Lake Palace, Jagmandir Island, The Leela Palace, Fateh Garh',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp'
    },
    {
      id: 'jaipur',
      title: 'Jaipur, Rajasthan',
      slug: 'wedding-planner-in-jaipur',
      tagline: 'The Pink City · Imperial Fortresses & Havelis',
      season: 'October to March',
      venues: 'Rambagh Palace, Fairmont Jaipur, Jai Mahal Palace, Samode Palace',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp'
    },
    {
      id: 'jodhpur-jaisalmer',
      title: 'Jodhpur & Jaisalmer',
      slug: 'wedding-planner-in-jodhpur',
      tagline: 'Sun City Grandeur & Golden Sand Dunes',
      season: 'November to February',
      venues: 'Umaid Bhawan Palace, Suryagarh, Ajit Bhawan, Fort Rajwada',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5217.webp'
    },
    {
      id: 'rishikesh',
      title: 'Rishikesh, Uttarakhand',
      slug: 'why-rishikesh-is-new-destination-wedding-hotspot',
      tagline: 'Soulful Riverside Vows on Sacred Ganga Ghats',
      season: 'September to April',
      venues: 'Taj Rishikesh, Aloha on the Ganges, Roseate Ganges, Divine Resort',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2026/04/download-50.jpg'
    },
    {
      id: 'goa',
      title: 'Goa Coastal Luxury',
      slug: 'wedding-planner-in-goa',
      tagline: 'Sun-kissed Coastal Mandaps & Oceanfront Soirees',
      season: 'November to February',
      venues: 'Grand Hyatt, W Goa, Alila Diwa, ITC Grand Goa, Caravela Beach Resort',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Goa.webp'
    },
    {
      id: 'mount-abu-nathdwara',
      title: 'Kumbhalgarh & Mount Abu',
      slug: 'wedding-planner-in-kumbhalgarh',
      tagline: 'Serene Aravali Hills & Ancient Mewar Fortress Solitude',
      season: 'Year-round Pleasant',
      venues: 'The Kumbha Bagh, Fateh Safari Lodge, Heritage Havelis Mount Abu',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Ananta-Udaipur.webp'
    },
    {
      id: 'thailand',
      title: 'Thailand International',
      slug: 'wedding-planner-in-thailand',
      tagline: 'Tropical Luxury Palaces & Beachfront Villas',
      season: 'November to April',
      venues: 'Sri Panwa Phuket, The Sarojin Khao Lak, Four Seasons Koh Samui',
      imageUrl: 'https://rasmwed.com/wp-content/uploads/2024/08/Thailand.webp'
    }
  ];

  return { settings, posts, media, destinations, menus, pages };
}
