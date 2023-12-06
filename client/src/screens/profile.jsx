import { Tabs } from 'antd';

import ProfileCard from '../components/user/profile-card';
import Bookings from '../components/user/bookings';
import useProtectedRoute from '../hooks/protect-route';
import { useUser } from '../store';

const items = [
  {
    key: '1',
    label: 'Profile',
    children: <ProfileCard />,
  },
  {
    key: '2',
    label: 'Bookings',
    children: <Bookings />,
  },
];

const ProfilePage = () => {
  const user = useUser((state) => state.user);
  useProtectedRoute();

  if (!user) return null;

  return (
    <main className="container mt-5 mb-5">
      <Tabs defaultActiveKey="1" items={items} />
    </main>
  );
};
export default ProfilePage;
