import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

// Define user roles
export type UserRole = "admin";

// Define the user structure
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  department: string;
  avatar?: string;
  updatedAt: Date;
  createdAt: Date;
  lastLogin: Date;
}

// Define the context structure
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

// export const getCsrfToken = async () => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_URL}/api/csrf-token`,
//     {
//       withCredentials: true,
//     }
//   );
//   return response.data.csrfToken;
// };

// Create the context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
});

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Dummy user data
      const dummyUser: User = {
        _id: "12345",
        name: "John Doe",
        email: "johndoe@example.com",
        role: "admin",
        phone: "+1 555-1234",
        address: "123 Main St, City, Country",
        department: "IT",
        avatar: "https://i.pravatar.cc/150?img=3",
        updatedAt: new Date(),
        createdAt: new Date("2024-01-01T10:00:00Z"),
        lastLogin: new Date(),
      };

      setUser(dummyUser);
      setIsLoading(false);
    }, 1000); // simulate 1s delay

    return () => clearTimeout(timer);
  }, []);

  // console.log(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the auth context
export const useAuth = () => useContext(AuthContext);
