
import React from "react";
import { Link } from "react-router-dom";
import { Event } from "@/lib/api";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const percentageFilled = ((event.registered || 0) / event.capacity) * 100;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border-gray-700 text-white">
      <div className="h-48 overflow-hidden relative group">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-purple-600 hover:bg-purple-700 animate-pulse-slow">
            {formatCurrency(event.price)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1 text-white group-hover:text-purple-300 transition-colors duration-300">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center text-sm mb-2 hover:text-purple-400 transition-colors group">
          <Calendar className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2 hover:text-purple-400 transition-colors group">
          <Clock className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2 hover:text-purple-400 transition-colors group">
          <MapPin className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
        
        <div className="flex items-center text-sm mb-2 hover:text-purple-400 transition-colors group">
          <Users className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          <span>{event.registered || 0} / {event.capacity}</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
          <div 
            className={`${
              percentageFilled > 80 ? 'bg-red-500' : 'bg-purple-600'
            } h-2 rounded-full transition-all duration-1000 ease-in-out`}
            style={{ width: `${percentageFilled}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 pt-4">
        <Link 
          to={`/events/${event.id}`}
          className="w-full bg-purple-600 text-white py-2 rounded-md text-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
