import React from 'react';

const Page = () => {
  const showNotification = () => {
    if ('Notification' in window) {
      // Check if the browser supports notifications
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // If permission is granted, show the notification
          new Notification('Judjen - New Story', {
            body: 'Mark Sholio 101 posted a new story'
          });
        }
      });
    }
  };

  return (
    <div>
      <h1>Notification Example</h1>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default Page;
