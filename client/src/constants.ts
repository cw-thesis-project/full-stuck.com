export const auth0 = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI as string,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
};
export const apiUrl = process.env.REACT_APP_API_URL as string;
