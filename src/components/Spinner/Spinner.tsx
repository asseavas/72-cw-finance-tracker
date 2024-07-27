const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '300px' }}
    >
      <div className="spinner-border text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
