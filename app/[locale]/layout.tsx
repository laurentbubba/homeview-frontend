// wrap everything in NextIntlClientProvider, to be able to access the config from request.ts

import { routing } from '@/i18n/routing';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css'; // holy hell how annoying was this
import Header from './_components/Common/Header';
import Providers from './_components/Providers/Providers';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <Providers>
            <Header/>
            <main className="flex-grow flex flex-col">
            {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}