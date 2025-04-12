import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";
import Chatbot from "../components/Chatbot";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genpact Dashboard",
  description: "Dashboard for Genpact performance metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#161916] text-[#FFFAF4]`}>
        <NotificationProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <main className="p-6 pt-4">
                {children}
              </main>
            </div>
          </div>
          <Chatbot />
        </NotificationProvider>
      </body>
    </html>
  );
}