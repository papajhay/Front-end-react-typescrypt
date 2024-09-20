import { setLocale } from 'yup';
import { getValidationMessage } from './locale/validationMessages';

// Fonction pour définir la langue des messages de validation Yup
export const setYupLocale = (locale: 'en' | 'fr') => {
  setLocale({
    mixed: {
      default: getValidationMessage('mixed.default', { locale }),
      required: getValidationMessage('mixed.required', { locale }),
    },
    string: {
      email: getValidationMessage('string.email', { locale }),
      min: getValidationMessage('string.min', { locale }),
    },
  });
};