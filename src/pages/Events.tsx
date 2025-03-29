
import React, { useEffect, useState } from "react";
import { fetchEvents, Event } from "@/lib/api";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, CalendarDays, Search } from "lucide-react";

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistFilter, setArtistFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesArtist = artistFilter ? event.artist === artistFilter : true;
      
      return matchesSearch && matchesArtist;
    });
    
    setFilteredEvents(filtered);
  }, [searchTerm, artistFilter, events]);

  const artists = [...new Set(events.map(event => event.artist))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header - Now with animation */}
      <div className="bg-white shadow animate-fade-in">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <CalendarDays className="h-12 w-12 text-event-primary animate-pulse-slow" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Upcoming Events
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 animate-fade-in" style={{animationDelay: "0.4s"}}>
              Discover and register for exciting events featuring your favorite artists
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-fade-in" style={{animationDelay: "0.6s"}}>
        <div className="bg-white shadow rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="search" className="mb-2 block">Search Events</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by title, description or venue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="artist-filter" className="mb-2 block">Filter by Artist</Label>
              <Select value={artistFilter} onValueChange={setArtistFilter}>
                <SelectTrigger id="artist-filter">
                  <SelectValue placeholder="All Artists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Artists</SelectItem>
                  {artists.map(artist => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-event-primary" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="animate-fade-in hover-scale" style={{animationDelay: `${0.1 * index}s`}}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
