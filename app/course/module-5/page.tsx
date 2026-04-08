'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Module5Page() {
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
        <div className="text-sm text-blue-400 mb-2">Module 5</div>
        <h1 className="text-4xl font-bold mb-10">Comparative Analysis &amp; Decision Framework</h1>

        <div className="space-y-8">
          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Performance Metrics</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-2 text-slate-400 font-medium">Platform</th>
                    <th className="text-left py-2 text-slate-400 font-medium">TPS</th>
                    <th className="text-left py-2 text-slate-400 font-medium">Finality</th>
                    <th className="text-left py-2 text-slate-400 font-medium">Fees</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 divide-y divide-slate-700">
                  {[
                    ['Bitcoin', '~7', '60 min', 'Medium'],
                    ['Ethereum (L1)', '~15', '12 sec', 'Variable'],
                    ['Ethereum + Rollup', '1,000+', '1-7 days', 'Low'],
                    ['Hedera', '10,000+', '3-5 sec', 'Very Low'],
                    ['IOTA', 'Unlimited*', 'Variable', 'Zero'],
                    ['Holochain', 'Agent-local', 'Instant', 'None'],
                  ].map(([platform, tps, finality, fees]) => (
                    <tr key={platform}>
                      <td className="py-2 font-medium text-white">{platform}</td>
                      <td className="py-2">{tps}</td>
                      <td className="py-2">{finality}</td>
                      <td className="py-2">{fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">*IOTA throughput scales with network participation</p>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Security Models</h2>
            <div className="space-y-3">
              {[
                { name: 'Blockchain (PoW)', model: '51% attack resistance — requires majority hash power. Most battle-tested.' },
                { name: 'Blockchain (PoS)', model: '33% Byzantine tolerance via validator stake slashing. Capital-efficient.' },
                { name: 'Hashgraph', model: 'Asynchronous BFT — tolerates up to 1/3 malicious nodes, proven mathematically.' },
                { name: 'Holochain', model: 'DHT-based — local validation with cryptographic signing; no global attack surface.' },
                { name: 'DAG (IOTA)', model: 'Network activity-dependent — sparse networks historically required coordinator.' },
              ].map(s => (
                <div key={s.name} className="bg-slate-700 rounded p-3">
                  <div className="text-sm font-semibold text-white mb-1">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.model}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Decentralization vs Efficiency</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              The <strong className="text-white">trilemma</strong> (decentralization, security, scalability — pick two) is fundamental to DLT design:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-700 rounded p-3 text-center">
                <div className="text-blue-400 font-bold mb-1">Bitcoin</div>
                <div className="text-xs text-slate-400">Max decentralization + security, sacrifices scalability</div>
              </div>
              <div className="bg-slate-700 rounded p-3 text-center">
                <div className="text-blue-400 font-bold mb-1">Hedera</div>
                <div className="text-xs text-slate-400">Max security + scalability, reduced decentralization</div>
              </div>
              <div className="bg-slate-700 rounded p-3 text-center">
                <div className="text-blue-400 font-bold mb-1">Holochain</div>
                <div className="text-xs text-slate-400">Sidesteps trilemma with agent-centric model entirely</div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Energy Consumption</h2>
            <div className="space-y-2">
              {[
                { name: 'Bitcoin (PoW)', level: 100, label: 'Very High (~130 TWh/yr)', color: 'bg-red-600' },
                { name: 'Ethereum pre-Merge', level: 60, label: 'High (~80 TWh/yr)', color: 'bg-orange-600' },
                { name: 'Ethereum post-Merge', level: 5, label: 'Very Low (~0.01 TWh/yr)', color: 'bg-green-600' },
                { name: 'Hedera', level: 3, label: 'Minimal', color: 'bg-green-600' },
                { name: 'Holochain', level: 2, label: 'Minimal (local only)', color: 'bg-green-600' },
                { name: 'IOTA', level: 2, label: 'Minimal (no mining)', color: 'bg-green-600' },
              ].map(e => (
                <div key={e.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{e.name}</span>
                    <span className="text-slate-500 text-xs">{e.label}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded">
                    <div className={`h-2 rounded ${e.color}`} style={{ width: `${e.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Use Case Selection Framework</h2>
            <div className="space-y-3">
              {[
                { q: 'Need maximum censorship resistance?', a: 'Bitcoin or Ethereum L1 — highest decentralization' },
                { q: 'Building IoT / microtransaction app?', a: 'IOTA Tangle — feeless, scales with activity' },
                { q: 'Enterprise with compliance requirements?', a: 'Hedera Hashgraph or permissioned blockchain' },
                { q: 'Community / privacy-first application?', a: 'Holochain — agent-centric, local data control' },
                { q: 'High-throughput DeFi protocol?', a: 'Ethereum + ZK-Rollup for security + scale' },
                { q: 'Multi-chain interoperability needed?', a: 'Polkadot or Cosmos ecosystem' },
              ].map(item => (
                <div key={item.q} className="bg-slate-700 rounded p-3">
                  <div className="text-sm font-semibold text-blue-300 mb-1">{item.q}</div>
                  <div className="text-sm text-slate-300">→ {item.a}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Case Studies</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Cross-Border Financial Settlement',
                  content: 'Ripple (XRP Ledger) processes payments between banks in 3-5 seconds vs SWIFT\'s 2-5 days, reducing correspondent banking costs by ~60%.',
                },
                {
                  title: 'Supply Chain Provenance',
                  content: 'Walmart uses a Hyperledger Fabric blockchain to trace food origin in seconds vs days, enabling faster recalls and reducing contamination risk.',
                },
                {
                  title: 'Digital Identity',
                  content: 'Microsoft ION (built on Bitcoin) provides decentralized identifiers (DIDs) enabling self-sovereign identity without a central registry.',
                },
                {
                  title: 'Voting Systems',
                  content: 'Utah County piloted blockchain-based mobile voting (Voatz) in 2019; research highlighted trade-offs between accessibility and auditability.',
                },
              ].map(cs => (
                <div key={cs.title} className="border-l-2 border-blue-500 pl-4">
                  <div className="font-semibold text-white mb-1">{cs.title}</div>
                  <div className="text-sm text-slate-400">{cs.content}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Course Complete!</h2>
            <p className="text-slate-300">You&apos;ve completed all 5 modules of the DLT Masterclass. You now have a comprehensive understanding of distributed ledger technologies and how to choose the right architecture for any use case.</p>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <Link href="/course/module-4" className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white rounded">
            ← Previous Module
          </Link>
          <Link href="/dashboard" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
