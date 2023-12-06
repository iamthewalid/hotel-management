import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useDateRange } from '../../store';

const { RangePicker } = DatePicker;

const BookingDatePicker = () => {
  const [from, to] = useDateRange((state) => [state.from, state.to]);
  const setDateRange = useDateRange((state) => state.setDateRange);

  function handleChange(dates) {
    if (!dates) setDateRange([null, null]);
    else setDateRange(dates);
  }

  return (
    <RangePicker
      className="w-100"
      value={[from, to]}
      onChange={handleChange}
      format={'DD-MM-YYYY'}
    />
  );
};

export default BookingDatePicker;
