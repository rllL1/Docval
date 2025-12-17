'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend logic removed
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Side - Blurred Background */}
      <div className="hidden lg:flex lg:w-3/5 relative items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-80 blur-3xl"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/12.png"
            alt="Background Logo"
            width={1500}
            height={1500}
            className="opacity-50 blur-sm"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center px-6 sm:px-12 py-12 bg-white relative">
        <div className="w-full max-w-md relative z-10">
          {/* Top Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/12.png"
              alt="DICt Logo"
              width={120}
              height={120}
              priority
            />
          </div>

          {/* DES Title */}
          <h1
            className="text-center text-5xl font-black text-blue-950 mb-8 tracking-wider"
            style={{
              letterSpacing: '0.15em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              fontFamily: "'Arial', 'Helvetica', sans-serif",
            }}
          >
            DES
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="flex justify-center mt-12">
            <Image
              src="/Pilipns.png"
              alt="Bagong Pilipinas Logo"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
