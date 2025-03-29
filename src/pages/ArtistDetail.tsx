
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArtist, Artist, Event } from "@/lib/api";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { Music, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArtistDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchArtist(id);
        if (data) {
          setArtist(data);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
        toast({
          title: "Error",
          description: "Failed to load artist details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id, toast]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-300 h-12 w-12 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
      </>
    );
  }

  if (!artist) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Artist Not Found</h2>
          <p className="text-gray-600 mb-8">The artist you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/artists">Browse Artists</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Artist Header */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-96 w-full object-cover md:w-96" 
                  src={artist.imageUrl} 
                  alt={artist.name} 
                />
              </div>
              <div className="p-8 md:flex-1 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-sm text-event-primary font-semibold">
                  {artist.genre}
                </div>
                <h1 className="mt-2 text-4xl font-bold text-gray-900 leading-tight">
                  {artist.name}
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  {artist.bio}
                </p>
                
                {artist.upcomingEvents && artist.upcomingEvents.length > 0 && (
                  <div className="mt-6 flex items-center">
                    <Calendar className="h-5 w-5 text-event-primary mr-2" />
                    <span className="text-gray-700 font-medium">
                      {artist.upcomingEvents.length} upcoming event{artist.upcomingEvents.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          {artist.upcomingEvents && artist.upcomingEvents.length > 0 ? (
            <div>
              <div className="flex items-center mb-8">
                <Calendar className="h-8 w-8 text-event-primary mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artist.upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <Music className="h-12 w-12 text-event-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-600 mb-6">
                {artist.name} doesn't have any scheduled events at the moment.
              </p>
              <Button asChild>
                <Link to="/events">Browse Other Events</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistDetail;
