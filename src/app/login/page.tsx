'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    const handleOAuthLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        // TODO: Implement OAuth logic
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                <h1 className="text-xl font-bold mb-6 text-center text-red-700">Sign In</h1>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => handleOAuthLogin('Google')}
                        className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
                    >
                        <FcGoogle className="text-xl mr-2" />
                        Continue with Google
                    </button>
                    <button
                        onClick={() => handleOAuthLogin('Facebook')}
                        className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-blue-600"
                    >
                        <FaFacebookF className="text-xl mr-2" />
                        Continue with Facebook
                    </button>
                    <button
                        onClick={() => handleOAuthLogin('Apple')}
                        className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-black"
                    >
                        <FaApple className="text-xl mr-2" />
                        Continue with Apple
                    </button>
                </div>

                <div className="relative my-4">
                    <hr className="border-gray-300" />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400 text-sm">
                        OR
                    </span>
                </div>

                {/* Email Login */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-700 focus:border-red-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Don’t have an account?{' '}
                    <Link href="/register" className="text-red-700 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
