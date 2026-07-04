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
  title: "Spiffy by Bhoomi Panchal | Custom Navratri Chaniya Choli & Jewellery",
  description:
    "Designer custom Navratri chaniya choli & jewellery. Any size, any design, any color. Handcrafted by Bhoomi Panchal. Order your perfect Garba look today!",
  keywords: [
    "Navratri",
    "chaniya choli",
    "garba outfit",
    "custom chaniya",
    "Navratri jewellery",
    "kundan jewellery",
    "Bhoomi Panchal",
    "Spiffy Clothing",
    "garba dress",
    "Navratri 2026",
  ],
  authors: [{ name: "Bhoomi Panchal" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
  openGraph: {
    title: "Spiffy by Bhoomi Panchal | Custom Navratri Chaniya Choli & Jewellery",
    description:
      "Designer custom Navratri chaniya choli & jewellery. Any size, any design, any color.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF9F0",
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
          fontFamily: "var(--font-poppins), sans-serif",
          background: "#FFF9F0",
          color: "#3D1A0A",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}