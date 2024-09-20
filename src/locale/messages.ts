import enMessages from './en.json';
import frMessages from './fr.json';
import { Messages } from '../type/snackBar';

const messages: Record<'en' | 'fr', Messages> = {
  en: enMessages,
  fr: frMessages,
};

export default messages;