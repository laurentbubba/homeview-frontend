import { useTranslations } from 'next-intl';

export default function Tasks() {
    const t = useTranslations();
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl text-red-500 ">{t('general.messages.WIP')}</h1>
    </div>
  );
}