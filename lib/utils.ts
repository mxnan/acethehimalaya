import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (diffDays >= 7) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }
}


// export function formatDate(input: string | number): string {
//   const date = new Date(input);
//   const now = new Date();

//   if (isNaN(date.getTime())) return "";

//   let diffMs = Math.max(0, now.getTime() - date.getTime());
//   let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   const years = Math.floor(diffDays / 365);
//   diffDays -= years * 365;

//   const months = Math.floor(diffDays / 30);
//   diffDays -= months * 30;

//   const weeks = Math.floor(diffDays / 7);
//   diffDays -= weeks * 7;

//   const parts: string[] = [];

//   if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
//   if (months && parts.length < 2)
//     parts.push(`${months} month${months > 1 ? "s" : ""}`);
//   if (weeks && parts.length < 2)
//     parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
//   if (!parts.length && diffDays)
//     parts.push(`${diffDays} day${diffDays > 1 ? "s" : ""}`);

//   return `${parts.join(" ")} ago`;
// }
