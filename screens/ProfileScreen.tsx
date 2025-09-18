import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import ProfileView from '../components/profile/ProfileView';
import { ProfileForm } from '../components/profile/ProfileForm';
import toast from 'react-hot-toast';
import { useLocale } from '../context/LocaleContext';

const ProfileScreen: React.FC = () => {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();
    const { t } = useLocale();
    
    // If profile is incomplete, start in edit mode. Otherwise, start in view mode.
    const [isEditing, setIsEditing] = useState(!user?.isProfileComplete);

    if (!user) {
        // This case should ideally not be reached if App.tsx handles redirection correctly,
        // but it's good practice to have a fallback.
        // The App component will render the RegisterScreen if there's no user.
        return null;
    }

    const handleSave = () => {
        setIsEditing(false);
        toast.success(t('toast.profile.updated'));
        // App.tsx will handle navigation away to 'home' if the profile was just completed
    };

    const handleCancel = () => {
        // If profile is complete, we can go back to view mode.
        // If it's incomplete, they must complete it. Let's send them to settings.
        if (user.isProfileComplete) {
            setIsEditing(false);
        } else {
             navigate('/settings');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {isEditing ? (
                <div className="p-4 sm:p-6 max-w-2xl mx-auto flex items-center justify-center min-h-screen">
                    <div className="bg-card p-6 w-full">
                        <ProfileForm onSave={handleSave} onCancel={handleCancel} />
                    </div>
                </div>
            ) : (
                <ProfileView 
                    user={user} 
                    onEdit={() => setIsEditing(true)} 
                    onLogout={logout}
                    onNavigate={navigate}
                />
            )}
        </div>
    );
};

export default ProfileScreen;