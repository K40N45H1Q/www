import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Building and Exterior Services",
  description:
    "Professional cleaning, modular construction, landscaping and fencing services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}