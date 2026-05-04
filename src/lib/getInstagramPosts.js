// src/lib/getInstagramPosts.js

export async function getInstagramPosts() {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  const igBusinessId = process.env.NEXT_PUBLIC_INSTAGRAM_BUSINESS_ID;
  const API_URL = process.env.NEXT_PUBLIC_BLOG_URL;
  
  const url = `https://graph.facebook.com/v22.0/${igBusinessId}/media?fields=id,caption,media_url,thumbnail_url,permalink,media_type,timestamp&access_token=${accessToken}`;
console.log("Instagram API response:", igBusinessId);

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ✅ cache for 1 hour (important for Vercel free)
    });

    const data = await res.json();

    if (data.error) {
      console.error("Instagram API error:", data.error);
      return [];
    }

    return (data.data || []).slice(0, 9);
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
























// // src/lib/getInstagramPosts.js
// export async function getInstagramPosts() {
//     const accessToken = 'EAAT2zfJbFLYBRHiZAP7ZBDZAjhxA1HxbzHZAqyuwJQfaOPNWv8gmtGbPmA96G6niwSUjKkDGp1ypYG0FC0upVZCcx2HdWpnfOw9sntI063V4TPpd450fQlo18gvdLZCzeSjrYQV0q7oPbDaCzkIH5jS0vZCDftaZABUxZAg2UMQZBmgcfL3Ica7dZBMBqlrsgZDZD';
//     const igBusinessId = '17841400627170068';

  
//     const url = `https://graph.facebook.com/v22.0/${igBusinessId}/media?fields=id,caption,media_url,thumbnail_url,permalink,media_type,timestamp&access_token=${accessToken}`;
  
//     try {
//       const res = await fetch(url, { cache: 'no-store' }); // disables caching
//       const data = await res.json();
//       console.log('Instagram API response:', data);
  
//       if (data.error) {
//         console.error('Instagram API error:', data.error);
//         return [];
//       }
  
//       return (data.data || []).slice(0, 8); // only return first 8 posts
//     } catch (err) {
//       console.error('Fetch error:', err);
//       return [];
//     }
//   }
  

