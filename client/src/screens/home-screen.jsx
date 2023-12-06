import RoomFilters from '../components/booking/filters';
import RoomList from '../components/booking/room-list';

const HomeScreen = () => {
  return (
    <main className="container">
      <RoomFilters />
      <RoomList />
    </main>
  );
};

export default HomeScreen;
