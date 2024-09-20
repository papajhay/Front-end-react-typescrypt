import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Locale } from './type/snackBar';
import { LanguageContextType } from './type/interface/navBar/navBar';

// Création du contexte avec `undefined` par défaut
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Composant Provider pour le contexte de langue
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en'); // Par défaut en anglais

  // Fonction pour changer de langue
  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
