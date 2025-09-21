'use client';

import StatusService from '@/services/StatusService';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Status } from '@types';


// TODO: when backend gets more connections and stuff, this should become split up for separate loading (for performance)
const StatusComponent: React.FC = () => {
  const t = useTranslations();

  const [status, setStatus] = useState<Status>(); // for now its a string
  const [error, setError] = useState<string>();

  // TODO: useSWR?
  const getStatus = async () => {
    setError(''); // reset
    const response = await StatusService.getStatus();

    if (!response.ok) {
      if (response.status === 401) { // forbidden access
        setError(
          'You are not authorized to view this page. Please login first.' // TODO: must become next-intl
        );
      } else {
        setError(response.statusText); // don't know what this would be
      }
    } else {
      const status = await response.json();
      setStatus(status);
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