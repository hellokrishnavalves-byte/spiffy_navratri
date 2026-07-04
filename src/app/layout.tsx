import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Spiffy Clothing & Jewellery | Custom Navratri Chaniya Choli",
  description:
    "Custom designer Navratri chaniya choli & jewellery. Any size, any design, any color. By Bhoomi Panchal, Ahmedabad.",
  keywords: [
    "Navratri",
    "chaniya choli",
    "garba outfit",
    "custom chaniya",
    "Navratri jewellery",
    "Bhoomi Panchal",
    "Spiffy Clothing",
    "Navratri 2026",
  ],
  authors: [{ name: "Bhoomi Panchal" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FDF6EC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased`}
        style={{
          fontFamily: "var(--font-poppins), -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#FDF6EC",
          color: "#2C1810",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}