'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      user.hasPaid = true;
      localStorage.setItem('user', JSON.stringify(user));
    }

    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-slate-400 mb-6">You now have lifetime access to all DLT Masterclass modules.</p>
        <p className="text-sm text-slate-500 mb-8">Redirecting to your dashboard in 3 seconds...</p>
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
          Go to Dashboard Now
        </Link>
      </div>
    </main>
  );
}
