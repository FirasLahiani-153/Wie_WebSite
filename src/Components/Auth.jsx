import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = ({ user, authInitialized }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  console.log('🎨 Auth component render - user:', user?.email || 'none');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Clear form on successful sign in
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  // Show loading state while initializing
  if (!authInitialized) {
    return (
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
        <div className="text-center text-white">Loading authentication...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="text-center mb-6 p-4 bg-white/10 backdrop-blur-lg rounded-lg">
        <p className="text-white mb-4">Welcome, {user.email}!</p>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/50 focus:outline-none"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white/50 focus:outline-none"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-medium rounded-lg transition-colors duration-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-white/80 hover:text-white underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;