import Link from 'next/link';

const modules = [
  { title: 'Module 1: Blockchain Fundamentals', desc: 'Blocks, chains, consensus mechanisms, Bitcoin, Ethereum, and smart contracts.' },
  { title: 'Module 2: Directed Acyclic Graphs', desc: 'DAG topology, IOTA Tangle, Hedera Hashgraph, scalability advantages.' },
  { title: 'Module 3: Holochain & P2P Systems', desc: 'Agent-centric architecture, DHTs, intrinsic data validation, privacy.' },
  { title: 'Module 4: Emerging Architectures', desc: 'Lattice-based systems, hybrid approaches, Layer 2 solutions, future research.' },
  { title: 'Module 5: Comparative Analysis', desc: 'Performance metrics, security models, use case selection framework, case studies.' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-400">DLT Masterclass</span>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-slate-600 rounded">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Master Distributed Ledger Technologies
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          A comprehensive deep-dive into Blockchain, DAG, Holochain, and emerging DLT architectures. Built for developers and technologists.
        </p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">$19.99</span>
        </div>
        <p className="text-slate-400 mb-8">One-time payment. Lifetime access.</p>
        <Link href="/signup" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded text-lg font-semibold">
          Get Started Now
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">What You&apos;ll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-blue-400 mb-2">{mod.title}</h3>
              <p className="text-sm text-slate-400">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700 px-6 py-8 text-center text-slate-500 text-sm">
        <p>DLT Masterclass &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </main>
  );
}
