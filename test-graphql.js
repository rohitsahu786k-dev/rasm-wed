const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic cmFzbXdlZC5jb206U1BvbiBNa3lBIElobE4gV1ZrVSBZV0x3IG5uRVc='
};

const query = `
  query GetSiteData {
    generalSettings {
      title
      description
      url
    }
    mediaItems(first: 6) {
      nodes {
        id
        title
        sourceUrl
        altText
      }
    }
    posts(first: 6) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

async function test() {
  const res = await fetch('https://rasmwed.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
