import Search from 'antd/es/input/Search';
import { useRoomFilters } from '../../store';
import BookingDatePicker from '../room-filters/booking-date-picker';
import { Select } from 'antd';

const RoomFilters = () => {
  const [searchQ, hotelType] = useRoomFilters((state) => [
    state.searchQ,
    state.hotelType,
  ]);
  const [setSearchQ, setHotelType] = useRoomFilters((state) => [
    state.setSearchQ,
    state.setHotelType,
  ]);

  return (
    <section className="home__filters row mt-5 border shadow-sm rounded p-3">
      <div className="col-md-3 mt-3">
        <BookingDatePicker />
      </div>
      <div className="col-md-5 mt-3">
        <Search
          className="w-100"
          placeholder="Search hotels by name"
          onSearch={(v) => setSearchQ(v)}
          style={{ width: 200 }}
        />
      </div>
      <div className="col-md-3 mt-3">
        <Select
          className="w-100"
          defaultValue={hotelType}
          onChange={(v) => setHotelType(v)}
          options={[
            {
              value: 'all',
              label: 'All',
            },
            {
              value: 'delux',
              label: 'Delux',
            },
            {
              value: 'non-delux',
              label: 'Non Delux',
            },
          ]}
        />
      </div>
    </section>
  );
};

export default RoomFilters;
