// import { User } from '@types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ContentPageProps {
  children: React.ReactNode;
  title: string;
}

const ContentPage: React.FC<ContentPageProps> = ({children, title}) => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className="text-3xl my-3">{title}</h1>
        <div className='flex flex-col items-center gap-4'>
            {children}
        </div>
    </div>
  );
};

export default ContentPage;