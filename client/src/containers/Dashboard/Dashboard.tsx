import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { store } from '../../store';

const Dashboard = (): JSX.Element => {
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        if (localStorage.getItem('token') === null) {
          await getToken();
        }

        const username: string = user?.['https://full-stuck.com/username'];
        store.dispatch(getUserData(username));
      })();

      // eslint-disable-next-line no-console
      store.subscribe(() => console.log(store.getState()));
    }
  }, [isLoading, user]);

  return <div>dashboard</div>;
};

export default Dashboard;
