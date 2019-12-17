
import i18n from 'i18next';
// import { useTranslation, initReactI18next } from 'react-i18next';
import English from './en';
import Vietnamese from './vi';

const resources = {
  en: {
    translation: English
  },
  vi: {
    translation: Vietnamese
  }
};

i18n
  // .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',

    // ns: ['ns1'],
    // defaultNS: 'ns1',

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: true
    }
  });

// const useTranslationResponse = useTranslation();

export default function t(text) {
  return i18n.t(text);
  // return useTranslationResponse.t(text);
}
