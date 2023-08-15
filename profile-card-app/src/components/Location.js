import './Location.css';

const Location = ({ location }) => {
  return <div className="location">
      <p>📍{location.street.number+", "+location.street.name + ","+location.city+","+location.postcode}</p>
    </div>;
};

export default Location;
