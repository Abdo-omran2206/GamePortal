"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-24 left-6 inline-flex items-center gap-2 text-white/80 hover:text-[#00C1FF] transition-colors group backdrop-blur-md px-4 py-2 rounded-full bg-black/20"
    >
      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
      Back to browse
    </button>
  );
}
