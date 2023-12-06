import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../components/status/loading';
import Error from '../components/status/error';
import Success from '../components/status/success';
import { useUser } from '../store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const setUser = useUser((state) => state.setUser);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formParsed = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await axios.post('/api/auth/login', formParsed);
      setUser(res.data);

      setLoading(false);
      setSuccess(true);

      navigate('/home');
    } catch (error) {
      const message = error?.response?.data?.error;
      setLoading(false);
      setSuccess(false);
      setError(message || 'Something went wrong! Please try again.');
    }
  }

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => setError(), 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <main className="auth">
      {loading && <Loading />}
      {error && <Error message={error} />}
      {success && !loading && !error && (
        <Success message={'Login successfull!'} />
      )}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box-shadow rounded p-4 mt-5">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
            />

            <input value="Login" type="submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
