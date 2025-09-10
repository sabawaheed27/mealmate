"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded mb-4">
      ← Back
    </button>
  );
}
