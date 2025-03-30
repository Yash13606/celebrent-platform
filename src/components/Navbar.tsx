
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Music, 
  Menu, 
  User, 
  LogOut, 
  LogIn, 
  PlusCircle,
  Home,
  Users,
  Headphones
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
import { motion } from "framer-motion";

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
    <nav className="bg-gray-900 shadow-md sticky top-0 z-10 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Headphones className="h-8 w-8 text-purple-500 group-hover:text-purple-400 transition-colors duration-300" />
              </motion.div>
              <motion.span 
                className="ml-2 text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                EventSphere
              </motion.span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-300 hover:text-purple-400 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-400 text-sm font-medium transition-all duration-300">
                Home
              </Link>
              <Link to="/events" className="border-transparent text-gray-300 hover:text-purple-400 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-400 text-sm font-medium transition-all duration-300">
                Events
              </Link>
              <Link to="/artists" className="border-transparent text-gray-300 hover:text-purple-400 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-400 text-sm font-medium transition-all duration-300">
                Artists
              </Link>
              {currentUser && (
                <Link to="/create-event" className="border-transparent text-gray-300 hover:text-purple-400 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-400 text-sm font-medium transition-all duration-300">
                  Create Event
                </Link>
              )}
              {currentUser?.email === "admin@gmail.com" && (
                <Link to="/admin" className="border-transparent text-gray-300 hover:text-purple-400 inline-flex items-center px-1 pt-1 border-b-2 hover:border-purple-400 text-sm font-medium transition-all duration-300">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors duration-300">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="hover:bg-gray-700 cursor-pointer">
                    <User className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-events")} className="hover:bg-gray-700 cursor-pointer">
                    <Music className="mr-2 h-4 w-4 text-purple-400" />
                    <span>My Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-700 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4 text-purple-400" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate("/login")} className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} className="bg-purple-600 text-white hover:bg-purple-700">
                  Sign up
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gray-900 text-white border-gray-800">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                    <Home className="mr-2 h-5 w-5 text-purple-400" />
                    Home
                  </Link>
                  <Link to="/events" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                    <Music className="mr-2 h-5 w-5 text-purple-400" />
                    Events
                  </Link>
                  <Link to="/artists" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                    <Users className="mr-2 h-5 w-5 text-purple-400" />
                    Artists
                  </Link>
                  {currentUser && (
                    <Link to="/create-event" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                      <PlusCircle className="mr-2 h-5 w-5 text-purple-400" />
                      Create Event
                    </Link>
                  )}
                  {currentUser?.email === "admin@gmail.com" && (
                    <Link to="/admin" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                      <Users className="mr-2 h-5 w-5 text-purple-400" />
                      Admin Panel
                    </Link>
                  )}
                  {currentUser ? (
                    <>
                      <div className="border-t border-gray-800 my-2"></div>
                      <Link to="/profile" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                        <User className="mr-2 h-5 w-5 text-purple-400" />
                        Profile
                      </Link>
                      <Link to="/my-events" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                        <Music className="mr-2 h-5 w-5 text-purple-400" />
                        My Events
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 w-full text-left"
                      >
                        <LogOut className="mr-2 h-5 w-5 text-purple-400" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="border-t border-gray-800 my-2"></div>
                      <Link to="/login" className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
                        <LogIn className="mr-2 h-5 w-5 text-purple-400" />
                        Login
                      </Link>
                      <Link to="/signup" className="flex items-center py-2 px-4 rounded-md bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300">
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
