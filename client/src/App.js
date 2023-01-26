import React from 'react';

import openSocket from 'socket.io-client';
import ScrollingText from './ScrollingText';

function App() {
  const socket = openSocket('http://localhost:3000');
  const [msgs, setMsgs] = React.useState([]);

  React.useEffect(() => {
    socket.on('data', data => {
      console.log("recieved");
      // setMsgs(prevMsgs => [...prevMsgs, data.message]);
      setMsgs(prevMsgs => [...prevMsgs, {
        message: data.message,
        color: data.color
      }]);
    });

    return () => {
      socket.off('data');
    }
  }, []);

  return (
    <div>
      {msgs.map((obj, index) => (
        <ScrollingText key={index} text={obj.message} color={obj.color}>
        </ScrollingText>
      ))}
    </div>
  );
}

export default App;
