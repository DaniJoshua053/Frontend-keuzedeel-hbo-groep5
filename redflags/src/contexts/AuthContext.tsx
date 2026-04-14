import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in production this would call your Laravel backend
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for admin credentials
    if (email === 'admin@redflags.com' && password === 'admin') {
      setUser({
        id: '1',
        email: 'admin@redflags.com',
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
      });
    } else {
      setUser({
        id: '2',
        email,
        firstName: 'John',
        lastName: 'Doe',
      });
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    // Mock registration - in production this would call your Laravel backend
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '3',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
