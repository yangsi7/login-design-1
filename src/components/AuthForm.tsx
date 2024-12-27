import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { Github, Mail, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full p-8 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-2xl glass-card">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      <p className="text-white/60 mb-8">
        {isSignUp
          ? 'Join us to start transcribing smarter'
          : 'Sign in to continue your transcription journey'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-black/20 border border-[var(--glass-border)] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-black/20 border border-[var(--glass-border)] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={clsx(
            'w-full py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium',
            'bg-gradient-to-r from-indigo-500 to-purple-500',
            'hover:from-indigo-400 hover:to-purple-400',
            'transition-all duration-300 ease-out',
            'shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {loading ? (
            'Processing...'
          ) : (
            <>
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#030303]/80 backdrop-blur-xl text-white/40">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleProviderSignIn(googleProvider)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-black/20 border border-[var(--glass-border)] text-white hover:bg-white/10 transition-all hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleProviderSignIn(githubProvider)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-black/20 border border-[var(--glass-border)] text-white hover:bg-white/10 transition-all hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <p className="mt-6 text-center text-white/40">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-white hover:text-purple-400 transition-colors"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </form>
    </div>
  );
}