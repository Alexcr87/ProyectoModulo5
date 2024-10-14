export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_AUDIENCE,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  /*authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
   logoutParams: {
     returnTo: 'http://localhost:3000/logouts', // Aquí especificas la URL de redirección al cerrar sesión
     client_id: process.env.AUTH0_CLIENT_ID,
   },*/
};
