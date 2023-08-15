import './Phone.css';

const Phone = ({ number, type }) => (
    <div className="phoneNumber">
        <span className="phoneIcon"></span>
        <p>{type}:📞 {number}</p>
    </div>
);

export default Phone;