import { useAuthStore } from '@/store/authStore';
import Admin from './Admin';
import UnAuth from './UnAuth';

export default function Routes() {
  const { authUser } = useAuthStore();
  const isAuth = authUser?.data && authUser.data.username


  if (isAuth) {
    return <Admin />;
  } else {
    return <UnAuth />;
  }
}
