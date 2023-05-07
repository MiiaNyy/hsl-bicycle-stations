import { Watch } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="spinner-wrapper">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#FFC109"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName="spinner-wrapper"
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;
