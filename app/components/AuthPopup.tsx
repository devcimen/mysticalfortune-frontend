"use client"; // Add this to mark the file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

export default function AuthPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in local storage
                localStorage.setItem('token', data.user.stsTokenManager.accessToken);
                // Navigate to the playground on successful login
                router.push('/playground');
            } else {
                setError('Invalid username or password');
            }
        } catch (e) {
            setError('Something went wrong. Please try again later.');
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-dark p-16 rounded-lg shadow-lg w-[90%] max-w-md text-center text-primary font-cinzel relative">
                <h2 className="text-white text-4xl mb-4">Welcome Back</h2>
                <p className="text-light text-xl mb-6">Please login to start the game</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 rounded bg-primary bg-opacity-20 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 rounded bg-primary bg-opacity-20 text-white focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-dark border-2 border-primary py-2 px-6 rounded text-white" type="button">
                            Sign Up
                        </button>
                        <button type="submit" className="bg-primary py-2 px-6 rounded text-white">
                            Login
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-light hover:text-white transition-colors"
                >
                    <AiOutlineClose size={24} />
                </button>
            </div>
        </div>
    );
}
