import { useEffect } from 'react';
import { useUser } from '../store';

const useProtectedRoute = () => {
  const user = useUser((state) => state.user);
  useEffect(() => {
    if (!user) window.location.href = '/login';
  }, [user]);
};
export default useProtectedRoute;
