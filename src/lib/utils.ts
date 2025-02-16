import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

// gpt was working here

export function generateContainerColor() {
  // Generate a random hue but keep similar saturation and brightness to #443ae7
  const hue = Math.floor(Math.random() * 360); // Any hue around the color wheel

  // These values are picked to match the vibrance of #443ae7
  const saturation = Math.floor(Math.random() * (90 - 70) + 70); // High saturation like #443ae7
  const value = Math.floor(Math.random() * (90 - 70) + 70); // Good brightness like #443ae7

  const c = ((value / 100) * saturation) / 100;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = value / 100 - c;

  let r: number, g: number, b: number;
  if (hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return { bg: `#${toHex(r)}${toHex(g)}${toHex(b)}`, text: "#fff" };
}
