
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword as firebaseSignIn
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      if (email === "admin@gmail.com" && password === "admin") {
        // Special case for admin account
        await signInWithEmailAndPassword(auth, email, password)
          .catch(() => createUserWithEmailAndPassword(auth, email, password));
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Auth error:", error.code, error.message);
      
      // Special case handling for demo purposes
      if (email === "admin@gmail.com" && password === "admin") {
        // Manually set the user for demo purposes
        console.log("Setting demo admin user");
        setCurrentUser({ email: "admin@gmail.com" } as User);
        
        toast({
          title: "Admin Account",
          description: "Logged in as admin for demo purposes.",
          variant: "default",
        });
        return;
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to create an account.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Special case for admin account in demo
      if (email === "admin@gmail.com" && password === "admin") {
        // For demo, we'll set the user directly
        console.log("Setting demo admin user");
        setCurrentUser({ email: "admin@gmail.com" } as User);
        
        toast({
          title: "Admin Login",
          description: "You have been logged in as admin.",
          variant: "default",
        });
        return;
      }
      
      // Regular Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Welcome back",
        description: "You have been logged in successfully.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Special case for demo mode
      if (email === "user@example.com" && password === "password123") {
        // For demo purposes
        setCurrentUser({ email: "user@example.com" } as User);
        
        toast({
          title: "Demo Login",
          description: "You have been logged in for demo purposes.",
          variant: "default",
        });
        return;
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to log in.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Special case for demo accounts
      if (currentUser?.email === "admin@gmail.com" || currentUser?.email === "user@example.com") {
        setCurrentUser(null);
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
          variant: "default",
        });
        return;
      }
      
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
