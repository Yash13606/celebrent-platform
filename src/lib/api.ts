
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
    date: "2025-10-18", // Updated to October 18, 2025
    time: "20:00",
    venue: "Madison Square Garden, New York",
    organizer: "Live Nation",
    artist: "Travis Scott",
    imageUrl: "https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_600/Travis%20Scott.jpg",
    price: 120,
    capacity: 20000,
    registered: 15780
  },
  {
    id: "2",
    title: "Nayaab Live Experience",
    description: "Seedhe Maut brings their critically acclaimed album Nayaab to life with a full live band experience.",
    date: "2025-06-15", // Updated to after May 2025
    time: "19:30",
    venue: "Indira Gandhi Stadium, Delhi",
    organizer: "Azadi Records",
    artist: "Seedhe Maut",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/SeedheMaut.jpg/330px-SeedheMaut.jpg",
    price: 80,
    capacity: 10000,
    registered: 8500
  },
  {
    id: "3",
    title: "After Hours Till Dawn",
    description: "The Weeknd's worldwide tour featuring songs from his After Hours and Dawn FM albums.",
    date: "2025-07-15", // Updated to after May 2025
    time: "21:00",
    venue: "SoFi Stadium, Los Angeles",
    organizer: "Live Nation",
    artist: "The Weeknd",
    imageUrl: "https://media.pitchfork.com/photos/5a8991d5a466b4177dcc8131/1:1/w_600/weeknd.jpg",
    price: 150,
    capacity: 70000,
    registered: 65000
  },
  {
    id: "4",
    title: "Arijit Singh Live",
    description: "India's leading vocalist Arijit Singh performs his greatest hits in an emotional live show.",
    date: "2025-08-10", // Updated to after May 2025
    time: "18:30",
    venue: "DY Patil Stadium, Mumbai",
    organizer: "BookMyShow Live",
    artist: "Arijit Singh",
    imageUrl: "https://rollingstoneindia.com/wp-content/uploads/2022/10/Arijit-Singh-3.jpg",
    price: 100,
    capacity: 40000,
    registered: 38000
  },
  {
    id: "5",
    title: "Dil-Luminati Tour",
    description: "Diljit Dosanjh brings his electrifying performance and Punjabi hits to the global stage.",
    date: "2025-09-20", // Updated to after May 2025
    time: "20:00",
    venue: "Rogers Arena, Vancouver",
    organizer: "Live Nation",
    artist: "Diljit Dosanjh",
    imageUrl: "https://media.vogue.in/wp-content/uploads/2023/05/diljit-square.jpg",
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
    imageUrl: "https://www.rollingstone.com/wp-content/uploads/2022/05/kendrick-lamar-big-steppers-tour.jpg",
    price: 135,
    capacity: 23000,
    registered: 19500
  },
  {
    id: "7",
    title: "Karan Aujla: It Was All A Dream Tour",
    description: "Karan Aujla brings his chart-topping Punjabi hits to a massive arena production with special guests.",
    date: "2025-08-25",
    time: "19:00",
    venue: "Scotiabank Arena, Toronto",
    organizer: "Live Nation",
    artist: "Karan Aujla",
    imageUrl: "https://www.billboard.com/wp-content/uploads/2023/07/karan-aujla-2023-billboard-exclusive-1548.jpg",
    price: 95,
    capacity: 18000,
    registered: 15200
  }
];

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Travis Scott",
    imageUrl: "https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_600/Travis%20Scott.jpg",
    genre: "Hip-Hop/Rap",
    bio: "Jacques Bermon Webster II, known professionally as Travis Scott, is an American rapper, singer, songwriter, and record producer. His musical style has been described as a fusion of traditional hip hop, lo-fi and ambient."
  },
  {
    id: "2",
    name: "Seedhe Maut",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/SeedheMaut.jpg/330px-SeedheMaut.jpg",
    genre: "Hip-Hop/Rap",
    bio: "Seedhe Maut is a Delhi-based hip-hop duo composed of rappers Encore ABJ and Calm. They are known for their technical flows, wordplay, and storytelling abilities in both Hindi and English."
  },
  {
    id: "3",
    name: "The Weeknd",
    imageUrl: "https://media.pitchfork.com/photos/5a8991d5a466b4177dcc8131/1:1/w_600/weeknd.jpg",
    genre: "R&B/Pop",
    bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences."
  },
  {
    id: "4",
    name: "Arijit Singh",
    imageUrl: "https://rollingstoneindia.com/wp-content/uploads/2022/10/Arijit-Singh-3.jpg",
    genre: "Playback Singing",
    bio: "Arijit Singh is an Indian singer and music composer. He sings predominantly in Hindi and Bengali, but has also performed in various other Indian languages. He is the recipient of a National Award and six Filmfare Awards."
  },
  {
    id: "5",
    name: "Diljit Dosanjh",
    imageUrl: "https://media.vogue.in/wp-content/uploads/2023/05/diljit-square.jpg",
    genre: "Punjabi/Bollywood",
    bio: "Diljit Dosanjh is an Indian singer, actor, television presenter and social media personality who works in Punjabi and Hindi cinema. He is recognised as one of the leading artists in the Punjabi music industry."
  },
  {
    id: "6",
    name: "Kendrick Lamar",
    imageUrl: "https://www.rollingstone.com/wp-content/uploads/2022/05/kendrick-lamar-big-steppers-tour.jpg",
    genre: "Hip-Hop/Rap",
    bio: "Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer. He is widely recognized as one of the most influential rappers of his generation and has received numerous accolades, including 14 Grammy Awards, two American Music Awards, and a Pulitzer Prize for Music."
  },
  {
    id: "7",
    name: "Karan Aujla",
    imageUrl: "https://www.billboard.com/wp-content/uploads/2023/07/karan-aujla-2023-billboard-exclusive-1548.jpg",
    genre: "Punjabi",
    bio: "Karan Aujla is an Indian-Canadian singer, rapper and songwriter primarily associated with Punjabi music. He is known for his hit singles and collaborations with international artists, bringing Punjabi music to global audiences."
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
