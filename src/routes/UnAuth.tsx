import { Navigate, useRoutes } from 'react-router-dom';
import { Login, Register } from './elements';

export default function UnAuth() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },

    {
      path: '/login',
      element: <Login />,
    },
    
    {
      path: '/register',
      element: <Register />,
    },
  ]);
}
