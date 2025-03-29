
import React from "react";
import { Link } from "react-router-dom";
import { Event } from "@/lib/api";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const percentageFilled = ((event.registered || 0) / event.capacity) * 100;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-event-primary hover:bg-event-primary/90">
            ${event.price}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2 text-event-primary" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2">
          <Clock className="h-4 w-4 mr-2 text-event-primary" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2">
          <MapPin className="h-4 w-4 mr-2 text-event-primary" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2">
          <Users className="h-4 w-4 mr-2 text-event-primary" />
          <span>{event.registered || 0} / {event.capacity}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-event-primary h-2 rounded-full" 
            style={{ width: `${percentageFilled}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/events/${event.id}`}
          className="w-full bg-event-primary text-white py-2 rounded-md text-center hover:bg-event-primary/90 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
