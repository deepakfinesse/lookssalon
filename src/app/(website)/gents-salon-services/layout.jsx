export const metadata = {
  title: "Looks Salon",
  description:"Looks Salon",
  
  alternates: {
    canonical: "/gents-salon-services",
  },

//   openGraph: {
//     title: "Looks",
//     description:"Looks",
//     url: "https://www.immunebytes.com/gents-salon-services",
//     images: [
//       {
//         url: "https://www.immunebytes.com/img/logo.svg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },

//   twitter: {
//     title: "Looks Salon",
//     description:"Looks Salon",
//   },
};

export default function RootLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}