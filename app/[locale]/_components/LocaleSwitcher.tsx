import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export const LocaleSwitcher = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const locales = ['en', 'fr', 'es'];
  // TODO: let website wait while changing locale (with pending etc)
          // onClick={() => {
          //   startTransition(() => {
          //     // The navigation action
          //   });
          // }}
          // // Disable the link if a transition is pending
          // aria-disabled={isPending}

  return (
    <div className=''>
    {/* to test if tailwind is working */}
      <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            key={locale}
            href="/" // TODO: should go to the current path, not to the home page
            locale={locale}
            className={`px-2 rounded-md ${
              currentLocale === locale ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
};