import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GodEye - IP Location Tracker",
  description: "Discover your IP location with GodEye - Created by kappasutra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
          <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
            Created with ❤️ by <a href="https://github.com/kappasutra" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors">kappasutra</a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
