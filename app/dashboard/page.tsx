'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  hasPaid: boolean;
}

const modules = [
  { num: 1, title: 'Blockchain Fundamentals', desc: 'Blocks, chains, consensus, Bitcoin, Ethereum' },
  { num: 2, title: 'Directed Acyclic Graphs', desc: 'DAG topology, IOTA, Hedera Hashgraph' },
  { num: 3, title: 'Holochain & P2P Systems', desc: 'Agent-centric, DHTs, data validation' },
  { num: 4, title: 'Emerging Architectures', desc: 'Hybrid DLTs, Layer 2, future research' },
  { num: 5, title: 'Comparative Analysis', desc: 'Performance, security, use case framework' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
    setLoading(false);
  }, [router]);

  async function handleCheckout() {
    if (!user) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert('Failed to start checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem('user');
    router.push('/');
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-400">DLT Masterclass</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user.email}</span>
          <button onClick={handleSignOut} className="text-sm text-slate-300 hover:text-white border border-slate-600 px-4 py-2 rounded">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-10">Welcome back, {user.email}</p>

        {!user.hasPaid ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-3">Unlock the Course</h2>
            <p className="text-slate-400 mb-6">Get lifetime access to all 5 modules for a one-time payment.</p>
            <div className="text-4xl font-bold mb-6">$19.99</div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded py-3 font-semibold text-lg"
            >
              {checkoutLoading ? 'Redirecting...' : 'Pay $19.99'}
            </button>
            <p className="text-xs text-slate-500 mt-4">Secure payment via Stripe. One-time charge, no subscription.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6">Your Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map(mod => (
                <Link
                  key={mod.num}
                  href={`/course/module-${mod.num}`}
                  className="bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg p-6 block"
                >
                  <div className="text-sm text-blue-400 font-medium mb-1">Module {mod.num}</div>
                  <h3 className="text-lg font-semibold mb-2">{mod.title}</h3>
                  <p className="text-sm text-slate-400">{mod.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
