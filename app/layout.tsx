import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";
import { ThemeProvider } from "../context/ThemeContext";
import Chatbot from "../components/Chatbot";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBot from '@/components/ChatBot';

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
      <body className="bg-[#0F100F] dark:bg-[#181C23] light:bg-[#FFFFFF]">
        <ThemeProvider>
          <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1">
              <Header />
              <main>
                {children}
              </main>
            </div>
          </div>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}