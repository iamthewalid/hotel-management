import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useUser } from '../../store';
import Loader from '../../components/status/loading';
import ErrorStatus from '../../components/status/error';

const Bookings = () => {
  const userId = useUser((state) => state.user._id);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [bookings, setBookings] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetcher() {
      try {
        const bookings = (
          await axios.post('/api/bookings/get-all-bookings', { userId })
        ).data;
        setBookings(bookings);
        setLoading(false);
      } catch (error) {
        const message = error?.response?.data?.error || 'Something went wrong!';
        toast(message);
        setLoading(false);
        setError(message);
      }
    }
    fetcher();
  }, []);

  const handleCancel = (booking) => async () => {
    try {
      const bookingId = booking._id;
      const roomId = booking.roomId;

      setCancelLoading(true);

      await axios.post('/api/bookings/cancel-booking', { bookingId, roomId });

      toast.success('Booking cancelled successfully.');

      // update the bookings state array to reflect changes to the UI
      const tempState = [...bookings];
      const targetIndex = tempState.findIndex((pred) => pred._id === bookingId);
      tempState[targetIndex].status = 'cancelled';
      setBookings(tempState);

      setCancelLoading(false);
    } catch (error) {
      const message = error?.response?.data?.error || 'Something went wrong!';
      toast(message);
      setCancelLoading(false);
    }
  };

  return (
    <section className="row">
      <div className="col-md-7">
        <h1>Bookings</h1>
        {loading && <Loader />}
        {error && !loading && <ErrorStatus message={error} />}
        {!!bookings?.length &&
          bookings.map((booking) => (
            <article
              key={booking._id}
              className="shadow p-4 rounded mt-3 user__booking-card"
            >
              <h3 className="mb-3">{booking.room}</h3>

              <p>
                <b>Booking Id :</b> {booking._id}
              </p>
              <p>
                <b>Check in :</b> {booking.fromDate}
              </p>
              <p>
                <b>Check out :</b> {booking.toDate}
              </p>
              <p>
                <b>Amount :</b> {booking.totalAmount}
              </p>
              <p>
                <b>Status :</b>{' '}
                {booking.status === 'booked' ? (
                  <span className="text-sm font-weight-bold text-white rounded p-1 bg-info">CONFIRMED</span>
                ) : (
                  <span className="text-sm font-weight-bold text-white rounded p-1 bg-danger">CANCELED</span>
                )}
              </p>

              {booking.status === 'booked' && (
                <div className="text-right">
                  <button
                    disabled={cancelLoading}
                    onClick={handleCancel(booking)}
                    className="btn btn-primary"
                  >
                    {cancelLoading ? 'Processing...' : 'Cancel booking'}
                  </button>
                </div>
              )}
            </article>
          ))}
      </div>
    </section>
  );
};

export default Bookings;
