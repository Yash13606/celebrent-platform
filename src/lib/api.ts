
const API_URL = "https://your-backend-url.com/api"; // This should be replaced with the actual backend URL

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  artist: string;
  imageUrl: string;
  price: number;
  capacity: number;
  registered?: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre: string;
  bio: string;
  upcomingEvents?: Event[];
}

// This is a mock API for frontend development
// In a real app, this would connect to your backend

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Astroworld Tour",
    description: "Travis Scott's explosive live show comes to town with his Astroworld Tour, featuring spectacular visuals and energy.",
    date: "2023-12-20",
    time: "20:00",
    venue: "Madison Square Garden, New York",
    organizer: "Live Nation",
    artist: "Travis Scott",
    imageUrl: "https://images.unsplash.com/photo-1576702438167-5341a7aac28b?q=80&w=2592&auto=format&fit=crop",
    price: 120,
    capacity: 20000,
    registered: 15780
  },
  {
    id: "2",
    title: "Nayaab Live Experience",
    description: "Seedhe Maut brings their critically acclaimed album Nayaab to life with a full live band experience.",
    date: "2023-12-25",
    time: "19:30",
    venue: "Indira Gandhi Stadium, Delhi",
    organizer: "Azadi Records",
    artist: "Seedhe Maut",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2670&auto=format&fit=crop",
    price: 80,
    capacity: 10000,
    registered: 8500
  },
  {
    id: "3",
    title: "After Hours Till Dawn",
    description: "The Weeknd's worldwide tour featuring songs from his After Hours and Dawn FM albums.",
    date: "2024-01-15",
    time: "21:00",
    venue: "SoFi Stadium, Los Angeles",
    organizer: "Live Nation",
    artist: "The Weeknd",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop",
    price: 150,
    capacity: 70000,
    registered: 65000
  },
  {
    id: "4",
    title: "Arijit Singh Live",
    description: "India's leading vocalist Arijit Singh performs his greatest hits in an emotional live show.",
    date: "2024-02-10",
    time: "18:30",
    venue: "DY Patil Stadium, Mumbai",
    organizer: "BookMyShow Live",
    artist: "Arijit Singh",
    imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2672&auto=format&fit=crop",
    price: 100,
    capacity: 40000,
    registered: 38000
  },
  {
    id: "5",
    title: "Dil-Luminati Tour",
    description: "Diljit Dosanjh brings his electrifying performance and Punjabi hits to the global stage.",
    date: "2024-02-28",
    time: "20:00",
    venue: "Rogers Arena, Vancouver",
    organizer: "Live Nation",
    artist: "Diljit Dosanjh",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2670&auto=format&fit=crop",
    price: 110,
    capacity: 15000,
    registered: 12000
  }
];

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Travis Scott",
    imageUrl: "https://images.unsplash.com/photo-1576702438167-5341a7aac28b?q=80&w=2592&auto=format&fit=crop",
    genre: "Hip-Hop/Rap",
    bio: "Jacques Bermon Webster II, known professionally as Travis Scott, is an American rapper, singer, songwriter, and record producer. His musical style has been described as a fusion of traditional hip hop, lo-fi and ambient."
  },
  {
    id: "2",
    name: "Seedhe Maut",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2670&auto=format&fit=crop",
    genre: "Hip-Hop/Rap",
    bio: "Seedhe Maut is a Delhi-based hip-hop duo composed of rappers Encore ABJ and Calm. They are known for their technical flows, wordplay, and storytelling abilities in both Hindi and English."
  },
  {
    id: "3",
    name: "The Weeknd",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop",
    genre: "R&B/Pop",
    bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences."
  },
  {
    id: "4",
    name: "Arijit Singh",
    imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2672&auto=format&fit=crop",
    genre: "Playback Singing",
    bio: "Arijit Singh is an Indian singer and music composer. He sings predominantly in Hindi and Bengali, but has also performed in various other Indian languages. He is the recipient of a National Award and six Filmfare Awards."
  },
  {
    id: "5",
    name: "Diljit Dosanjh",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2670&auto=format&fit=crop",
    genre: "Punjabi/Bollywood",
    bio: "Diljit Dosanjh is an Indian singer, actor, television presenter and social media personality who works in Punjabi and Hindi cinema. He is recognised as one of the leading artists in the Punjabi music industry."
  }
];

// Mock API functions for events
export const fetchEvents = async (): Promise<Event[]> => {
  // In a real app, this would be:
  // const response = await fetch(`${API_URL}/events`);
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 500);
  });
};

export const fetchEvent = async (id: string): Promise<Event | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents.find(event => event.id === id)), 500);
  });
};

export const createEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
  const newEvent = {
    ...eventData,
    id: Date.now().toString(),
    registered: 0
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(newEvent), 500);
  });
};

export const registerForEvent = async (eventId: string, userId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

// Mock API functions for artists
export const fetchArtists = async (): Promise<Artist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockArtists), 500);
  });
};

export const fetchArtist = async (id: string): Promise<Artist | undefined> => {
  const artist = mockArtists.find(artist => artist.id === id);
  if (artist) {
    // Add upcoming events for this artist
    artist.upcomingEvents = mockEvents.filter(event => event.artist === artist.name);
  }
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(artist), 500);
  });
};
