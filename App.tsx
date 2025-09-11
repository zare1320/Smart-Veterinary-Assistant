import React from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { getNavItems } from './constants';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ProtocolsScreen from './screens/ProtocolsScreen';
import MyDrugsScreen from './screens/MyDrugsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen';
import ThemeSettingsScreen from './screens/ThemeSettingsScreen';
import SyncSettingsScreen from './screens/SyncSettingsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import WeightUnitSettingsScreen from './screens/WeightUnitSettingsScreen';
import DrugDoseCalculatorScreen from './screens/DrugDoseCalculatorScreen';
import FluidTherapyCalculatorScreen from './screens/FluidTherapyCalculatorScreen';
import BloodPressureCalculatorScreen from './screens/BloodPressureCalculatorScreen';
import BloodTransfusionCalculatorScreen from './screens/BloodTransfusionCalculatorScreen';
import PetAgeCalculatorScreen from './screens/PetAgeCalculatorScreen';
import ProtocolDetailScreen from './screens/ProtocolDetailScreen';
import AddProtocolScreen from './screens/AddProtocolScreen';
import DrugInteractionScreen from './screens/DrugInteractionScreen';
import MedicationReportScreen from './screens/MedicationReportScreen';
import { useLocale } from './context/LocaleContext';
import { useUser } from './context/UserContext';
import RegisterScreen from './screens/RegisterScreen';

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
  const { user, login } = useUser();
  const location = useLocation();

  if (!user) {
    return <RegisterScreen onAuthSuccess={login} />;
  }

  // If the user's profile is not complete, force them to the profile screen
  if (!user.isProfileComplete && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/protocols" element={<ProtocolsScreen />} />
        <Route path="/my-drugs" element={<MyDrugsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>

      {/* FIX: Added missing routes for screens that are not part of the main layout */}
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
      <Route path="/protocols/:protocolId" element={<ProtocolDetailScreen />} />
      <Route path="/add-protocol" element={<AddProtocolScreen />} />
      <Route path="/drug-interaction-checker" element={<DrugInteractionScreen />} />
      <Route path="/medication-report" element={<MedicationReportScreen />} />
    </Routes>
  );
};

// FIX: Added default export for App component
export default App;
