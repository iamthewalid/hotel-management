import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../status/loading';
import ErrorStatus from '../status/error';

const AdminRooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetcher() {
      try {
        const rooms = (await axios.get('/api/rooms/get-all-rooms')).data;
        setRooms(rooms);
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
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent per day</th>
                <th>Max count</th>
                <th>Phone number</th>
              </tr>
            </thead>
            <tbody>
              {!rooms?.length && !loading && (
                <tr className="text-center p-5">
                  <h2>No Rooms.</h2>
                </tr>
              )}
              {!!rooms?.length &&
                rooms?.map((room) => {
                  return (
                    <tr key={room._id}>
                      <td>{room._id}</td>
                      <td>{room.name}</td>
                      <td className="text-capitalize">{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
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

export default AdminRooms;
