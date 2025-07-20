import type { Metadata } from "next";
import { Bebas_Neue, Jost, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Providers from "@/components/Providers";
import AuthSync from "@/components/AuthSync";
import { Toaster } from "react-hot-toast";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Abe Garage",
  description: "Abe Garage is a car repair shop that provides quality services",
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
        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/flaticon.css"
        ></link>
      </head>
      <body
        className={`${bebasNeue.variable} ${jost.variable} ${lato.variable} font-sans`}
      >
        <Providers>
          <AuthSync />
          <Toaster />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
