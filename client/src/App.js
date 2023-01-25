import React from 'react';

import openSocket from 'socket.io-client';
import ScrollingText from './ScrollingText';

function App() {
  const socket = openSocket('http://localhost:3000');
  const [msgs, setMsgs] = React.useState([]);

  React.useEffect(() => {
    socket.on('data', data => {
      console.log("recieved");
      setMsgs(prevMsgs => [...prevMsgs, data.message]);
    });

    return () => {
      socket.off('data');
    }
  }, []);

  return (
    <div>
      {msgs.map((text, index) => (
          <ScrollingText key={index}>
            {text}
          </ScrollingText>
      ))}
    </div>
  );
}

export default App;
