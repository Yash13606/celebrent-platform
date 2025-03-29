
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  Menu, 
  User, 
  LogOut, 
  LogIn, 
  PlusCircle,
  Home,
  X,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <CalendarDays className="h-8 w-8 text-event-primary" />
              <span className="ml-2 text-xl font-bold text-event-dark">EventHub</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:text-event-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/events" className="border-transparent text-gray-500 hover:text-event-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Events
              </Link>
              <Link to="/artists" className="border-transparent text-gray-500 hover:text-event-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Artists
              </Link>
              {currentUser && (
                <Link to="/create-event" className="border-transparent text-gray-500 hover:text-event-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Create Event
                </Link>
              )}
              {currentUser?.email === "admin@example.com" && (
                <Link to="/admin" className="border-transparent text-gray-500 hover:text-event-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-events")}>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>My Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                    <Home className="mr-2 h-5 w-5 text-event-primary" />
                    Home
                  </Link>
                  <Link to="/events" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                    <CalendarDays className="mr-2 h-5 w-5 text-event-primary" />
                    Events
                  </Link>
                  <Link to="/artists" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                    <Users className="mr-2 h-5 w-5 text-event-primary" />
                    Artists
                  </Link>
                  {currentUser && (
                    <Link to="/create-event" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                      <PlusCircle className="mr-2 h-5 w-5 text-event-primary" />
                      Create Event
                    </Link>
                  )}
                  {currentUser?.email === "admin@example.com" && (
                    <Link to="/admin" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                      <Users className="mr-2 h-5 w-5 text-event-primary" />
                      Admin Panel
                    </Link>
                  )}
                  {currentUser ? (
                    <>
                      <div className="border-t border-gray-200 my-2"></div>
                      <Link to="/profile" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                        <User className="mr-2 h-5 w-5 text-event-primary" />
                        Profile
                      </Link>
                      <Link to="/my-events" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                        <CalendarDays className="mr-2 h-5 w-5 text-event-primary" />
                        My Events
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="mr-2 h-5 w-5 text-event-primary" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="border-t border-gray-200 my-2"></div>
                      <Link to="/login" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
                        <LogIn className="mr-2 h-5 w-5 text-event-primary" />
                        Login
                      </Link>
                      <Link to="/signup" className="flex items-center py-2 px-4 rounded-md bg-event-primary text-white rounded-md">
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
