import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
      <span className="font-serif text-xl tracking-tight">
        Job<span className="italic text-emerald-600">Craft</span> AI
      </span>
      <div className="flex items-center gap-7">
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          How it works
        </a>
        <a
          href="#features"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Features
        </a>
        <Link
          href="/upload"
          className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
