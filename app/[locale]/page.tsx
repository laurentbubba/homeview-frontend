'use client'

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="">
      <main className="flex flex-col items-center justify-items-center">
        <p className="text-2xl my-3">{t('home.title')}</p>
      </main>
      <footer className="">
        {/* extra links and socials etc? */}
      </footer>
    </div>
  );
}
