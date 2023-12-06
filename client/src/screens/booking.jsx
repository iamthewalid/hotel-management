import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import useProtectedRoute from '../hooks/protect-route';
import Loader from '../components/status/loading';
import ErrorStatus from '../components/status/error';
import { useDateRange, useUser } from '../store';
import { formatDate } from '../utils';

const Booking = () => {
  useProtectedRoute();
  const navigate = useNavigate();
  const userId = useUser((state) => state?.user?._id);

  const [from, to] = useDateRange((state) => [state.from, state.to]);
  const [roomData, setRoomData] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [bookLoading, setBookLoading] = useState(false);

  const params = useParams();
  const roomId = params.roomId;

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);

        const rooms = (await axios('/api/rooms/get-room-by-id?roomId=' + roomId))
          .data;
        setRoomData(rooms);

        setLoading(false);
      } catch (error) {
        const message = error?.response?.data?.error;
        setLoading(false);
        setError(message || 'Something went wrong! Please try again.');
      }
    };
    fetcher();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!from || !to) navigate('/home');
    }, 1000);
  }, [from, to]);

  const fromDate = formatDate(from);
  const toDate = formatDate(to);

  const totalDays = dayjs(to).diff(from, 'days') + 1;

  async function handlePay(token) {
    const bookPayload = {
      roomId: roomData?._id,
      roomName: roomData?.name,
      userId,
      fromDate,
      toDate,
      totalDays,
      totalAmount: totalDays * roomData?.rentperday,
      token,
    };

    try {
      setBookLoading(true);
      await axios.post('/api/bookings/book-room', bookPayload);
      setBookLoading(false);
      toast.success('Booking successful!');
      setTimeout(() => (window.location.href = '/profile'), 500);
    } catch (error) {
      setBookLoading(false);
      const message = error?.response?.data?.error;
      toast.error(message || 'Something went wrong! Please try again.');
    }
  }

  if (!from || !to)
    return (
      <main className="container m-5">
        <ErrorStatus message={'Please select a date first!'} />
      </main>
    );

  return (
    <main className="container">
      <section className="row justify-content-center mt-5">
        {loading && !error && <Loader />}
        {!loading && error && <ErrorStatus message={error} />}

        {!loading && roomData && (
          <article className="row w-100 text-right box-shadow p-3 rounded">
            <div className="col text-left">
              <h3>{roomData?.name}</h3>
              <img
                className="w-100"
                src={roomData?.imageurls[0]}
                alt={`Hotel ${roomData?.name} photo`}
              />
            </div>
            <div className="col">
              <div>
                <h4>Booking Details</h4>

                <hr />

                <b>
                  <p>Name : {roomData?.name}</p>
                  <p>From Date : {fromDate} </p>
                  <p>To Date : {toDate} </p>
                  <p>Max Count : {roomData?.maxcount} </p>
                </b>
              </div>

              <div>
                <b>
                  <h4>Amount</h4>
                  <hr />
                  <p>Total Days : {totalDays} </p>
                  <p>Rent per day : {roomData?.rentperday}</p>
                  <p>Total Amount : {totalDays * roomData?.rentperday}</p>
                </b>
              </div>

              <div>
                <StripeCheckout
                  token={handlePay}
                  stripeKey="pk_test_51OARwTB4kHvyysc13eQ6I6zsnxJXP4uDcZM1spyO1iAnJm14dRIARhSKnzmoURsU3jkWJfCKoKB6MYVbImrJkipU00O4K2VCaD"
                >
                  <button disabled={bookLoading} className={'btn btn-primary'}>
                    <span>{bookLoading ? 'Processing...' : 'Pay Now'}</span>
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default Booking;
