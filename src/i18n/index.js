import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import te from './locales/te.json';

const LANGUAGE_KEY = 'user_language';

export const saveLanguage = async (lang) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

export const loadLanguage = async () => {
  const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
  return lang || 'en'; 
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    mr: { translation: mr },
    ta: { translation: ta },
    bn: { translation: bn },
    gu: { translation: gu },
    kn: { translation: kn },
    te: { translation: te },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;