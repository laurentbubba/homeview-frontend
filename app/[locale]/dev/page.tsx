'use client'

import { useTranslations } from "next-intl";

export default function Dev() {
  const t = useTranslations();

  return (
    <div className="">
      <main className="flex flex-col items-center justify-items-center">
        <p className="text-2xl my-3">{t('dev.title')}</p>
        <div className="flex flex-col items-center justify-items-center">
          <p>
            <b>Tech Stack:</b> <br></br>
            PROD: <br></br>
            Servitro server <br></br>
            Ubuntu for OS <br></br>
            PM2 for daemon <br></br>
            Nginx for reverse DNS <br></br>
            Namecheap for domain for back-end <br></br>
            Node.js for app <br></br>
            Express.js for routing <br></br>
            Npm for package management <br></br>
            Neon for DB hosting + Postgres DB <br></br>
            Github for version control <br></br>
            Girhub Actions for CI/CD <br></br>
            Next.js (React.js) for front-end <br></br>
            Vercel for deploying <br></br>
            Vercel for hosting <br></br>
            <br></br>
            DEV: <br></br>
            localhost for server <br></br>
            Windows OS <br></br>
            ts-node for dev daemon <br></br>
            tsc for typescript to javascript <br></br>
            Typescript for code <br></br>
            HTML for page elements <br></br>
            Tailwind CSS for layout<br></br>
            PgAdmin/postgres for db testing <br></br>
            Visual studio code for IDE <br></br>
            Git Bash for version control pushing <br></br>
            Postman for api testing <br></br>
            Browser for website testing (Edge) <br></br>
            next turbopack for frontend daemon <br></br>
            i18n for language frontend <br></br>

            <br></br>
            <b>Back-end:</b> <br></br>
            Server: <br></br>
            Solarputty, on user gith... pm2 list <br></br>
            /var/www/homeview-backend(-config/ecosystem...) <br></br>
            that is also where .env <br></br>
            server runs via servitro <br></br>
            <br></br>
            <b>CI/CD:</b> <br></br>
            npm run build <br></br>
            npx prisma generate <br></br>
            <br></br>
            <b>Development:</b> <br></br>
            debug with launch.json <br></br>
            npm run dev <br></br>
            npx prisma migrate dev <br></br>
            to reset generated files: npm run build <br></br>
            everything still goes inside the generated folder (also prisma client) <br></br>
            check github actions for errors, then check pm2 list for errors <br></br>
            database is on neon <br></br>
            truncate sometimes necessary for migrations <br></br>
            <br></br>



          </p>
        </div>
      </main>
    </div>
  );
}
