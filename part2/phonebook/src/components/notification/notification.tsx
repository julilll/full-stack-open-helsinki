import React from "react";
import './notification.css'

export type NotificationProps = {
  message?: string;
  status?: "error" | "success";
};

const Notification = ({ message, status }: NotificationProps) => {
  if (!message) {
    return null;
  }

  return <div className={status} id="notification">{message}</div>;
};

export default Notification;
