
import Container from "@/components/layout/Container";
import "./globals.css";
import { Boldonse, Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-geist-next",
});

const boldonse = Boldonse({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-boldonse-next",
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth h-full`}
      data-scroll-behavior="smooth"
    >
      <body className={`min-h-full max-w-lg m-auto bg-black ${geist.variable} ${boldonse.variable}`}> 
        <Container>{children}</Container>
      </body>
    </html>
  );
}
