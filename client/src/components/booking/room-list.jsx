import { useState } from 'react';
import { useDateRange, useRoomFilters } from '../../store';
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../status/loading';
import ErrorStatus from '../status/error';
import Room from '../room';
import { filterByDate, isQueryInText } from './booking-utils';

const RoomList = () => {
  const [searchQ, hotelType] = useRoomFilters((state) => [
    state.searchQ,
    state.hotelType,
  ]);
  const [from, to] = useDateRange((state) => [
    state.fromDate(),
    state.toDate(),
  ]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);

        const rooms = (await axios('/api/rooms/get-all-rooms')).data;
        setRooms(rooms);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetcher();
  }, []);

  return (
    <section className="row justify-content-center mt-5 mb-5">
      {loading && !error && <Loader />}
      {!loading && error && <ErrorStatus />}
      {!!rooms.length &&
        rooms.map((room) => {
          const isRoomBooked = room?.currentBookings?.some(
            filterByDate(from, to)
          );
          const searchMatched = isQueryInText(searchQ, room?.name);
          const hotelTypeMatched =
            hotelType !== 'all' ? room?.type === hotelType : true;

          if (isRoomBooked || !searchMatched || !hotelTypeMatched) return null;

          return (
            <div className="col-md-9 mt-2" key={room?._id}>
              <Room data={room} />
            </div>
          );
        })}
    </section>
  );
};

export default RoomList;
