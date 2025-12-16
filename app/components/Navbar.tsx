import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md fixed top-0 z-50 border-b border-white/5 transition-all duration-300">
      <Link href="/" className="group flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform">
          Game<span className="text-[#00C1FF]">Portal</span>
        </h1>
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {[
          ["Home", "/"],
          ["Games", "/Gameportal"],
          ["About", "/#about"],
          ["Contact", "/#contact"],
        ].map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-gray-300 hover:text-[#00C1FF] transition-colors font-medium text-sm border-b-2 border-transparent hover:border-[#00C1FF] py-1"
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/"
            className="bg-[#00C1FF]/10 text-[#00C1FF] px-4 py-2 rounded-full border border-[#00C1FF]/20 hover:bg-[#00C1FF] hover:text-black transition-all font-semibold text-sm block"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
