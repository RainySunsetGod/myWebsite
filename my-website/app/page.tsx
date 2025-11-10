import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] space-y-6">
      <h1 className="text-5xl font-bold text-blue-400">Welcome to SuperCity</h1>

      <p className="max-w-xl text-gray-300">
        SuperCity is a superhero roguelike adventure built with Next.js, React, and TypeScript.
        Explore procedurally generated cityscapes, unlock powers, and fight or commit crime  — right in your browser.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/game"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Play Game
        </Link>

        <Link
          href="/about"
          className="px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-black transition"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
