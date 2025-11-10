import "./globals.css";
import Link from "next/link";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "SuperCity — A Superhero Roguelike",
  description: "A web-based superhero roguelike built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 flex flex-col min-h-screen">
        {/* 🔹 Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900">
          <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
            SuperCity
          </Link>

          <nav className="flex space-x-6 text-gray-300">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
            <Link
              href="/game"
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              Play Game
            </Link>
          </nav>
        </header>

        {/* 🔹 Main Content */}
        <main className="grow px-6 py-8">{children}</main>

        {/* 🔹 Footer */}
        <footer className="border-t border-gray-800 bg-gray-900 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your Name — Built with Next.js + Tailwind
        </footer>
      </body>
    </html>
  );
}
