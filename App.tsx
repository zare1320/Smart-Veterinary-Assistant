import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { getNavItems } from './constants';
import BottomNav from './components/BottomNav';
import { useLocale } from './context/LocaleContext';
import { useUserStore } from './stores/useUserStore';
import SuspenseLoader from './components/SuspenseLoader';
import { authService } from './services/authService';
import toast from 'react-hot-toast';

// --- Lazy Loaded Screens ---
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ProtocolsScreen = lazy(() => import('./screens/ProtocolsScreen'));
const MyDrugsScreen = lazy(() => import('./screens/MyDrugsScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const LanguageSettingsScreen = lazy(() => import('./screens/LanguageSettingsScreen'));
const ThemeSettingsScreen = lazy(() => import('./screens/ThemeSettingsScreen'));
const SyncSettingsScreen = lazy(() => import('./screens/SyncSettingsScreen'));
const PrivacyPolicyScreen = lazy(() => import('./screens/PrivacyPolicyScreen'));
const TermsOfServiceScreen = lazy(() => import('./screens/TermsOfServiceScreen'));
const WeightUnitSettingsScreen = lazy(() => import('./screens/WeightUnitSettingsScreen'));
const DrugDoseCalculatorScreen = lazy(() => import('./screens/DrugDoseCalculatorScreen'));
const FluidTherapyCalculatorScreen = lazy(() => import('./screens/FluidTherapyCalculatorScreen'));
const BloodPressureCalculatorScreen = lazy(() => import('./screens/BloodPressureCalculatorScreen'));
const BloodTransfusionCalculatorScreen = lazy(() => import('./screens/BloodTransfusionCalculatorScreen'));
const PetAgeCalculatorScreen = lazy(() => import('./screens/PetAgeCalculatorScreen'));
const CaloriesCalculatorScreen = lazy(() => import('./screens/CaloriesCalculatorScreen'));
const ToxicityCalculatorScreen = lazy(() => import('./screens/ToxicityCalculatorScreen'));
const ProtocolDetailScreen = lazy(() => import('./screens/ProtocolDetailScreen'));
const AddProtocolScreen = lazy(() => import('./screens/AddProtocolScreen'));
const DrugInteractionScreen = lazy(() => import('./screens/DrugInteractionScreen'));
const MedicationReportScreen = lazy(() => import('./screens/MedicationReportScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));


const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useLocale();
  const navItems = getNavItems(t);

  const showBottomNav = navItems.some(item => location.pathname.startsWith(item.path));
  
  return (
    <div className="min-h-screen text-foreground">
      {showBottomNav && <BottomNav items={navItems} />}
      <main className={`transition-all duration-300 ${showBottomNav ? 'pb-20 md:pb-0 md:pl-24' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const { user, login } = useUserStore();
  const location = useLocation();
  const { t } = useLocale();

  useEffect(() => {
    const handleAuthCallback = async () => {
        try {
            const email = await authService.handleGoogleCallback();
            if (email) {
                login(email);
            }
        } catch (error: any) {
            console.error("Google Sign-In failed:", error);
            toast.error(error.message || 'An error occurred during Google Sign-In.');
        }
    };
    // Only run this on initial load if the user is not already logged in
    if (!user) {
        handleAuthCallback();
    }
  }, [login, t, user]);

  if (!user) {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <RegisterScreen onAuthSuccess={login} />
      </Suspense>
    );
  }

  // If the user's profile is not complete, force them to the profile screen
  if (!user.isProfileComplete && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/protocols" element={<ProtocolsScreen />} />
          <Route path="/my-drugs" element={<MyDrugsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>

        {/* Routes without the main layout/nav */}
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings/language" element={<LanguageSettingsScreen />} />
        <Route path="/settings/theme" element={<ThemeSettingsScreen />} />
        <Route path="/settings/sync" element={<SyncSettingsScreen />} />
        <Route path="/settings/privacy-policy" element={<PrivacyPolicyScreen />} />
        <Route path="/settings/terms-of-service" element={<TermsOfServiceScreen />} />
        <Route path="/settings/weight-unit" element={<WeightUnitSettingsScreen />} />
        <Route path="/calculators/drug-dose" element={<DrugDoseCalculatorScreen />} />
        <Route path="/calculators/fluid-therapy" element={<FluidTherapyCalculatorScreen />} />
        <Route path="/calculators/blood-pressure" element={<BloodPressureCalculatorScreen />} />
        <Route path="/calculators/blood-transfusion" element={<BloodTransfusionCalculatorScreen />} />
        <Route path="/calculators/pet-age" element={<PetAgeCalculatorScreen />} />
        <Route path="/calculators/calories" element={<CaloriesCalculatorScreen />} />
        <Route path="/calculators/toxicity" element={<ToxicityCalculatorScreen />} />
        <Route path="/protocols/:protocolId" element={<ProtocolDetailScreen />} />
        <Route path="/add-protocol" element={<AddProtocolScreen />} />
        <Route path="/drug-interaction-checker" element={<DrugInteractionScreen />} />
        <Route path="/medication-report" element={<MedicationReportScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
