'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Module3Page() {
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
        <div className="text-sm text-blue-400 mb-2">Module 3</div>
        <h1 className="text-4xl font-bold mb-10">Holochain &amp; P2P Distributed Systems</h1>

        <div className="space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Agent-Centric Architecture</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Traditional blockchains are <strong className="text-white">ledger-centric</strong>: all participants share one global state. Holochain is <strong className="text-white">agent-centric</strong>: each participant maintains their own local chain of actions, signed with their private key.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              There is no global consensus requirement. Instead, agents share data selectively using a <strong className="text-white">Distributed Hash Table (DHT)</strong>, and validation occurs locally according to the application&apos;s rules.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This enables <strong className="text-white">infinite scalability</strong> — each new user adds capacity to the network rather than consuming it, since they host their own data.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">DHT (Distributed Hash Tables)</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Holochain uses a <strong className="text-white">sharded DHT</strong> to distribute data across the network. When an agent publishes data, it&apos;s automatically replicated to a subset of nodes based on cryptographic address proximity.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              DHT neighbors validate incoming data against the application&apos;s defined rules before accepting it. This creates <strong className="text-white">distributed validation</strong> without requiring all nodes to process all transactions.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The result: each node only stores and validates a fraction of network data, making storage and computation requirements manageable even at massive scale.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Intrinsic Data Validation</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Every Holochain application defines its own <strong className="text-white">validation rules</strong> as WebAssembly code. When data is published to the DHT, validators run these rules locally — no external consensus oracle required.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Each agent&apos;s actions are <strong className="text-white">cryptographically signed</strong>, creating an unforgeable audit trail. Validators can verify authorship and rule compliance without trusting any central authority.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Invalid data is rejected at the DHT level and never propagated, providing security without a global consensus bottleneck.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Privacy Advantages</h2>
            <ul className="text-slate-300 space-y-2">
              <li className="flex gap-3"><span className="text-blue-400">→</span><span><strong className="text-white">Local-First:</strong> Data lives on your device by default; sharing is explicit and controlled</span></li>
              <li className="flex gap-3"><span className="text-blue-400">→</span><span><strong className="text-white">No Global Ledger:</strong> Transaction history isn&apos;t visible to all participants worldwide</span></li>
              <li className="flex gap-3"><span className="text-blue-400">→</span><span><strong className="text-white">Selective Disclosure:</strong> Share only what&apos;s necessary with specific peers</span></li>
              <li className="flex gap-3"><span className="text-blue-400">→</span><span><strong className="text-white">Key Sovereignty:</strong> Agents control their own cryptographic identity</span></li>
            </ul>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Applications and Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { domain: 'Supply Chain', detail: 'Track provenance locally, share selectively with partners' },
                { domain: 'Healthcare', detail: 'Patient-controlled medical records with provider access grants' },
                { domain: 'Local Communities', detail: 'Community currencies, time banks, mutual aid networks' },
                { domain: 'Social Networks', detail: 'Decentralized social media without surveillance capitalism' },
                { domain: 'Cooperative Tools', detail: 'DAOs, governance, resource-sharing applications' },
              ].map(uc => (
                <div key={uc.domain} className="bg-slate-700 rounded p-3">
                  <div className="text-sm font-semibold text-white mb-1">{uc.domain}</div>
                  <div className="text-xs text-slate-400">{uc.detail}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/course/module-2" className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white rounded">
            ← Previous Module
          </Link>
          <Link href="/course/module-4" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Next Module →
          </Link>
        </div>
      </div>
    </main>
  );
}
