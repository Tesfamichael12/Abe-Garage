import type { Metadata } from "next";
import { Bebas_Neue, Lato, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Providers from "@/components/Providers";
import AuthSync from "@/components/AuthSync";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import "./fonts/flaticon.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Abe Garage - Expert Vehicle Repair & Management",
  description:
    "Abe Garage offers top-tier vehicle repair and maintenance services. Our modern management system provides secure, role-based access for employees and a seamless experience for customers. Schedule your next service with us!",
  keywords: [
    "Abe Garage",
    "Abe's Garage",
    "vehicle repair",
    "car maintenance",
    "auto shop",
    "mechanic services",
    "employee management",
    "customer management",
    "order management",
    "admin dashboard",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "secure authentication",
    "role-based access",
    "vehicle service",
    "auto repair",
    "car service",
    "garage management system",
  ],
  authors: [{ name: "Tesfamichael Tafere" }],
  creator: "Tesfamichael Tafere",
  publisher: "Tesfamichael Tafere",
  robots: "index, follow",
  openGraph: {
    title: "Abe Garage - Expert Vehicle Repair & Management",
    description:
      "Your one-stop shop for reliable and professional vehicle services.",
    url: "https://abe-garage-one.vercel.app",
    siteName: "Abe Garage",
    images: [
      {
        url: "https://abe-garage-one.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abe Garage - Expert Vehicle Repair & Management",
    description:
      "From routine maintenance to complex repairs, Abe Garage has you covered. Check out our services!",
    creator: "@twitter_handle",
    images: ["https://abe-garage-one.vercel.app/twitter-image.png"],
  },
  metadataBase: new URL("https://abe-garage-one.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  verification: {
    google: "gC49N6EZqlBMqDVxi7Wz1tAamAlCA6FwNxC9Om5vvxg",
    yandex: "yandex-verification-code",
  },
  applicationName: "Abe Garage",
  appleWebApp: {
    capable: true,
    title: "Abe Garage",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/images/imgi_1_favicon.png" type="image/png" />
      </head>
      <body
        className={`${bebasNeue.variable} ${jost.variable} ${lato.variable} font-sans`}
      >
        <Providers>
          <AuthSync />
          <Toaster />
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
