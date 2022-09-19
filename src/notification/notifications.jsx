import { useState } from "react";
import dummyNotification from "./notificationData";
import Notification from "./notification";
import "./notification.css";

export default function Notifications() {
  const [notifications, setNotification] = useState(dummyNotification);

  const unread = notifications.filter(
    (notification) => notification.status
  ).length;

  function handleAllStatus() {
    const changeStatus = notifications.reduce((acc, curr) => {
      curr.status = true;
      acc.push(curr);
      return acc;
    }, []);
    
    setNotification(changeStatus)
  }


  return (
    <div className="notifications">
      <header className="titlebar">
        <h3>
          Notification <span className="unread">{unread} </span>
        </h3>
        <button onClick={handleAllStatus}>Mark all as read</button>
      </header>
      <main>
        {notifications.map((notification, index) => (
          <Notification key={index} notification={notification}  />
        ))}
      </main>
    </div>
  );
}
