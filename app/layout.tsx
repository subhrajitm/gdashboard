import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SettingsProvider } from "../context/SettingsContext";
import { AdminProvider } from "../context/AdminContext";
import ChatBot from "../components/Chatbot";
import LayoutContent from "../components/LayoutContent";

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
              <LayoutContent>{children}</LayoutContent>
              <ChatBot />
            </ThemeProvider>
          </AdminProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}