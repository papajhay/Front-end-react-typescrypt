export type Messages = {
  [key: string]: string;
};

export type Locale = 'en' | 'fr';

export type SnackbarContextType = {
    showMessage: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
};
