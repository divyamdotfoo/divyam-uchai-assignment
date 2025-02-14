import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Avatar() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className=" w-7 h-7 rounded-full flex items-center justify-center bg-blue-400 text-white">
          S
        </button>
      </PopoverTrigger>
      <PopoverContent
        className=" flex items-center justify-center bg-card border-borderCard mt-2 h-72"
        align="end"
      >
        <p>Basic user actions.</p>
      </PopoverContent>
    </Popover>
  );
}
