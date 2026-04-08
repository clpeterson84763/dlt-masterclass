'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Module4Page() {
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
        <div className="text-sm text-blue-400 mb-2">Module 4</div>
        <h1 className="text-4xl font-bold mb-10">Emerging &amp; Hybrid Architectures</h1>

        <div className="space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Hashgraph Consensus</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Hashgraph uses <strong className="text-white">&quot;gossip about gossip&quot;</strong> — nodes don&apos;t just share transactions, they share the history of who told them what and when. This metadata allows the network to reconstruct a complete picture of information propagation.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Using this history, nodes perform <strong className="text-white">virtual voting</strong>: they mathematically calculate what other nodes would have voted, reaching Byzantine Fault Tolerant consensus without actual vote messages — drastically reducing bandwidth.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The result is <strong className="text-white">asynchronous BFT consensus</strong> — provably the strongest form of distributed consensus, achieved at enterprise-grade throughput.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Lattice-Based Systems</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong className="text-white">Lattice structures</strong> represent a promising research direction where partial ordering of events (rather than total ordering) enables conflict-free concurrent updates.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Systems like <strong className="text-white">CRDT (Conflict-free Replicated Data Types)</strong> use algebraic lattice properties to merge divergent states without coordination — ideal for eventually-consistent distributed applications.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Nano (formerly RaiBlocks) uses a <strong className="text-white">block lattice</strong> where each account has its own blockchain, enabling feeless, instant transactions through delegated proof-of-stake voting.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Hybrid Approaches</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Modern DLT systems increasingly combine multiple paradigms. <strong className="text-white">Hybrid blockchains</strong> blend public transparency with private permissioned access, allowing enterprises to control data visibility while leveraging decentralized security.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Some systems use <strong className="text-white">DAG + Blockchain hybrids</strong>: a DAG handles high-frequency microtransactions while periodic blockchain checkpoints provide finality and security anchoring.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-white">Polkadot</strong> and <strong className="text-white">Cosmos</strong> enable interoperability between heterogeneous chains — creating ecosystems of specialized blockchains connected by relay or hub chains.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Sidechains and Layer 2 Solutions</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong className="text-white">Layer 2 solutions</strong> process transactions off the main chain while inheriting its security. Types include:
            </p>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li><strong className="text-white">Optimistic Rollups</strong> (Arbitrum, Optimism): batch transactions and submit compressed proofs, assuming validity unless challenged</li>
              <li><strong className="text-white">ZK-Rollups</strong> (StarkNet, zkSync): use zero-knowledge proofs to cryptographically guarantee transaction validity</li>
              <li><strong className="text-white">State Channels</strong> (Lightning Network): bilateral off-chain channels for high-frequency peer interactions</li>
              <li><strong className="text-white">Plasma</strong>: child chains with fraud proofs for dispute resolution</li>
            </ul>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Future Research Directions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { area: 'Post-Quantum Cryptography', detail: 'Lattice-based signatures resistant to quantum computers' },
                { area: 'Sharding', detail: 'Partitioning the network for linear scalability' },
                { area: 'Verifiable Delay Functions', detail: 'Unpredictable randomness for fair consensus' },
                { area: 'Threshold Signatures', detail: 'Multi-party key management without central custody' },
                { area: 'Zero-Knowledge Proofs', detail: 'Privacy-preserving computation verification' },
                { area: 'AI + DLT', detail: 'Autonomous agents transacting on decentralized rails' },
              ].map(r => (
                <div key={r.area} className="bg-slate-700 rounded p-3">
                  <div className="text-sm font-semibold text-white mb-1">{r.area}</div>
                  <div className="text-xs text-slate-400">{r.detail}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/course/module-3" className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white rounded">
            ← Previous Module
          </Link>
          <Link href="/course/module-5" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Next Module →
          </Link>
        </div>
      </div>
    </main>
  );
}
