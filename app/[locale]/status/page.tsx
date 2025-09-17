'use client';

import { useTranslations } from 'next-intl';

export default function Status() {
    const t = useTranslations();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <h1>{t('title')}</h1>
        <p> Here comes the status call to backend, in the future it will check every service 
        and databank and whatever and show an overview of all which works and which doesnt</p> */}
      </main>
    </div>
  );
}