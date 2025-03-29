
import React from "react";
import { Link } from "react-router-dom";
import { Artist } from "@/lib/api";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-60 overflow-hidden relative">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{artist.name}</h3>
        </div>
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <Badge className="mb-3 bg-event-primary hover:bg-event-primary/90">{artist.genre}</Badge>
        <p className="text-muted-foreground text-sm line-clamp-3">{artist.bio}</p>
        
        {artist.upcomingEvents && artist.upcomingEvents.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-event-primary" />
              <span className="text-sm font-medium">Upcoming Events</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {artist.upcomingEvents.length} upcoming show{artist.upcomingEvents.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/artists/${artist.id}`}
          className="w-full bg-event-primary text-white py-2 rounded-md text-center hover:bg-event-primary/90 transition-colors"
        >
          View Artist
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
