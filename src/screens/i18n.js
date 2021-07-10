import i18next from "i18next";
import english from "../screens/languages/en.json"
import arabic from "../screens/languages/ar.json"
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize'


const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        return callback(RNLocalize.getLocales()[0].langaugeCode);
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18next.use(languageDetector).use(initReactI18next).init({
    fallbackLng: 'ar',
    resources: {
        en: english,
        ar: arabic
    },
    react: {
        useSuspense: false
    },
});

export default i18next;