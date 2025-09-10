import React, { createContext, useState, useContext, useEffect, useMemo, ReactNode, useCallback } from 'react';
import type { User, UserProfile } from '../types';

const VET_USERS_KEY = 'vet_users';
const VET_CURRENT_USER_KEY = 'vet_current_user';

interface UserContextType {
  user: User | null;
  login: (identity: string) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(VET_CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const getAllUsers = (): User[] => {
      const users = localStorage.getItem(VET_USERS_KEY);
      return users ? JSON.parse(users) : [];
  };

  const saveAllUsers = (users: User[]) => {
      localStorage.setItem(VET_USERS_KEY, JSON.stringify(users));
  };

  const login = useCallback((identity: string) => {
    const allUsers = getAllUsers();
    let currentUser = allUsers.find(u => u.id === identity);

    if (currentUser) {
      // Existing user
      setUser(currentUser);
      localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      // New user registration
      const isEmail = identity.includes('@');
      const newUser: User = {
        id: identity,
        email: isEmail ? identity : undefined,
        phone: !isEmail ? identity : undefined,
        isProfileComplete: false,
        profile: {
            fullName: '',
            role: '',
        },
      };
      const updatedUsers = [...allUsers, newUser];
      saveAllUsers(updatedUsers);
      setUser(newUser);
      localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(newUser));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(VET_CURRENT_USER_KEY);
  }, []);
  
  const updateProfile = useCallback((profileData: Partial<UserProfile>) => {
    setUser(currentUser => {
        if (!currentUser) return null;

        const updatedUser: User = {
            ...currentUser,
            isProfileComplete: true,
            profile: {
                ...currentUser.profile,
                ...profileData,
            },
        };

        // Update the user in the main list
        const allUsers = getAllUsers();
        const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
        if (userIndex > -1) {
            allUsers[userIndex] = updatedUser;
        } else {
            allUsers.push(updatedUser);
        }
        saveAllUsers(allUsers);

        // Update the current user session
        localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(updatedUser));

        return updatedUser;
    });
  }, []);

  const value = useMemo(() => ({ user, login, logout, updateProfile }), [user, login, logout, updateProfile]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};