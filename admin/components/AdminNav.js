import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-center items-center gap-8 shadow-lg rounded-b-lg">
      <Link href="/admin"><span className="hover:text-blue-400 font-semibold transition-colors">Dashboard</span></Link>
      {/* Add more essential admin links here if needed */}
    </nav>
  );
}
