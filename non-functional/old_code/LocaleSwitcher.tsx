import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <select
      defaultValue={currentLocale}
      onChange={(e) => changeLocale(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="es">ES</option>
    </select>
  );
};