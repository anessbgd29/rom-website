import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // General
      'app.title': 'ROM Collection',
      'app.description': 'Browse and download custom ROMs for your device',
      
      // Navigation
      'nav.home': 'Home',
      'nav.favorites': 'Favorites',
      'nav.settings': 'Settings',
      
      // ROM Cards
      'rom.version': 'Version',
      'rom.android': 'Android',
      'rom.buildType': 'Build Type',
      'rom.download': 'Download',
      'rom.details': 'Details',
      'rom.changelog': 'Changelog',
      'rom.bugs': 'Known Issues',
      'rom.notes': 'Notes',
      'rom.maintainer': 'Maintainer',
      
      // Filters
      'filter.title': 'Filters',
      'filter.romName': 'ROM Name',
      'filter.androidVersion': 'Android Version',
      'filter.buildType': 'Build Type',
      'filter.reset': 'Reset Filters',
      'filter.apply': 'Apply',
      
      // Search
      'search.placeholder': 'Search ROMs...',
      
      // Settings
      'settings.language': 'Language',
      'settings.theme': 'Theme',
      'settings.theme.light': 'Light',
      'settings.theme.dark': 'Dark',
      'settings.theme.system': 'System',
    }
  },
  ar: {
    translation: {
      // General
      'app.title': 'مجموعة الرومات',
      'app.description': 'تصفح وتنزيل الرومات المخصصة لجهازك',
      
      // Navigation
      'nav.home': 'الرئيسية',
      'nav.favorites': 'المفضلة',
      'nav.settings': 'الإعدادات',
      
      // ROM Cards
      'rom.version': 'الإصدار',
      'rom.android': 'أندرويد',
      'rom.buildType': 'نوع البناء',
      'rom.download': 'تنزيل',
      'rom.details': 'التفاصيل',
      'rom.changelog': 'سجل التغييرات',
      'rom.bugs': 'المشاكل المعروفة',
      'rom.notes': 'ملاحظات',
      'rom.maintainer': 'المطور',
      
      // Filters
      'filter.title': 'التصفية',
      'filter.romName': 'اسم الروم',
      'filter.androidVersion': 'إصدار أندرويد',
      'filter.buildType': 'نوع البناء',
      'filter.reset': 'إعادة ضبط',
      'filter.apply': 'تطبيق',
      
      // Search
      'search.placeholder': 'البحث في الرومات...',
      
      // Settings
      'settings.language': 'اللغة',
      'settings.theme': 'المظهر',
      'settings.theme.light': 'فاتح',
      'settings.theme.dark': 'داكن',
      'settings.theme.system': 'النظام',
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
