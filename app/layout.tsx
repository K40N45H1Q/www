import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground/GridBackground";
import Header from "@/components/Header/Header";
import RequestModalProvider from "@/components/RequestModal/RequestModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Building and Exterior Services",
  description:
    "Professional DOFF cleaning and fencing services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RequestModalProvider>
          <GridBackground />
          <Header />
          {children}
        </RequestModalProvider>
      </body>
    </html>
  );
}
