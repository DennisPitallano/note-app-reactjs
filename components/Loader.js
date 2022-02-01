function LoaderPlaceHolder() {
  return (
    <div className="container">
      <div className="row tab-content bg-transparent mt-4">
        <div className="col-md-4">
          <div className="card" aria-hidden="true">
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-sm btn-warning disabled placeholder card-link"
              ></a>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-sm btn-danger disabled placeholder card-link"
              ></a>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-sm disabled placeholder card-link"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoaderPlaceHolder;
