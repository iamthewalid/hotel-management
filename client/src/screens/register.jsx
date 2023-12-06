import axios from 'axios';
import { useState } from 'react';
import Loading from '../components/status/loading';
import Error from '../components/status/error';
import Success from '../components/status/success';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formParsed = Object.fromEntries(formData.entries());

    if (formParsed.password !== formParsed.confirm_password) {
      return alert("Password isn't matching!");
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/register', formParsed);

      console.log(res);
      // reset the form
      e.target.reset();

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      const message = error?.response?.data?.error;
      setLoading(false);
      setSuccess(false);
      setError(message || 'Something went wrong! Please try again.');
    }
  }

  return (
    <main className="auth">
      {loading && <Loading />}
      {error && <Error message={error} />}
      {success && !loading && !error && (
        <Success message={'Registration successfull!'} />
      )}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box-shadow rounded p-4 mt-5">
          <h1 className="text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Name"
              name="name"
            />
            <input
              type="email"
              required
              className="form-control"
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              required
              className="form-control"
              placeholder="Password"
              name="password"
            />
            <input
              type="password"
              required
              className="form-control"
              placeholder="Confirm password"
              name="confirm_password"
            />
            <input value="Register" type="submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
