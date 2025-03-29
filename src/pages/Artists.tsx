
import React, { useEffect, useState } from "react";
import { fetchArtists, Artist } from "@/lib/api";
import ArtistCard from "@/components/ArtistCard";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Loader2, Music, Search } from "lucide-react";

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchArtists();
        setArtists(data);
        setFilteredArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = artists.filter((artist) => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredArtists(filtered);
  }, [searchTerm, artists]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Music className="h-12 w-12 text-event-primary" />
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
              Featured Artists
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
              Discover upcoming events featuring these incredible performers
            </p>
          </div>
        </div>
      </div>
      
      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search artists by name or genre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Artist Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-event-primary" />
          </div>
        ) : filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-500">
              Try adjusting your search to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
