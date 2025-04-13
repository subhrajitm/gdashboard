import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";
import { ThemeProvider } from "../context/ThemeContext";
// Fix the import to match the actual file name (case sensitive)
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genpact Dashboard",
  description: "Dashboard for Genpact performance metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-midnight light:bg-[#FFFAF4]">
        <ThemeProvider>
          <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1">
              <Header />
              <main className="dark:bg-midnight light:bg-[#FFFAF4]">
                {children}
              </main>
            </div>
          </div>
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  )
}