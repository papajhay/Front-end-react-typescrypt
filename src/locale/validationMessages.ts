import enMessages from './en.json';
import frMessages from './fr.json';

// Déclarez un type pour les langues supportées
type SupportedLanguages = 'en' | 'fr';

const messages: Record<SupportedLanguages, Record<string, string>> = {
  en: enMessages,
  fr: frMessages,
};

const getCurrentLanguage = (): SupportedLanguages => {
  // Remplacez par la logique pour détecter la langue courante, ici c'est 'en' par défaut
  return 'en'; 
};

export const getValidationMessage = (key: string, replacements: Record<string, string | number> = {}): string => {
  const language = getCurrentLanguage();
  const translations = messages[language]; 

  // Vérifie si la clé existe dans les traductions, sinon retourne la clé elle-même
  const translation = translations[key] || key;

  // Remplace les placeholders dans le message de traduction
  return Object.keys(replacements).reduce((msg, key) => {
    return msg.replace(`{${key}}`, replacements[key].toString());
  }, translation);
};