import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import ProfileView from '../components/profile/ProfileView';
import ProfileForm from '../components/profile/ProfileForm';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScreenProps } from '../types';

const ProfileScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
    const { user, updateProfile, logout } = useUser();
    const [isEditing, setIsEditing] = useState(!user?.isProfileComplete);

    if (!user) {
        // This should not happen if App.tsx logic is correct, but as a safeguard:
        return null;
    }
    
    const handleProfileSave = (data: any) => {
        updateProfile(data);
        setIsEditing(false); // Switch to view mode after saving
    }

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isEditing ? 'form' : 'view'}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {isEditing ? (
                        <ProfileForm 
                            user={user}
                            onSave={handleProfileSave}
                            onCancel={() => user.isProfileComplete && setIsEditing(false)}
                            onNavigate={onNavigate}
                        />
                    ) : (
                        <ProfileView 
                            user={user}
                            onEdit={() => setIsEditing(true)}
                            onLogout={logout}
                            onNavigate={onNavigate}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ProfileScreen;