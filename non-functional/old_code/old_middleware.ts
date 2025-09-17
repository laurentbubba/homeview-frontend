// This middleware runs right at the end of handling a request, to transform it

import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import createMiddleware from 'next-intl/middleware';

// TODO: make this locales list dynamic based on messages folder (or at least .env variable)
const locales = ['en', 'fr', 'es'];

// TODO: make this an environment variable
const defaultLocale = 'en';

// get the browser preference(s)
function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  const languages = acceptLang?.split(',').map(lang => lang.trim()) || [];
  return match(languages, locales, defaultLocale);
}

export function verifyPathLocale(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // check if request already uses a locale that we support
  if (locales.some(locale => pathname.startsWith(`/${locale}`))) {
    // then we can just leave it as it is
    return;
  }

  // otherwise we add a locale based on browser preferences
  const locale = getPreferredLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

// the middleware in this file should run only on paths specified hereunder
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // everything except next or favicon etc
};