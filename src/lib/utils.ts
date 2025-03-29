
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeStr: string) {
  // Simple time formatter
  return timeStr;
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getImageUrl(name: string) {
  // Map artist names to image URLs (could be extended)
  const artistImages: Record<string, string> = {
    "Travis Scott": "https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_600/Travis%20Scott.jpg",
    "Seedhe Maut": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/SeedheMaut.jpg/330px-SeedheMaut.jpg",
    "The Weeknd": "https://media.pitchfork.com/photos/5a8991d5a466b4177dcc8131/1:1/w_600/weeknd.jpg",
    "Arijit Singh": "https://rollingstoneindia.com/wp-content/uploads/2022/10/Arijit-Singh-3.jpg",
    "Diljit Dosanjh": "https://media.vogue.in/wp-content/uploads/2023/05/diljit-square.jpg"
  };
  
  return artistImages[name] || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9";
}

export function getRandomGradient() {
  // Array of gradient styles for visual variety
  const gradients = [
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-teal-500",
    "bg-gradient-to-r from-indigo-500 to-purple-500",
    "bg-gradient-to-r from-pink-500 to-orange-500",
    "bg-gradient-to-r from-yellow-500 to-pink-500",
    "bg-gradient-to-r from-green-500 to-blue-500",
    "bg-gradient-to-r from-red-500 to-purple-500"
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
}
