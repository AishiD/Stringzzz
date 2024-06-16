import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Strings',
  description: 'A Next.js 13 Application'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar />
        <main className="flex flex-row">
          <LeftSidebar />

          <section className="main-container">
            <div className="w-full max-w-4xl">
              {children}
            </div>
          </section>
          <RightSidebar />
        </main>
        <Bottombar />
        </body>
    </html>
    </ClerkProvider>
  );
}
