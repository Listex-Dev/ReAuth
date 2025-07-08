'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('reauth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: '/api/placeholder/128/128',
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('reauth_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - in real app, this would call your API
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      avatar: '/api/placeholder/128/128',
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('reauth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('reauth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
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