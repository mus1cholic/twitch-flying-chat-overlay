import React, { useState, useEffect, useRef } from 'react';

// helper function to get random integer between min and max
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const ScrollingText = (props) => {
  const text = props.text;
  const color = props.color;
  const scrollSpeed = props.scrollSpeed;

  // TODO: make text not overlap with each other
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const textLength = text.length;
  const [textPos, setTextPos] = useState(windowSize.current[0]);
  const [textY] = useState(getRandom(150, windowSize.current[1] - 150)); // Subtract 150 because of size of text
  const [finished, setFinished] = useState(false);
  
  useEffect(() => {
    if (textPos < 0 - (textLength * 2)) {
      setFinished(true);
      return;
    }

    let intervalId = setInterval(() => {
      setTextPos(textPos => textPos - scrollSpeed); // TODO: variable speeds based on length
      if (textPos < 0 - (textLength * 2)) {
        clearInterval(intervalId);
      }
    }, 10);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [textPos, textLength, scrollSpeed]);

  return (
    !finished ?
    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute', left: textPos, top: textY, fontSize: 80, color: color}}>
      {text}
    </div>
    : null
  );
};

export default ScrollingText;
