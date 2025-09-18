// import { User } from '@types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Header: React.FC = () => {
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   useEffect(() => {
//     const loggedInUserString = sessionStorage.getItem('loggedInUser');
//     if (loggedInUserString !== null) {
//       setLoggedInUser(JSON.parse(loggedInUserString));
//     }
//   }, []);
//   const handleClick = () => {
//     sessionStorage.removeItem('loggedInUser');
//     setLoggedInUser(null);
//   };

  const t = useTranslations();

  return (
    <header className="flex-shrink-0 p-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        {t('general.app.title')}
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg">
          {t('header.nav.home')}
        </Link>
        <Link
          href="/tasks"
          className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
          {t('header.nav.tasks')}
        </Link>
        <Link
          href="/switchLanguage"
          className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
          {t('header.nav.switchLanguage')}
        </Link>
        <Link
          href="/status"
          className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
          {t('header.nav.status')}
        </Link>

        {/* TODO: add user login page etc */}
        {/* {!loggedInUser && (
          <Link
            href="/login"
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.login')}
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.logout')}
          </a>
        )} */}
        {/* {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t('header.welcome')}, {loggedInUser.fullname}!
          </div>
        )} */}
      </nav>
    </header>
  );
};

export default Header;