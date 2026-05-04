import { useEffect, useState } from 'react';

export default function Instagram({ posts = [] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures media is rendered only after hydration
  }, []);

  return (
    <div className="instagram-wrapper">
      {posts.length === 0 ? (
        // <p></p>
        <p>No posts found or there was an error fetching them.</p>
      ) : (
        <div className="instagram-grid">
          {posts.map((post) => (
            <div className="instagram-item" key={post.id}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isClient && post.media_type === 'VIDEO' ? (
                  <div className="video-wrapper">
                    <img
                      src={post.thumbnail_url}  // Use media_url as the thumbnail
                      alt="Video thumbnail"
                      className="video-thumbnail"
                    />
                    {/* <video muted playsInline loop src={post.media_url}>
                      <source src={post.media_url} type="video/mp4" />
                    </video> */}
                    <div className="play-overlay">&#9658;</div>
                  </div>
                ) : isClient ? (
                  <img
                    src={post.media_url}
                    alt="Instagram post"
                    className="instagram-img"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#eee' }} />
                )}
              </a>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .instagram-wrapper {
          padding-bottom: 0px;
        }

        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .instagram-item {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 8px;
        }

        .instagram-item a {
          display: block;
          width: 100%;
          height: 100%;
        }

        .instagram-img,
        .video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-thumbnail {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1rem;
          color: white;
          pointer-events: none;
          text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 991px) {
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 767px) {
          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}



















// "use client"
// import React, { useEffect } from 'react';
// const Instagram = () => {
//   useEffect(() => {
//     // Dynamically create a script tag
//     const script = document.createElement('script');
//     script.src = '//www.instagram.com/embed.js';
//     script.async = true;
//     script.defer = true;
    
//     // Append the script tag to the body
//     document.body.appendChild(script);

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
    
      
//       <div 
//         dangerouslySetInnerHTML={{ 
//           __html: `
//             <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/looksunisexsalon/" data-instgrm-version="13" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:calc(100% - 2px); width:-webkit-calc(100% - 2px);">
//               <div style="padding:16px;">
//                 <a href="https://www.instagram.com/looksunisexsalon/" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">A post shared by Instagram</a>
//               </div>
//             </blockquote>
//           `
//         }}
//       />
   
//   );
// };

// export default Instagram;
