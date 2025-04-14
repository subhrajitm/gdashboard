import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SettingsProvider } from "../context/SettingsContext";
import { AdminProvider } from "../context/AdminContext";
import ChatBot from "../components/Chatbot";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Customizable Dashboard Framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <AdminProvider>
            <ThemeProvider>
              <div className="flex">
                <Sidebar />
                <div className="ml-64 flex-1">
                  <Header />
                  <main className="dark:bg-midnight light:bg-sunrise-white">
                    {children}
                  </main>
                </div>
              </div>
              <ChatBot />
            </ThemeProvider>
          </AdminProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}