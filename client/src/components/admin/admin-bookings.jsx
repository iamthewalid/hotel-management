import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../status/loading';
import ErrorStatus from '../status/error';

const AdminBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetcher() {
      try {
        const bookings = (await axios.get('/api/bookings/get-all-bookings'))
          .data;
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

  return (
    <section className="row">
      <div className="col-md-12">
        {loading && <Loader />}
        {error && !loading && <ErrorStatus message={error} />}
        {!loading && !error && (
          <table className="table table-bordered table-dark">
            <thead className="">
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!bookings?.length && !loading && (
                <tr className="text-center p-5">
                  <h2>No Bookings.</h2>
                </tr>
              )}
              {!!bookings?.length &&
                bookings?.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.userId}</td>
                      <td>{booking.room}</td>
                      <td>{booking.fromDate}</td>
                      <td>{booking.toDate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminBookings;
