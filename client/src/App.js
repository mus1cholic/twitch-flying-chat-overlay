import React from 'react';

import openSocket from 'socket.io-client';
import ScrollingText from './ScrollingText';

function App() {
  const socket = openSocket('http://localhost:3000');
  const [msgs, setMsgs] = React.useState([]);

  React.useEffect(() => {
    socket.on('data', (data) => {
      setMsgs(prevMsgs => [...prevMsgs, {
        message: data.message,
        color: data.color,
        // y: data.y,
        scrollSpeed: data.scrollSpeed,
        config: data.config
      }]);
    });

    return () => {
      socket.off('data');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {msgs.map((obj, index) => (
        <ScrollingText key={index} text={obj.message} color={obj.color} y={obj.y} scrollSpeed={obj.scrollSpeed} config={obj.config}>
        </ScrollingText>
      ))}
    </div>
  );
}

export default App;
