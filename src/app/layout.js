import Footer from "@/components/layout/Footer";
import "../styles/globals.css";
import Header from "@/components/layout/Header";

export const metadata = {
  metadataBase: new URL("http://localhost:3000/"),

  title: {
    default: "Lookssalon",
    template: "%s",
  },

  description: "Lookssalon",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "http://localhost:3000/",
    title: "Lookssalon",
    description: "Lookssalon",
    siteName: "Lookssalon",
    images: [
      {
        url: "http://localhost:3000/img/logo.svg",
        width: 1200,
        height: 630,
        alt: "Lookssalon",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@immunebytes",
    title: "Lookssalon",
    description: "Lookssalon",
    images: ["http://localhost:3000/img/logo.svg"],
  },
  // ✅ GSC Verification (BEST METHOD)
  // verification: {
  //   google: "YOUR_GSC_VERIFICATION_CODE",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/rlj0rkt.css"
        ></link>
        {/* Preconnect */}
        {/* <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />

        
        <link
          rel="preload"
          href="https://use.typekit.net/rlj0rkt.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/rlj0rkt.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/rlj0rkt.css" />
        </noscript> */}
      </head>
      <body className="font-primary">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
