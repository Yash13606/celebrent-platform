
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents, fetchArtists, Event, Artist } from "@/lib/api";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import ArtistCard from "@/components/ArtistCard";
import Navbar from "@/components/Navbar";
import { Loader2, Music, CalendarDays, ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import ScrollRevealContainer from "@/components/ScrollRevealContainer";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [eventsData, artistsData] = await Promise.all([
          fetchEvents(),
          fetchArtists()
        ]);
        setEvents(eventsData.slice(0, 3));
        setArtists(artistsData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Animation */}
      <section className="relative bg-gradient-to-r from-event-dark to-event-primary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div 
          className="absolute inset-0 z-0 opacity-20" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop')", 
            backgroundSize: "cover",
            backgroundPosition: "center" 
          }}
        ></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-20 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Discover and Create Unforgettable Events
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Find the hottest shows, register for events, or create your own in minutes.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-event-primary hover:bg-white/90 transform transition-transform hover:scale-105"
              >
                <Link to="/events">Browse Events</Link>
              </Button>
              <Button 
                size="lg" 
                asChild
                variant="outline"
                className="text-white border-white hover:bg-white/10 transform transition-transform hover:scale-105"
              >
                <Link to="/create-event">Create Event</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealContainer>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <CalendarDays className="h-8 w-8 text-event-primary mr-3 animate-pulse-slow" />
                <h2 className="text-3xl font-bold text-event-dark">Featured Events</h2>
              </div>
              <Link to="/events" className="flex items-center text-event-primary hover:text-event-primary/80 transition-all hover:translate-x-1">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </ScrollRevealContainer>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-event-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <ScrollRevealContainer key={event.id} delay={0.2 * index} distance={30}>
                  <EventCard event={event} />
                </ScrollRevealContainer>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Travis Scott Feature Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-event-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollRevealContainer direction="left">
              <h2 className="text-4xl font-bold mb-4">Featuring Travis Scott</h2>
              <p className="text-white/90 mb-6">
                Don't miss the chance to see Travis Scott live in concert. His electrifying performances and chart-topping hits make this a must-see event.
              </p>
              <Button 
                asChild 
                className="bg-white text-event-primary hover:bg-white/90 transform transition hover:scale-105"
              >
                <Link to="/artists/travis-scott">View Details</Link>
              </Button>
            </ScrollRevealContainer>
            <ScrollRevealContainer direction="right" delay={0.3}>
              <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://imgs.search.brave.com/PBMfoCrCi_FUcZQmazY9ws8wTc1bVVISzdyDNejNB6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZlL2Ni/LzY2L2ZlY2I2NjE0/YzM0YTIyMDYwYmIx/OWY1MTAyNGExMzY3/LmpwZw" 
                  alt="Travis Scott" 
                  className="w-full h-auto"
                />
              </div>
            </ScrollRevealContainer>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealContainer>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <Music className="h-8 w-8 text-event-primary mr-3 animate-pulse-slow" />
                <h2 className="text-3xl font-bold text-event-dark">Featured Artists</h2>
              </div>
              <Link to="/artists" className="flex items-center text-event-primary hover:text-event-primary/80 transition-all hover:translate-x-1">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </ScrollRevealContainer>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-event-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artists.map((artist, index) => (
                <ScrollRevealContainer key={artist.id} delay={0.2 * index} distance={30}>
                  <ArtistCard artist={artist} />
                </ScrollRevealContainer>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Animated */}
      <section className="py-16 bg-event-primary text-white overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-event-primary to-event-accent opacity-80"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `pulse-slow ${Math.random() * 5 + 3}s infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollRevealContainer direction="up">
            <h2 className="text-3xl font-bold mb-6">Ready to host your own event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create and manage your events easily with our platform. Get started today!
            </p>
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-event-primary hover:bg-white/90 transform transition hover:scale-105"
            >
              <Link to="/create-event">Create Event</Link>
            </Button>
          </ScrollRevealContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-event-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Music className="h-8 w-8 text-event-primary" />
                <span className="ml-2 text-xl font-bold">EventSphere</span>
              </div>
              <p className="mt-4 max-w-xs text-gray-400">
                Discover and create unforgettable experiences with EventSphere.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
                  <li><Link to="/artists" className="text-gray-400 hover:text-white transition-colors">Artists</Link></li>
                  <li><Link to="/create-event" className="text-gray-400 hover:text-white transition-colors">Create Event</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Account</h3>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                  <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
                  <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Profile</Link></li>
                  <li><Link to="/my-events" className="text-gray-400 hover:text-white transition-colors">My Events</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">yashmarlecha13@gmail.com</li>
                  <li className="text-gray-400">+91 9176566969</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} EventSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
