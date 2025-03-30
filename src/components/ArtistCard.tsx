
import React from "react";
import { Link } from "react-router-dom";
import { Artist } from "@/lib/api";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 text-white">
        <div className="h-60 overflow-hidden relative group">
          <motion.img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white text-xl font-bold group-hover:text-purple-300 transition-colors duration-300">{artist.name}</h3>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="pt-6 flex-grow">
          <Badge className="mb-3 bg-purple-600 hover:bg-purple-700 transition-colors duration-300">{artist.genre}</Badge>
          <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-white transition-colors duration-300">{artist.bio}</p>
          
          {artist.upcomingEvents && artist.upcomingEvents.length > 0 && (
            <motion.div 
              className="mt-4 transform transition-all duration-300 hover:translate-x-1"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-sm font-medium text-white">Upcoming Events</span>
              </div>
              <p className="text-sm text-gray-400">
                {artist.upcomingEvents.length} upcoming show{artist.upcomingEvents.length > 1 ? 's' : ''}
              </p>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-gray-700 pt-4">
          <Link 
            to={`/artists/${artist.id}`}
            className="w-full bg-purple-600 text-white py-2 rounded-md text-center hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
          >
            View Artist
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ArtistCard;
