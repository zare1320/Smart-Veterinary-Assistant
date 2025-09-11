import { create } from 'zustand';
import type { User, UserProfile } from '../types';

const VET_USERS_KEY = 'vet_users';
const VET_CURRENT_USER_KEY = 'vet_current_user';

interface UserState {
  user: User | null;
  login: (identity: string) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
}

const getInitialUser = (): User | null => {
    const storedUser = localStorage.getItem(VET_CURRENT_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
}

const getAllUsers = (): User[] => {
    const users = localStorage.getItem(VET_USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveAllUsers = (users: User[]) => {
    localStorage.setItem(VET_USERS_KEY, JSON.stringify(users));
};

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
      };
      const updatedUsers = [...allUsers, newUser];
      saveAllUsers(updatedUsers);
      currentUser = newUser;
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
}));
