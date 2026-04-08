'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Module2Page() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    const user = JSON.parse(stored);
    if (!user.hasPaid) { router.push('/dashboard'); return; }
    setReady(true);
  }, [router]);

  if (!ready) return <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><p className="text-slate-400">Loading...</p></main>;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-400">DLT Masterclass</Link>
        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white border border-slate-600 px-4 py-2 rounded">Dashboard</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-sm text-blue-400 mb-2">Module 2</div>
        <h1 className="text-4xl font-bold mb-10">Directed Acyclic Graphs (DAG)</h1>

        <div className="space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Understanding DAG Structure</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              A <strong className="text-white">Directed Acyclic Graph (DAG)</strong> is a graph data structure where edges have direction and no cycles exist. In DLT, each transaction (vertex) references one or more previous transactions, creating a web rather than a linear chain.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong className="text-white">Directed</strong> means edges flow in one direction — from newer to older transactions. <strong className="text-white">Acyclic</strong> means you cannot follow edges and return to your starting point, preserving temporal ordering.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This structure enables <strong className="text-white">parallel transaction processing</strong> — multiple transactions can be confirmed simultaneously rather than sequentially, dramatically increasing throughput.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">IOTA Tangle</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              IOTA&apos;s <strong className="text-white">Tangle</strong> is a DAG where each new transaction must validate two previous transactions before being accepted. This creates a self-reinforcing validation network.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              There are <strong className="text-white">no miners or validators</strong> — users validate the network by participating. This eliminates transaction fees entirely, making IOTA ideal for microtransactions and IoT machine-to-machine payments.
            </p>
            <p className="text-slate-300 leading-relaxed">
              As more participants join, the Tangle becomes faster and more secure — a virtuous cycle where adoption improves performance rather than degrading it.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Hedera Hashgraph</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Hedera uses a proprietary <strong className="text-white">Hashgraph consensus algorithm</strong> based on &quot;gossip about gossip&quot; and virtual voting. Nodes share information with random peers, spreading transaction data exponentially fast.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Hedera achieves <strong className="text-white">10,000+ TPS</strong> with finality in 3-5 seconds, compared to Bitcoin&apos;s ~7 TPS and 60-minute probabilistic finality.
            </p>
            <p className="text-slate-300 leading-relaxed">
              It is governed by a council of global enterprises (Google, IBM, Boeing) providing enterprise-grade stability, though this introduces a degree of <strong className="text-white">centralization</strong> relative to permissionless blockchains.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Advantages of DAG Architectures</h2>
            <ul className="text-slate-300 space-y-2">
              <li className="flex gap-3"><span className="text-green-400 font-bold">✓</span><span><strong className="text-white">Scalability:</strong> Throughput increases with network activity, not decreases</span></li>
              <li className="flex gap-3"><span className="text-green-400 font-bold">✓</span><span><strong className="text-white">Speed:</strong> Near-instant confirmation in mature networks</span></li>
              <li className="flex gap-3"><span className="text-green-400 font-bold">✓</span><span><strong className="text-white">Low/Zero Cost:</strong> No miner fees in participation-based models</span></li>
              <li className="flex gap-3"><span className="text-green-400 font-bold">✓</span><span><strong className="text-white">Energy Efficient:</strong> No energy-intensive mining process</span></li>
              <li className="flex gap-3"><span className="text-green-400 font-bold">✓</span><span><strong className="text-white">High Throughput:</strong> Parallel processing of non-conflicting transactions</span></li>
            </ul>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Challenges and Trade-offs</h2>
            <ul className="text-slate-300 space-y-2">
              <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span><span><strong className="text-white">Network Effects:</strong> Security and speed depend on sufficient activity — thin networks are vulnerable</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span><span><strong className="text-white">Complexity:</strong> DAG consensus is harder to reason about than linear chains</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span><span><strong className="text-white">Adoption:</strong> Fewer developer tools, libraries, and ecosystem support vs Ethereum</span></li>
              <li className="flex gap-3"><span className="text-red-400 font-bold">✗</span><span><strong className="text-white">Coordinator Dependency:</strong> IOTA initially relied on a centralized Coordinator for security</span></li>
            </ul>
          </section>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/course/module-1" className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white rounded">
            ← Previous Module
          </Link>
          <Link href="/course/module-3" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Next Module →
          </Link>
        </div>
      </div>
    </main>
  );
}
