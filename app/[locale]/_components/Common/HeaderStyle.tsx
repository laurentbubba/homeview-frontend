'use client'

import { useTranslations } from 'next-intl';

const HeaderStyle: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const t = useTranslations();

  return (
    <header className="flex-shrink-0 p-3 border-bottom bg-gradient-to-br from-red-900 to-yellow-300 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        {t('general.app.title')}
      </a>
      {children}
    </header>
  );
};

export default HeaderStyle;