import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    tr: {
      translation: {
        title: "GodEye - IP Konum Takipçisi",
        description: "IP adresinizin coğrafi konumunu keşfedin",
        refresh: "Yenile",
        error: "Konum bilgisi alınamadı",
        retry: "Tekrar Dene",
      },
    },
    en: {
      translation: {
        title: "GodEye - IP Location Tracker",
        description: "Discover your IP location",
        refresh: "Refresh",
        error: "Could not retrieve location information",
        retry: "Try Again",
      },
    },
    bs: {
      translation: {
        title: "GodEye - IP Lokacijski Pratitelj",
        description: "Otkrijte svoju IP lokaciju",
        refresh: "Osvježi",
        error: "Nije moguće dohvatiti informacije o lokaciji",
        retry: "Pokušajte ponovo",
      },
    },
  },
  lng: "tr", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
