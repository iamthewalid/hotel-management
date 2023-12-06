import { useEffect } from 'react';
import { Tabs } from 'antd';

import AdminBookings from '../components/admin/admin-bookings';
import AdminRooms from '../components/admin/admin-rooms';
import AdminAddRoom from '../components/admin/admin-add-room';
import AdminUsers from '../components/admin/admin-users';
import { useUser } from '../store';

const items = [
  {
    key: 1,
    label: 'Bookings',
    children: <AdminBookings />,
  },
  {
    key: 2,
    label: 'Rooms',
    children: <AdminRooms />,
  },
  {
    key: 3,
    label: 'Add Room',
    children: <AdminAddRoom />,
  },
  {
    key: 4,
    label: 'Users',
    children: <AdminUsers />,
  },
];

const AdminPanel = () => {
  const user = useUser((state) => state.user);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      window.location.href = '/home';
    }
  }, [user]);

  if (!user || !user?.isAdmin) return null;

  return (
    <main className="container mt-5 mb-5">
      <h1 className="text-center font-weight-bold mb-5">Admin Panel</h1>
      <Tabs defaultActiveKey={1} items={items} />
    </main>
  );
};

export default AdminPanel;
