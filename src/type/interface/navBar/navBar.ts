// import { Locale } from "./type";
// import { Product } from "../api/api";
import { Locale } from '../../snackBar';
import { Product } from '../../../api/api'

export interface LanguageContextType {
  locale: Locale;
  switchLanguage: (locale: Locale) => void;
}

export interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
}

// Définir les types pour les données du formulaire
export type SignupFormInputs = {
  email: string;
  username: string;
  password: string;
};

