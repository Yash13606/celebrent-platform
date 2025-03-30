
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEvent, registerForEvent, Event } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Users, DollarSign, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import ScrollRevealContainer from "@/components/ScrollRevealContainer";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchEvent(id);
        if (data) {
          setEvent(data);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast({
          title: "Error",
          description: "Failed to load event details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, toast]);

  const handleRegister = async () => {
    if (!event || !currentUser) return;
    
    try {
      setIsRegistering(true);
      await registerForEvent(event.id, currentUser.uid);
      
      // Update local state to reflect registration
      setEvent({
        ...event,
        registered: (event.registered || 0) + 1
      });
      
      toast({
        title: "Success!",
        description: `You have successfully registered for ${event.title}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Error",
        description: "Failed to register for the event. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
      </>
    );
  }

  const percentageFilled = ((event.registered || 0) / event.capacity) * 100;
  const spotsLeft = event.capacity - (event.registered || 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealContainer>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Event Image Banner */}
              <div className="relative h-64 sm:h-96 bg-gray-300">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-3xl sm:text-4xl font-bold">{event.title}</h1>
                  <p className="text-lg mt-2 opacity-90">By {event.artist}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                {/* Event Details */}
                <ScrollRevealContainer direction="left" className="lg:col-span-2">
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-gray-700">{event.description}</p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-event-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p className="text-gray-600">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-event-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Time</h3>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-event-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Venue</h3>
                          <p className="text-gray-600">{event.venue}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-event-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Organizer</h3>
                          <p className="text-gray-600">{event.organizer}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </ScrollRevealContainer>

                {/* Registration Card */}
                <ScrollRevealContainer direction="right" delay={0.3}>
                  <Card className="p-6 sticky top-6">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-event-primary">{formatCurrency(event.price)}</h3>
                      <div className="text-sm mt-2 text-gray-500">per ticket</div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Capacity</span>
                        <span>{event.registered || 0} / {event.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${
                            percentageFilled > 80 ? 'bg-red-500' : 'bg-event-primary'
                          } h-2 rounded-full`}
                          style={{ width: `${percentageFilled}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-2 text-gray-500">
                        {spotsLeft > 0 
                          ? `${spotsLeft} spots left` 
                          : "Sold out"
                        }
                      </p>
                    </div>

                    <Button
                      className="w-full mb-4 bg-event-primary hover:bg-event-primary/90"
                      disabled={spotsLeft <= 0 || isRegistering || !currentUser}
                      onClick={handleRegister}
                    >
                      {isRegistering ? "Registering..." : "Register Now"}
                    </Button>

                    {!currentUser && (
                      <p className="text-sm text-center text-gray-500">
                        Please{" "}
                        <Link to="/login" className="text-event-primary hover:underline">
                          login
                        </Link>
                        {" "}to register for this event
                      </p>
                    )}

                    <div className="mt-6 border-t pt-6">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-event-primary" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-event-primary" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1 text-event-primary" />
                        <span>Non-refundable</span>
                      </div>
                    </div>
                  </Card>
                </ScrollRevealContainer>
              </div>
            </div>
          </ScrollRevealContainer>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
