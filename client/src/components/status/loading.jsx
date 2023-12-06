import BarLoader from 'react-spinners/BarLoader';

const Loader = () => {
  return (
    <div className="row justify-center loader">
      <div className="sweet-loading text-center">
        <BarLoader
          cssOverride={{ width: '200px' }}
          aria-label="Loading Spinner"
        />
      </div>
    </div>
  );
};

export default Loader;
