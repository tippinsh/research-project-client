import PropTypes from "prop-types";

export default function Error(props) {
  Error.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  return (
    <div className="flex flex-col items-center">
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </div>
  );
}
