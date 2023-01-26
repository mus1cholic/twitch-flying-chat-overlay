import React from 'react';

import openSocket from 'socket.io-client';
import ScrollingText from './ScrollingText';

function App() {
  const socket = openSocket('http://localhost:3000');
  const [msgs, setMsgs] = React.useState([]);

  React.useEffect(() => {
    socket.on('data', data => {
      setMsgs(prevMsgs => [...prevMsgs, {
        message: data.message,
        color: data.color,
        // y: data.y,
        scrollSpeed: data.scrollSpeed
      }]);
    });

    return () => {
      socket.off('data');
    }
  }, [socket]);

  return (
    <div>
      {msgs.map((obj, index) => (
        <ScrollingText key={index} text={obj.message} color={obj.color} y={obj.y} scrollSpeed={obj.scrollSpeed}>
        </ScrollingText>
      ))}
    </div>
  );
}

export default App;
