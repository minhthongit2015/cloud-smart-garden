
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    ns: ['ns1'],
    defaultNS: 'ns1',

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: true
    }
  });

const useTranslationResponse = useTranslation();

export default function t(text) {
  return useTranslationResponse.t(text);
}
