import React from 'react';
import { useLocale } from '../context/LocaleContext';

const Header: React.FC = () => {
  const { t } = useLocale();

  return (
    <header className="flex items-center justify-center p-4 bg-transparent">
      <h1 className="text-2xl font-bold text-heading">{t('appName')}</h1>
    </header>
  );
};

export default Header;