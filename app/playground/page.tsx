"use client";

import { useState } from "react";

const reels = [
    ['rune', 'radiant', 'scrolls', 'book', 'arcane', 'sorceress', 'ring', 'radiantelf', 'elvenwarrior', 'divinewings', 'angelgirl', 'sacredlight'],
    ['rune', 'radiant', 'scrolls', 'book', 'arcane', 'sorceress', 'ring', 'radiantelf', 'elvenwarrior', 'divinewings', 'angelgirl', 'sacredlight'],
    ['rune', 'radiant', 'scrolls', 'book', 'arcane', 'sorceress', 'ring', 'radiantelf', 'elvenwarrior', 'divinewings', 'angelgirl', 'sacredlight'],
    ['rune', 'radiant', 'scrolls', 'book', 'arcane', 'sorceress', 'ring', 'radiantelf', 'elvenwarrior', 'divinewings', 'angelgirl', 'sacredlight'],
    ['rune', 'radiant', 'scrolls', 'book', 'arcane', 'sorceress', 'ring', 'radiantelf', 'elvenwarrior', 'divinewings', 'angelgirl', 'sacredlight']
];

export default function Playground() {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(reels);
    const [payout, setPayout] = useState(0);

    // Handle the spin button click
    const handleSpin = async () => {
        setSpinning(true);

        setTimeout(async () => {

            // Simulate spinning
            const response = await fetch("http://localhost:5000/api/game/play", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ betAmount: 100 }),
            });

            const data = await response.json();

            // Set the result
            setResult(data.result);
            setPayout(data.payout + data.miniPayout);
            setSpinning(false);

        }, 3000);
    };

    return (
        <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/playground.webp')" }}>
            <div className="flex justify-center items-center h-full">
                <div className="bg-black bg-opacity-50 w-[800px] h-[400px] relative">
                    {/* Reels */}
                    <div className="grid grid-cols-5 gap-4 p-8">
                        {result.map((reel, index) => (
                            <div key={index} className="bg-black bg-opacity-25 p-2 rounded-lg text-center">
                                {spinning
                                    ? "Spinning..." // Show spinning text while the animation is happening
                                    : reel.map((symbol, i) => (
                                        <div key={i} className="mb-2">
                                            <img src={`/images/symbols/${symbol}.webp`} alt={symbol} className="w-16 h-16 mx-auto" />
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Spin and Bet UI */}
            <div className="absolute bottom-10 w-full flex justify-center">
                <button
                    onClick={handleSpin}
                    disabled={spinning}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-80 transition-all"
                >
                    {spinning ? "Spinning..." : "Spin"}
                </button>
            </div>

            {/* Display payout */}
            <div className="absolute top-10 right-10 text-white font-bold text-2xl">
                Payout: {payout}
            </div>
        </div>
    );
}
