'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Module1Page() {
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
        <div className="text-sm text-blue-400 mb-2">Module 1</div>
        <h1 className="text-4xl font-bold mb-10">Blockchain Fundamentals</h1>

        <div className="space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">How Blockchain Works</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              A blockchain is a distributed ledger composed of a linked list of <strong className="text-white">blocks</strong>. Each block contains a set of transactions, a timestamp, and a cryptographic hash of the previous block, forming an immutable chain.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong className="text-white">Hashing</strong> ensures integrity: any change to a block alters its hash, invalidating all subsequent blocks. This makes tampering computationally infeasible without redoing the entire chain&apos;s proof-of-work.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-white">Immutability</strong> comes from consensus: thousands of nodes maintain identical copies, so altering history requires controlling &gt;50% of the network&apos;s hash power simultaneously.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Bitcoin&apos;s Proof-of-Work</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Bitcoin uses <strong className="text-white">Proof-of-Work (PoW)</strong> as its consensus mechanism. Miners compete to find a nonce value that, when hashed with the block data, produces a hash below a target difficulty threshold.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              This process — called <strong className="text-white">mining</strong> — requires enormous computational effort and energy. The first miner to solve the puzzle broadcasts the block; other nodes verify and append it to their chains.
            </p>
            <p className="text-slate-300 leading-relaxed">
              While PoW provides robust security, its <strong className="text-white">energy consumption</strong> is a major criticism. Bitcoin consumes electricity comparable to many small countries, spurring research into greener alternatives.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Ethereum and Smart Contracts</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Ethereum extended blockchain with <strong className="text-white">smart contracts</strong>: self-executing programs stored on-chain that run when predefined conditions are met. Written in Solidity, they enable trustless agreements without intermediaries.
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              The Ethereum Virtual Machine (EVM) executes these contracts on every node, ensuring deterministic, censorship-resistant execution.
            </p>
            <p className="text-slate-300 leading-relaxed">
              In 2022, Ethereum transitioned from PoW to <strong className="text-white">Proof-of-Stake (PoS)</strong> via &quot;The Merge,&quot; reducing energy consumption by ~99.95% while maintaining security through validator stake slashing.
            </p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Advantages and Limitations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-green-400 mb-2">Advantages</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Immutability — tamper-evident records</li>
                  <li>• Decentralization — no single point of failure</li>
                  <li>• Transparency — public auditability</li>
                  <li>• Security — cryptographic guarantees</li>
                  <li>• Trustless — eliminates intermediaries</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-400 mb-2">Limitations</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Scalability — low TPS (~7 for Bitcoin)</li>
                  <li>• Energy — PoW is resource-intensive</li>
                  <li>• Regulatory — uncertain legal landscape</li>
                  <li>• UX — complex key management</li>
                  <li>• Finality — probabilistic, not instant</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Real-World Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { domain: 'Financial Services', detail: 'Cross-border payments, DeFi lending, tokenized assets' },
                { domain: 'Supply Chain', detail: 'Provenance tracking, anti-counterfeiting, logistics' },
                { domain: 'Digital Identity', detail: 'Self-sovereign identity, credential verification' },
                { domain: 'Voting Systems', detail: 'Transparent, auditable election records' },
                { domain: 'Healthcare', detail: 'Patient record interoperability, drug traceability' },
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
          <Link href="/dashboard" className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white rounded">
            Back to Dashboard
          </Link>
          <Link href="/course/module-2" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Next Module →
          </Link>
        </div>
      </div>
    </main>
  );
}
