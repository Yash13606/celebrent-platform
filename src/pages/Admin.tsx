
import React, { useEffect, useState } from "react";
import { fetchEvents, Event } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, PenLine, Trash2, Calendar, User, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/components/ui/use-toast";

const Admin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is an admin
    if (currentUser?.email !== "admin@example.com") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate, toast]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalAttendees = events.reduce((total, event) => total + (event.registered || 0), 0);
  const totalRevenue = events.reduce((total, event) => total + event.price * (event.registered || 0), 0);
  const averageCapacityFilled = events.length 
    ? (events.reduce((total, event) => total + ((event.registered || 0) / event.capacity), 0) / events.length) * 100
    : 0;

  const handleDeleteEvent = (eventId: string) => {
    // In a real application, this would call an API to delete the event
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
      variant: "default",
    });
  };

  const handleEditEvent = (eventId: string) => {
    // In a real application, this would navigate to an edit form
    toast({
      title: "Edit Event",
      description: "This functionality is not implemented in the demo.",
      variant: "default",
    });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-event-primary mr-2" />
                  <span className="text-3xl font-bold">{events.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Attendees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-event-primary mr-2" />
                  <span className="text-3xl font-bold">{totalAttendees}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-event-primary mr-2" />
                  <span className="text-3xl font-bold">${totalRevenue.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="events">
            <TabsList className="mb-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Events</CardTitle>
                  <CardDescription>
                    View and manage all events on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-event-primary" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Artist</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Attendees</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {events.map((event) => {
                            const eventDate = new Date(event.date);
                            const isUpcoming = eventDate >= new Date();
                            const percentageFilled = ((event.registered || 0) / event.capacity) * 100;
                            
                            return (
                              <TableRow key={event.id}>
                                <TableCell className="font-medium">{event.title}</TableCell>
                                <TableCell>{event.artist}</TableCell>
                                <TableCell>{formatDate(event.date)}</TableCell>
                                <TableCell>${event.price}</TableCell>
                                <TableCell>{event.registered || 0} / {event.capacity}</TableCell>
                                <TableCell>
                                  {isUpcoming ? (
                                    <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>
                                  ) : (
                                    <Badge variant="outline">Past</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleEditEvent(event.id)}
                                    >
                                      <PenLine className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleDeleteEvent(event.id)}
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="registrations">
              <Card>
                <CardHeader>
                  <CardTitle>Event Registrations</CardTitle>
                  <CardDescription>
                    View and manage all registrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-gray-600">
                      Registration details would appear here in a real application.
                    </p>
                    <p className="text-gray-600 mt-2">
                      This is a demo, so we're showing a placeholder.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    View event performance and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Average Capacity Filled</h3>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">{averageCapacityFilled.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div 
                          className="bg-event-primary h-2 rounded-full" 
                          style={{ width: `${averageCapacityFilled}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Revenue by Artist</h3>
                      <ul className="space-y-3">
                        {Array.from(new Set(events.map(event => event.artist))).map(artist => {
                          const artistEvents = events.filter(event => event.artist === artist);
                          const artistRevenue = artistEvents.reduce(
                            (total, event) => total + event.price * (event.registered || 0), 
                            0
                          );
                          
                          return (
                            <li key={artist} className="flex justify-between">
                              <span>{artist}</span>
                              <span className="font-medium">${artistRevenue.toFixed(2)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <p className="text-gray-600">
                      In a real application, this section would include charts and more detailed analytics.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
