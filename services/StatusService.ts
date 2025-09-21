// const getToken = (): string => {
//   const loggedInUserString = sessionStorage.getItem('loggedInUser');
//   return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
// };

const getStatus = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: `Bearer ${getToken()}`,
    },
  });
};

const StatusService = {
  getStatus,
};

export default StatusService;