"use client"; // 👈 required

import GameCanvas from "@/components/GameCanvas";

export default function GamePage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                SuperCity — Prototype
            </h2>
            <GameCanvas />
        </div>
    );
}
