import { Navigate, useRoutes } from 'react-router-dom';
import { Login, Register , Dashboard } from './elements';


export default function UnAuth() {
  return useRoutes([
    {
      path: '/',
      element: < Dashboard />,
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
