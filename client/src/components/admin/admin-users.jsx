import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../status/loading';
import ErrorStatus from '../status/error';

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetcher() {
      try {
        const users = (await axios.get('/api/auth/get-all-users')).data;
        setUsers(users);
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
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {!users?.length && !loading && (
                <tr className="text-center p-5">
                  <h2>No Users.</h2>
                </tr>
              )}
              {!!users?.length &&
                users?.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? 'YES' : 'NO'}</td>
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

export default AdminUsers;
