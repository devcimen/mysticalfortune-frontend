"use client";

import { useState } from 'react';
import AuthPopup from './components/AuthPopup';

export default function StartPage() {
    const [isAuthOpen, setAuthOpen] = useState(false);

    return (
        <div className="w-screen h-screen bg-cover bg-center flex justify-center items-center overflow-hidden"
            style={{ backgroundImage: "url('/images/start.webp')" }}>
            {/* Overlay */}
            <div className="text-center">
                <button 
                    className="px-8 py-4 bg-white bg-opacity-20 text-white text-2xl font-bold rounded-lg hover:bg-opacity-40 transition-all"
                    onClick={() => setAuthOpen(true)}
                >
                    Start Game
                </button>
                <AuthPopup isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
            </div>
        </div>
    );
}
