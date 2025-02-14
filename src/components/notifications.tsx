"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "./animated-icons/bell";
export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <BellIcon className=" w-6 h-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className=" flex items-center justify-center mt-2 bg-card h-72"
        align="end"
      >
        <p>No new notifications.</p>
      </PopoverContent>
    </Popover>
  );
}
