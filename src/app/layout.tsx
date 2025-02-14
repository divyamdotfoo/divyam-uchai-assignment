import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "UCHAI Assginment",
  description: "Created by divyam",
};

// Added sidebar in the layout component to make it accessible from all pages.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <div className=" w-full h-full flex items-stretch shrink-0">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
