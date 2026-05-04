export const metadata = {
  title: "Looks Salon ",
  description:"Looks Salon",
  
  alternates: {
    canonical: "/gents-salon-services",
  },

//   openGraph: {
//     title: "Looks",
//     description:"Looks",
//     url: "https://www.immunebytes.com/about",
//     images: [
//       {
//         url: "https://www.immunebytes.com/img/logo.svg",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },

//   twitter: {
//     title: "About ImmuneBytes | Blockchain Security Audit Firm",
//     description:"Learn about ImmuneBytes, a leading smart contract audit firm for blockchain security, Web3 security, and penetration testing services for DeFi and NFT projects.",
//   },
};

export default function RootLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}