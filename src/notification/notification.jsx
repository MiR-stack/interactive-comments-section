import { Link } from "react-router-dom";

export default function Notification({ notification }) {
  const { date, event, user, status } = notification;
  return (
    <div className={`notification ${!status && 'active_bg'}`}>
      <div className="wraper">
      <div className="image">
        <img
          src={`./assets/images/avatar-${user.avatar}.webp `}
          alt={event.name}
        />
      </div>
      <header>
        <div>
          <p>
            <Link to={`/user/profile`}>{user.name}</Link>
            <span> {event.text}</span>
            {event.title && <Link className={event.type !== 'group' ? 'post':null} to={`/${event.type}`}>{event.title} </Link>}
            {!status && <span className="active"></span>}
          </p>
          <p>{date} </p>
        </div>
        {event.message && <p className="message">{event.message} </p>}
      </header>
      </div>
      {event.image && <Link to={'/'}><img src={`./assets/images/image-${event.image}.webp`} /></Link> }
    </div>
  );
}
