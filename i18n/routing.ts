import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  // TODO: make based on messages folder
  locales: ['en', 'es', 'fr'],
 
  // Used when no locale matches
  // TODO: put as environment variable
  defaultLocale: 'en'
});