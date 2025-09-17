// This middleware runs right at the end of handling a request, to transform it

import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

// TOLE: does something based on our routing locales (i think substitute the incoming request?)
export default createMiddleware(routing);

// the middleware in this file should run only on paths specified hereunder
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};