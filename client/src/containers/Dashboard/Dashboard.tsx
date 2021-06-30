import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store';

const Dashboard = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // updates the storage from the API on the first load.
  useEffect(() => {
    if (!isLoading && !userStore) {
      (async () => {
        await getToken(getAccessTokenSilently);
        const username: string = user?.['https://full-stuck.com/username'];
        dispatch(getUserData(username));
      })();
    }
  }, []);

  return <div>dashboard</div>;
};

export default Dashboard;
