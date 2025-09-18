'use client';

import { useTranslations } from 'next-intl';

export default function Status() {
    const t = useTranslations();
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl text-red-500 ">{t('general.messages.WIP')}</h1>
        {/* <h1>{t('statuspage.title')}</h1> */}
        {/* <p> Here comes the status call to backend, in the future it will check every service 
        and databank and whatever and show an overview of all which works and which doesnt</p> */}
    </div>
  );
}