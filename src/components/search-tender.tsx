"use client";
import { Search } from "lucide-react";

export function SearchTender() {
  return (
    <div className="flex items-center bg-white gap-2 px-2 py-[2px] rounded-md focus-within:ring-1 border border-transparent focus-within:ring-amber-400 focus-within:border-amber-400 transition-all">
      <input
        className="bg-inherit h-7 w-[450px] border-none text-sm outline-none text-black placeholder:text-gray-500 placeholder:font-medium"
        placeholder="Search for Tenders"
      />
      <button>
        <Search size={20} className="text-background" />
      </button>
    </div>
  );
}
