import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { AppState } from '../../store/storeTypes';

const Dashboard = (): JSX.Element => {

  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const userStore = useSelector((state: AppState) => state.user);
  // fix this type
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        if (localStorage.getItem('token') === null) {
          await getToken(getAccessTokenSilently);
        }
        const username: string = user?.['https://full-stuck.com/username'];
        dispatch(getUserData(username));
      })();
    }
  }, [isLoading, user]);
  // eslint-disable-next-line no-console
  console.log(userStore);

  return <div>dashboard</div>;
};

export default Dashboard;
