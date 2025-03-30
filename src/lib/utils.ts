
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
  // Format time with proper AM/PM
  try {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  } catch (error) {
    // Return original if parsing fails
    return timeStr;
  }
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getImageUrl(name: string) {
  // Map artist names to image URLs with our updated images
  const artistImages: Record<string, string> = {
    "Travis Scott": "https://imgs.search.brave.com/PBMfoCrCi_FUcZQmazY9ws8wTc1bVVISzdyDNejNB6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZlL2Ni/LzY2L2ZlY2I2NjE0/YzM0YTIyMDYwYmIx/OWY1MTAyNGExMzY3/LmpwZw",
    "Seedhe Maut": "https://imgs.search.brave.com/5O_7jBtzJvzkATnUjGZjywHOlnas6GrFF3dhoXM7d6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGlyZTRldmVudC5j/b20vYXBwcGFuZWwv/YXNzZXRzL2FydGlz/dGltYWdlL2FydGlz/dHBob3RvLzYtNjY0/ZGUwZmFhM2UyNi53/ZWJw",
    "The Weeknd": "https://imgs.search.brave.com/yiptVqS7NdBaN4SaRT9OCZkoqjIuDJMRlxf8nn6eObY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YWZ0ZXItaG91cnMt/dGlsLWRhd24tMjAy/NS11cy10b3VyLWNv/bmZpcm1lZC12MC1w/MTdua2pwcGdjZ2Ux/LmpwZWc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9NDU4ZTA3MGQ0/ZjM1MjM3NmM1NjUx/NTgxNGExM2FkMWIy/ODFhZWJjMQ",
    "Arijit Singh": "https://imgs.search.brave.com/5UwB6mwIITEBciSUgP2gKbwXV-hQ5bjRI0winJpTi6w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vZHd6bXN2cDdm/L2ltYWdlL3VwbG9h/ZC9mX2F1dG8sd18x/MjgwL2NfY3JvcCxn/X2N1c3RvbS92MTc0/MTI0MjQ1NS9rY2xq/N3BjY3NiMnlmZHlw/MWsyYS5qcGc",
    "Diljit Dosanjh": "https://imgs.search.brave.com/RwW6jJiYJYh6GNJG6SvjV4mwaDRxHgYPdlVTXIA6G4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVuamFiaWZyb250/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS9kaWxq/aXQtZG9zYW5qaC1k/aS1sbHVtaW5hdGku/anBn",
    "Kendrick Lamar": "https://imgs.search.brave.com/leIMWWj8CAKoL-YNBfTYRpkziXIMYrwZlmjF4IHDan0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmlsbGJvYXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNS9LZW5kcmlj/ay1MYW1hci0yMDIy/LWdsYXN0b25idXJ5/LWEtYmlsbGJvYXJk/LTgtMTU0OC5qcGc_/dz05NDImaD02MjMm/Y3JvcD0x"
  };
  
  return artistImages[name] || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9";
}

export function getRandomGradient() {
  // Array of gradient styles for visual variety
  const gradients = [
    "bg-gradient-to-r from-purple-800 to-pink-600",
    "bg-gradient-to-r from-indigo-700 to-purple-600",
    "bg-gradient-to-r from-purple-700 to-indigo-900",
    "bg-gradient-to-r from-pink-600 to-purple-800",
    "bg-gradient-to-r from-violet-700 to-purple-800",
    "bg-gradient-to-r from-fuchsia-700 to-purple-700",
    "bg-gradient-to-r from-purple-600 to-indigo-800"
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
}

// Animation utility function to add delay
export function getAnimationDelay(index: number, baseDelay: number = 0.1) {
  return `${baseDelay * index}s`;
}

// Format currency in Rupees (₹)
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: (i = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scroll animation variants
export const scrollReveal = {
  hidden: { opacity: 0, y: 75 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: 0.1
    }
  }
};

// Generate random ticket number for events
export function generateTicketNumber() {
  const prefix = "ES";
  const randomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}${randomNumbers}`;
}

// Format remaining time for event countdown
export function formatTimeRemaining(targetDate: string): string {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - now.getTime();
  
  if (diffTime <= 0) {
    return 'Event has started';
  }
  
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  } else {
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
  }
}
