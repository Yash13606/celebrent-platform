
const API_URL = "https://api.eventsphere.com/api"; // This would be replaced with the actual backend URL

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
    title: "Circus Maxima",
    description: "Travis Scott's explosive live show comes to town with his Circus Maxima Tour, featuring spectacular visuals and energy.",
    date: "2025-10-18",
    time: "20:00",
    venue: "Madison Square Garden, New York",
    organizer: "Live Nation",
    artist: "Travis Scott",
    imageUrl: "https://imgs.search.brave.com/VNUeHgn7dy_oHCn1DdzfrRYoNwbUWLzMNImddBALlsY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzJlLzY4/LzIzLzJlNjgyMzMy/NDE5ZjcxNDU3NzFl/YWEyNjEyNWIwMTBi/LmpwZw",
    price: 120,
    capacity: 20000,
    registered: 15780
  },
  {
    id: "2",
    title: "NH7 Weekender",
    description: "Seedhe Maut brings their critically acclaimed album Nayaab to life with a full live band experience.",
    date: "2025-06-15",
    time: "19:30",
    venue: "Indira Gandhi Stadium, Delhi",
    organizer: "Azadi Records",
    artist: "Seedhe Maut",
    imageUrl: "https://imgs.search.brave.com/5O_7jBtzJvzkATnUjGZjywHOlnas6GrFF3dhoXM7d6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGlyZTRldmVudC5j/b20vYXBwcGFuZWwv/YXNzZXRzL2FydGlz/dGltYWdlL2FydGlz/dHBob3RvLzYtNjY0/ZGUwZmFhM2UyNi53/ZWJw",
    price: 80,
    capacity: 10000,
    registered: 8500
  },
  {
    id: "3",
    title: "After Hours Till Dawn",
    description: "The Weeknd's worldwide tour featuring songs from his After Hours and Dawn FM albums.",
    date: "2025-07-15",
    time: "21:00",
    venue: "SoFi Stadium, Los Angeles",
    organizer: "Live Nation",
    artist: "The Weeknd",
    imageUrl: "https://imgs.search.brave.com/yiptVqS7NdBaN4SaRT9OCZkoqjIuDJMRlxf8nn6eObY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YWZ0ZXItaG91cnMt/dGlsLWRhd24tMjAy/NS11cy10b3VyLWNv/bmZpcm1lZC12MC1w/MTdua2pwcGdjZ2Ux/LmpwZWc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9NDU4ZTA3MGQ0/ZjM1MjM3NmM1NjUx/NTgxNGExM2FkMWIy/ODFhZWJjMQ",
    price: 150,
    capacity: 70000,
    registered: 65000
  },
  {
    id: "4",
    title: "Arijit Singh Live",
    description: "India's leading vocalist Arijit Singh performs his greatest hits in an emotional live show.",
    date: "2025-08-10",
    time: "18:30",
    venue: "DY Patil Stadium, Mumbai",
    organizer: "BookMyShow Live",
    artist: "Arijit Singh",
    imageUrl: "https://imgs.search.brave.com/5UwB6mwIITEBciSUgP2gKbwXV-hQ5bjRI0winJpTi6w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vZHd6bXN2cDdm/L2ltYWdlL3VwbG9h/ZC9mX2F1dG8sd18x/MjgwL2NfY3JvcCxn/X2N1c3RvbS92MTc0/MTI0MjQ1NS9rY2xq/N3BjY3NiMnlmZHlw/MWsyYS5qcGc",
    price: 100,
    capacity: 40000,
    registered: 38000
  },
  {
    id: "5",
    title: "Dil-Luminati Tour",
    description: "Diljit Dosanjh brings his electrifying performance and Punjabi hits to the global stage.",
    date: "2025-09-20",
    time: "20:00",
    venue: "Rogers Arena, Vancouver",
    organizer: "Live Nation",
    artist: "Diljit Dosanjh",
    imageUrl: "https://imgs.search.brave.com/RwW6jJiYJYh6GNJG6SvjV4mwaDRxHgYPdlVTXIA6G4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVuamFiaWZyb250/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS9kaWxq/aXQtZG9zYW5qaC1k/aS1sbHVtaW5hdGku/anBn",
    price: 110,
    capacity: 15000,
    registered: 12000
  },
  {
    id: "6",
    title: "The Big Steppers Tour",
    description: "Kendrick Lamar's groundbreaking live show featuring tracks from 'Mr. Morale & The Big Steppers' and his classic hits.",
    date: "2025-11-05",
    time: "20:30",
    venue: "United Center, Chicago",
    organizer: "Live Nation",
    artist: "Kendrick Lamar",
    imageUrl: "https://imgs.search.brave.com/leIMWWj8CAKoL-YNBfTYRpkziXIMYrwZlmjF4IHDan0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmlsbGJvYXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNS9LZW5kcmlj/ay1MYW1hci0yMDIy/LWdsYXN0b25idXJ5/LWEtYmlsbGJvYXJk/LTgtMTU0OC5qcGc_/dz05NDImaD02MjMm/Y3JvcD0x",
    price: 135,
    capacity: 23000,
    registered: 19500
  }
];

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Travis Scott",
    imageUrl: "https://imgs.search.brave.com/VNUeHgn7dy_oHCn1DdzfrRYoNwbUWLzMNImddBALlsY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzJlLzY4/LzIzLzJlNjgyMzMy/NDE5ZjcxNDU3NzFl/YWEyNjEyNWIwMTBi/LmpwZw",
    genre: "Hip-Hop/Rap",
    bio: "Jacques Bermon Webster II, known professionally as Travis Scott, is an American rapper, singer, songwriter, and record producer. His musical style has been described as a fusion of traditional hip hop, lo-fi and ambient."
  },
  {
    id: "2",
    name: "Seedhe Maut",
    imageUrl: "https://imgs.search.brave.com/5O_7jBtzJvzkATnUjGZjywHOlnas6GrFF3dhoXM7d6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGlyZTRldmVudC5j/b20vYXBwcGFuZWwv/YXNzZXRzL2FydGlz/dGltYWdlL2FydGlz/dHBob3RvLzYtNjY0/ZGUwZmFhM2UyNi53/ZWJw",
    genre: "Hip-Hop/Rap",
    bio: "Seedhe Maut is a Delhi-based hip-hop duo composed of rappers Encore ABJ and Calm. They are known for their technical flows, wordplay, and storytelling abilities in both Hindi and English."
  },
  {
    id: "3",
    name: "The Weeknd",
    imageUrl: "https://imgs.search.brave.com/yiptVqS7NdBaN4SaRT9OCZkoqjIuDJMRlxf8nn6eObY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YWZ0ZXItaG91cnMt/dGlsLWRhd24tMjAy/NS11cy10b3VyLWNv/bmZpcm1lZC12MC1w/MTdua2pwcGdjZ2Ux/LmpwZWc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9NDU4ZTA3MGQ0/ZjM1MjM3NmM1NjUx/NTgxNGExM2FkMWIy/ODFhZWJjMQ",
    genre: "R&B/Pop",
    bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences."
  },
  {
    id: "4",
    name: "Arijit Singh",
    imageUrl: "https://imgs.search.brave.com/5UwB6mwIITEBciSUgP2gKbwXV-hQ5bjRI0winJpTi6w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vZHd6bXN2cDdm/L2ltYWdlL3VwbG9h/ZC9mX2F1dG8sd18x/MjgwL2NfY3JvcCxn/X2N1c3RvbS92MTc0/MTI0MjQ1NS9rY2xq/N3BjY3NiMnlmZHlw/MWsyYS5qcGc",
    genre: "Playback Singing",
    bio: "Arijit Singh is an Indian singer and music composer. He sings predominantly in Hindi and Bengali, but has also performed in various other Indian languages. He is the recipient of a National Award and six Filmfare Awards."
  },
  {
    id: "5",
    name: "Diljit Dosanjh",
    imageUrl: "https://imgs.search.brave.com/RwW6jJiYJYh6GNJG6SvjV4mwaDRxHgYPdlVTXIA6G4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVuamFiaWZyb250/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS9kaWxq/aXQtZG9zYW5qaC1k/aS1sbHVtaW5hdGku/anBn",
    genre: "Punjabi/Bollywood",
    bio: "Diljit Dosanjh is an Indian singer, actor, television presenter and social media personality who works in Punjabi and Hindi cinema. He is recognised as one of the leading artists in the Punjabi music industry."
  },
  {
    id: "6",
    name: "Kendrick Lamar",
    imageUrl: "https://imgs.search.brave.com/leIMWWj8CAKoL-YNBfTYRpkziXIMYrwZlmjF4IHDan0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmlsbGJvYXJkLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNS9LZW5kcmlj/ay1MYW1hci0yMDIy/LWdsYXN0b25idXJ5/LWEtYmlsbGJvYXJk/LTgtMTU0OC5qcGc_/dz05NDImaD02MjMm/Y3JvcD0x",
    genre: "Hip-Hop/Rap",
    bio: "Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer. He is widely recognized as one of the most influential rappers of his generation and has received numerous accolades, including 14 Grammy Awards, two American Music Awards, and a Pulitzer Prize for Music."
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

// Auth helpers for simulating backend authentication
export const mockRegisterUser = async (email: string, password: string): Promise<{ user: { email: string }, token: string }> => {
  // In a real backend, this would create a user in the database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { email },
        token: "mock-auth-token-" + Math.random().toString(36).substring(2)
      });
    }, 1000);
  });
};

export const mockLoginUser = async (email: string, password: string): Promise<{ user: { email: string }, token: string }> => {
  // Special admin case
  if (email === "admin@gmail.com" && password === "admin") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { email: "admin@gmail.com" },
          token: "mock-admin-token-" + Math.random().toString(36).substring(2)
        });
      }, 800);
    });
  }

  // In a real backend, this would verify credentials
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation
      if (email && password.length > 3) {
        resolve({
          user: { email },
          token: "mock-auth-token-" + Math.random().toString(36).substring(2)
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
