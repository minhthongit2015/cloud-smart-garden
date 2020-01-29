
// import { useTranslation, initReactI18next } from 'react-i18next';
let i18n = require('i18next');
const English = require('./en');
const Vietnamese = require('./vi');

i18n = i18n.default || i18n;

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

module.exports = function t(text) {
  return i18n.t(text);
  // return useTranslationResponse.t(text);
};
