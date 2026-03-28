import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');
  const isDutch = i18n.language.startsWith('nl');

  const changeLanguage = (lng: string) => {
    try {
      window.localStorage.setItem('i18nextLng', lng);
    } catch {
      // no-op if storage is unavailable
    }
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isEnglish ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇺🇸</span>
        <span className="hidden sm:inline">EN</span>
      </Button>
      <Button
        variant={isDutch ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('nl')}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇳🇱</span>
        <span className="hidden sm:inline">NL</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;