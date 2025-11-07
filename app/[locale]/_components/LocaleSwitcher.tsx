import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export const LocaleSwitcher = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const currentPath = usePathname(); // Get the current URL path including query params
  const locales = ['en', 'fr', 'es'];
  // TODO: let website wait while changing locale (with pending etc)
          // onClick={() => {
          //   startTransition(() => {
          //     // The navigation action
          //   });
          // }}
          // // Disable the link if a transition is pending
          // aria-disabled={isPending}
  
  const getPathWithoutLocale = (path: string) => {
    // Basic implementation: replace the current locale prefix
    if (path.startsWith(`/${currentLocale}`)) {
        return path.substring(`/${currentLocale}`.length) || '/';
    }
    return path;
  };

  const targetPath = getPathWithoutLocale(currentPath);

  return (
    <div className=''>
      <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            key={locale}
            href={targetPath} // TODO: should go to the current path, not to the home page
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