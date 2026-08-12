import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('leafology_auth');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to load auth state from localStorage:', err);
    }
    return null;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('leafology_auth', JSON.stringify(user));
      } else {
        localStorage.removeItem('leafology_auth');
      }
    } catch (err) {
      console.error('Failed to sync auth state to localStorage:', err);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    const displayName = name || email.split('@')[0];
    const loggedInUser: User = {
      id: `usr_${Date.now()}`,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email,
    };
    setUser(loggedInUser);
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
