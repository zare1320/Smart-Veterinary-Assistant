import { create } from 'zustand';
import type { User, UserProfile, UserSettings } from '../types';

const VET_USERS_KEY = 'vet_users';
const VET_CURRENT_USER_KEY = 'vet_current_user';

interface UserState {
  user: User | null;
  login: (identity: string) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  updateSettings: (settingsData: Partial<UserSettings>) => void;
}

const getAllUsers = (): User[] => {
    const users = localStorage.getItem(VET_USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveAllUsers = (users: User[]) => {
    localStorage.setItem(VET_USERS_KEY, JSON.stringify(users));
};

const getInitialUser = (): User | null => {
    const storedUser = localStorage.getItem(VET_CURRENT_USER_KEY);
    if (storedUser) {
        return JSON.parse(storedUser);
    }

    // If no user is stored, create and set the default user.
    const defaultUser: User = {
      id: '09130535853',
      phone: '09130535853',
      isProfileComplete: true,
      profile: {
        fullName: 'مسعود زارع',
        role: 'dvm',
        licenseNumber: '2047361',
        province: 'یزد',
      },
      settings: {
        weightUnit: 'kg'
      },
    };

    const allUsers = getAllUsers();
    const userExists = allUsers.some(u => u.id === defaultUser.id);
    if (!userExists) {
        const updatedUsers = [...allUsers, defaultUser];
        saveAllUsers(updatedUsers);
    }

    localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
}

export const useUserStore = create<UserState>((set) => ({
  user: getInitialUser(),
  login: (identity) => {
    const allUsers = getAllUsers();
    let currentUser = allUsers.find(u => u.id === identity);

    if (!currentUser) {
      const isEmail = identity.includes('@');
      const newUser: User = {
        id: identity,
        email: isEmail ? identity : undefined,
        phone: !isEmail ? identity : undefined,
        isProfileComplete: false,
        profile: { fullName: '', role: '' },
        settings: { weightUnit: 'kg' },
      };
      const updatedUsers = [...allUsers, newUser];
      saveAllUsers(updatedUsers);
      currentUser = newUser;
    }
    
    // Migration for existing users without the settings property
    if (currentUser && !currentUser.settings) {
        currentUser.settings = { weightUnit: 'kg' };
        const userIndex = allUsers.findIndex(u => u.id === currentUser!.id);
        if (userIndex > -1) {
            allUsers[userIndex] = currentUser;
            saveAllUsers(allUsers);
        }
    }

    localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(currentUser));
    set({ user: currentUser });
  },
  logout: () => {
    localStorage.removeItem(VET_CURRENT_USER_KEY);
    set({ user: null });
  },
  updateProfile: (profileData) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser: User = {
        ...state.user,
        isProfileComplete: true,
        profile: { ...state.user.profile, ...profileData },
      };
      
      const allUsers = getAllUsers();
      const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex > -1) {
        allUsers[userIndex] = updatedUser;
      } else {
        allUsers.push(updatedUser);
      }
      saveAllUsers(allUsers);
      localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  },
  updateSettings: (settingsData) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser: User = {
        ...state.user,
        settings: { ...state.user.settings, ...settingsData },
      };
      
      const allUsers = getAllUsers();
      const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex > -1) {
        allUsers[userIndex] = updatedUser;
      } else {
        allUsers.push(updatedUser);
      }
      saveAllUsers(allUsers);
      localStorage.setItem(VET_CURRENT_USER_KEY, JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  },
}));