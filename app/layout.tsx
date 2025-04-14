import type { Metadata } from "next";
import { Inter, Roboto, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";
import { ThemeProvider } from "../context/ThemeContext";
// Fix the import to match the actual file name (case sensitive)
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ["latin"] });
const poppins = Poppins({ weight: ['400', '500', '700'], subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

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
      <body className="dark:bg-[#161916] light:bg-sunrise-white">
        <ThemeProvider>
          <div className="flex">
            <Sidebar />
            <div className="ml-64 flex-1">
              <Header />
              <main className="dark:bg-[#161916] light:bg-sunrise-white">
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