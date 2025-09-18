"use client"

import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../_components/LocaleSwitcher';

export default function switchLanguage() {
    const t = useTranslations();
  return (
    <div className="flex-grow flex flex-col items-center">
        <h1 className="text-3xl my-3">{t('switchLanguage.choose')}</h1>
        <LocaleSwitcher/>
    </div>
  );
}