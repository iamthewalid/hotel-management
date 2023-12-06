const ErrorStatus = ({ message }) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message || 'Something went wrong, please try again.'}
      </div>
    </div>
  );
};

export default ErrorStatus;
