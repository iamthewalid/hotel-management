import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="landing">
      <div className="container mx-auto my-auto">
        <div className="w-100 text-center">
          <h1 className="landing__heading">HOTELROOMS</h1>
          <h2 className="landing__subheading">
            &apos;There is only one boss. The Guest.&apos;
          </h2>
          <Link className="btn" to={'/home'}>
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
