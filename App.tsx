import React, { useState, useEffect } from 'react';
import type { NavItemKey, Protocol, MedicationProfile, Medication } from './types';
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

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<NavItemKey>('home');
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [initialProtocolTitle, setInitialProtocolTitle] = useState<string>('');
  const [reportData, setReportData] = useState<{ profile: MedicationProfile; medications: Medication[] } | null>(null);
  const { t } = useLocale();
  const { user, login } = useUser();
  const navItems = getNavItems(t);

  useEffect(() => {
    if (user && !user.isProfileComplete) {
      setActiveScreen('profile');
    } else if (activeScreen === 'profile' && user?.isProfileComplete) {
      // If profile was just completed, navigate back home.
      setActiveScreen('home');
    }
  }, [user]);

  if (!user) {
    return <RegisterScreen onAuthSuccess={login} />;
  }

  const handleSelectProtocol = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setActiveScreen('protocol-detail');
  };
  
  const handleNavigate = (screen: NavItemKey) => {
    if (user && !user.isProfileComplete && screen !== 'profile') {
      // Prevent navigation away from profile completion
      return;
    }
    setActiveScreen(screen);
  }

  const handleAddProtocol = (title: string) => {
      setInitialProtocolTitle(title);
      setActiveScreen('add-protocol');
  }

  const handleGenerateReport = (data: { profile: MedicationProfile; medications: Medication[] }) => {
    setReportData(data);
    setActiveScreen('medication-report');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'protocols':
        return <ProtocolsScreen onNavigate={handleNavigate} onSelectProtocol={handleSelectProtocol} onAddProtocol={handleAddProtocol} />;
      case 'protocol-detail':
        return <ProtocolDetailScreen protocol={selectedProtocol!} onNavigate={handleNavigate} />;
      case 'add-protocol':
        return <AddProtocolScreen onNavigate={handleNavigate} initialTitle={initialProtocolTitle} />;
      case 'my-drugs':
        return <MyDrugsScreen onNavigate={handleNavigate} onGenerateReport={handleGenerateReport} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'language-settings':
        return <LanguageSettingsScreen onNavigate={handleNavigate} />;
      case 'theme-settings':
          return <ThemeSettingsScreen onNavigate={handleNavigate} />;
      case 'sync-settings':
          return <SyncSettingsScreen onNavigate={handleNavigate} />;
      case 'privacy-policy':
          return <PrivacyPolicyScreen onNavigate={handleNavigate} />;
      case 'terms-of-service':
          return <TermsOfServiceScreen onNavigate={handleNavigate} />;
      case 'weight-unit-settings':
          return <WeightUnitSettingsScreen onNavigate={handleNavigate} />;
      case 'drug-dose-calculator':
        return <DrugDoseCalculatorScreen onNavigate={handleNavigate} />;
      case 'fluid-therapy-calculator':
        return <FluidTherapyCalculatorScreen onNavigate={handleNavigate} />;
      case 'blood-pressure-calculator':
        return <BloodPressureCalculatorScreen onNavigate={handleNavigate} />;
      case 'blood-transfusion-calculator':
        return <BloodTransfusionCalculatorScreen onNavigate={handleNavigate} />;
      case 'pet-age-calculator':
        return <PetAgeCalculatorScreen onNavigate={handleNavigate} />;
      case 'drug-interaction-checker':
        return <DrugInteractionScreen onNavigate={handleNavigate} />;
      case 'medication-report':
        return <MedicationReportScreen reportData={reportData!} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = ![
    'profile', 
    'language-settings',
    'theme-settings',
    'sync-settings',
    'privacy-policy',
    'terms-of-service',
    'weight-unit-settings',
    'drug-dose-calculator',
    'fluid-therapy-calculator',
    'blood-pressure-calculator',
    'blood-transfusion-calculator',
    'pet-age-calculator',
    'protocol-detail',
    'add-protocol',
    'drug-interaction-checker',
    'medication-report'
  ].includes(activeScreen) && (user?.isProfileComplete ?? false);


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {showBottomNav && (
          <BottomNav items={navItems} activeItem={activeScreen} onItemClick={handleNavigate} />
      )}
      <main className={`transition-all duration-300 ${showBottomNav ? 'pb-20 md:pb-0 md:pl-24' : ''}`}>
          {renderScreen()}
      </main>
    </div>
  );
};

export default App;
