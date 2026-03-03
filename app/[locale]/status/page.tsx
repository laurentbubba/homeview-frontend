'use client';

import StatusService from '@/services/StatusService';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Status } from '@types';
import { getErrorMessage } from '@/lib/functions';


// TODO: when backend gets more connections and stuff, this should become split up for separate loading (for performance)
const StatusComponent: React.FC = () => {
  const t = useTranslations();

  const [status, setStatus] = useState<Status>(); // for now its a string
  const [error, setError] = useState<string>();

  // TODO: useSWR?
  const getStatus = async () => {
    setError(''); // reset
    try{
      const responseJson = await StatusService.getStatus();
      setStatus(responseJson);
    }
    catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getStatus();
  }, []);


  return (
    <div className="flex-grow flex flex-col items-center">
        {/* <h1 className="text-3xl text-red-500 ">{t('general.messages.WIP')}</h1> */}
        <h1 className="text-3xl my-3">{t('statuspage.title')}</h1>
        <p>{t('statuspage.backendServer')}: {status?.message}</p>
        {/* <p> Here comes the status call to backend, in the future it will check every service 
        and databank and whatever and show an overview of all which works and which doesnt</p> */}
    </div>
  );
};

export default StatusComponent;