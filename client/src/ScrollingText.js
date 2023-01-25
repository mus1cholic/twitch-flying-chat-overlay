import React, { useState, useEffect, useRef } from 'react';

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

const ScrollingText = (text) => {
  // TODO: make text not overlap with each other
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const textLength = text.length;
  const [textPos, setTextPos] = useState(windowSize.current[0]);
  const [textY] = useState(getRandom(150, windowSize.current[1] - 150)); // Subtract 150 because of size of text
  const [finished, setFinished] = useState(false);

  // TODO: find a better way to implement this
  
  let intervalId = null;
  
  useEffect(() => {
    if (textPos < 0 - (textLength * 2)) {
      setFinished(true);
      return;
    }
    intervalId = setInterval(() => {
      setTextPos(textPos => textPos - getRandom(5, 10)); // TODO: variable speeds based on length
      if (textPos < 0 - (textLength * 2)) {
        clearInterval(intervalId);
        // setFinished(true);
      }
    }, 10);
  
    return () => {
      clearInterval(intervalId);
      // setFinished(true);
    };
  }, [textPos]);

  // console.log(textPos);
  // console.log(finished);

  return (
    !finished ?
    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute', left: textPos, top: textY, fontSize: 100, color: 'white'}}>
      {text.children}
    </div>
    : null
  );
};

export default ScrollingText;
