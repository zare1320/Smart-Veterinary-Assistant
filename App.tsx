import React, { useState } from 'react';
import type { NavItemKey, Protocol } from './types';
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
import { useLocale } from './context/LocaleContext';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<NavItemKey>('home');
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const { t } = useLocale();
  const navItems = getNavItems(t);

  const handleSelectProtocol = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setActiveScreen('protocol-detail');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={setActiveScreen} />;
      case 'protocols':
        return <ProtocolsScreen onNavigate={setActiveScreen} onSelectProtocol={handleSelectProtocol} />;
      case 'protocol-detail':
        return <ProtocolDetailScreen protocol={selectedProtocol!} onNavigate={setActiveScreen} />;
      case 'my-drugs':
        return <MyDrugsScreen />;
      case 'settings':
        return <SettingsScreen onNavigate={setActiveScreen} />;
      case 'profile':
        return <ProfileScreen />;
      case 'language-settings':
        return <LanguageSettingsScreen onNavigate={setActiveScreen} />;
      case 'theme-settings':
          return <ThemeSettingsScreen onNavigate={setActiveScreen} />;
      case 'sync-settings':
          return <SyncSettingsScreen />;
      case 'privacy-policy':
          return <PrivacyPolicyScreen />;
      case 'terms-of-service':
          return <TermsOfServiceScreen />;
      case 'weight-unit-settings':
          return <WeightUnitSettingsScreen />;
      case 'drug-dose-calculator':
        return <DrugDoseCalculatorScreen onNavigate={setActiveScreen} />;
      case 'fluid-therapy-calculator':
        return <FluidTherapyCalculatorScreen onNavigate={setActiveScreen} />;
      case 'blood-pressure-calculator':
        return <BloodPressureCalculatorScreen onNavigate={setActiveScreen} />;
      case 'blood-transfusion-calculator':
        return <BloodTransfusionCalculatorScreen onNavigate={setActiveScreen} />;
      case 'pet-age-calculator':
        return <PetAgeCalculatorScreen onNavigate={setActiveScreen} />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} />;
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
    'protocol-detail'
  ].includes(activeScreen);


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {showBottomNav && (
          <BottomNav items={navItems} activeItem={activeScreen} onItemClick={setActiveScreen} />
      )}
      <main className={`transition-all duration-300 ${showBottomNav ? 'pb-20 md:pb-0 md:pl-24' : ''}`}>
          {renderScreen()}
      </main>
    </div>
  );
};

export default App;