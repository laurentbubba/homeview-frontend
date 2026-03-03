'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import HeaderStyle from './HeaderStyle';
import { AuthService } from '@/services/AuthService';
import { useRouter } from '@/i18n/navigation';
import React from 'react';

const Header: React.FC = () => {
  const t = useTranslations();
  // for now not really relevant (TODO: fix problem in production, with inconsistent translations)
  const isVisibleExtraStuff = false;
  const { user, logout, isLoading: isLoadingUser } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      await AuthService.logout();
      logout();
      
      router.push('/');
      router.refresh(); // Refresh to update server components with new auth state
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <header className="flex-shrink-0 p-3 border-bottom bg-gradient-to-br from-red-900 to-yellow-300 flex flex-col items-center">
        Loading...
      </header>
  )};

  if (!user) {
    return (
      <HeaderStyle>
        <nav className="items-center flex md:flex-row flex-col">
          <Link
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.login')}
          </Link>

          <Link
            href="/signup"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.signup')}
          </Link>
        </nav>
      </HeaderStyle>
  )}

  else if (user) {
    return (
      <HeaderStyle>
        <nav className="items-center flex md:flex-row flex-col">
          {isVisibleExtraStuff ? (
            <Link
              href="/"
              className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg">
              {t('header.nav.home')}
            </Link>
          ) : null}

          {isVisibleExtraStuff ? (
            <Link
              href="/status"
              className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
              {t('header.nav.status')}
            </Link>
          ) : null}
          
          {isVisibleExtraStuff ? (
            <Link
              href="/categories"
              className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
              {t('header.nav.categories')}
            </Link>
          ) : null}

          {isVisibleExtraStuff ? (
            <Link
              href="/switchLanguage"
              className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg">
              {t('header.nav.switchLanguage')}
            </Link>
          ) : null}

          <Link
            href="/tasks"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.tasks')}
          </Link>

          <Link
            href="/recipes"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.recipes')}
          </Link>

          <Link
            href="/admin"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            Admin
          </Link>

          <Link
            href="/dev"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
            {t('header.nav.dev')}
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 text-white text-xl hover:bg-red-400 rounded-lg">
            {t('header.nav.logout')}
          </button>

          {isVisibleExtraStuff ? (
            <Link
              href="/test"
              className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
              {t('header.nav.test')}
            </Link>
          ) : null}
        </nav>
      </HeaderStyle>
    );
  }
};

export default Header;