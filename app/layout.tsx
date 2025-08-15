import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ProviderStore } from "@/store/Provider/ReduxProvider";
import Layout from "@/components/Layout/page";

const roboto = Roboto({
  weight: ["400", "500", "700"], // normal, medium, bold
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Trading Solutions | Real-Time Market Insights & Portfolio Management",
  description:
    "Empower your trading journey with Trading Solutions — real-time market data, AI-powered analytics, and secure portfolio management for stocks, forex, and crypto. Trade smarter today.",
  keywords: [
    "trading solutions",
    "stock market analytics",
    "forex trading",
    "crypto trading",
    "portfolio management",
    "real-time market data",
    "AI trading tools",
    "investment platform",
    "market insights",
    "algorithmic trading",
  ],

  openGraph: {
    title: "Trading Solutions | Real-Time Market Insights & Portfolio Management",
    description:
      "Get ahead in trading with real-time data, AI-powered analytics, and secure portfolio management tools for stocks, forex, and crypto.",
    // url: "https://your-domain.com",
    siteName: "Trading Solutions",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trading Solutions Dashboard",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Solutions | Real-Time Market Insights & Portfolio Management",
    description:
      "Your all-in-one platform for real-time market data, AI trading tools, and secure portfolio tracking.",
    // images: ["https://your-domain.com/og-image.jpg"],
    creator: "@YourTwitterHandle",
  },
  // metadataBase: new URL("https://your-domain.com"),
  alternates: {
    // canonical: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <ProviderStore>
          <Layout>
            {children}
          </Layout>
        </ProviderStore>
      </body>
    </html>
  );
}
