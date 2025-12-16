import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#161616] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* About */}
        <div>
          <Link href="/" className="inline-block">
            <h3 className="text-white font-bold text-2xl mb-4 tracking-tight">
              Game<span className="text-[#00C1FF]">Portal</span>
            </h3>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate destination for discovering and playing free games
            across multiple platforms. Stay updated, explore trending games, and
            join our community.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link
                href="/#about"
                className="hover:text-[#00C1FF] transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="hover:text-[#00C1FF] transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00C1FF] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#00C1FF] transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#00C1FF] transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#00C1FF] transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#00C1FF] transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#00C1FF] transition-colors"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-[#161616] pt-6 text-center text-gray-500 text-sm">
        © 2024 GamePortal. All rights reserved.
      </div>
    </footer>
  );
}
