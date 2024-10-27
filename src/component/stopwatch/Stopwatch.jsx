import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

// Start function  
  const start = () => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals

    const startTime = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10); // Update every 10 milliseconds
  };

//   Lap function
  const lap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };  

  // Stop function  
  const stop = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Reset function  
  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  // Format function  
  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <>
    <div className='stopwatch'>
      <h1><u>STOPWATCH</u></h1>
      <div className='display'>{formatTime(time)}</div>
      <div className='controls'>
      <button onClick={start} className='start-btn'>Start</button>
      <button onClick={lap} className='Lap-btn'>Lap</button>
      <button onClick={stop} className='stop-btn'>Stop</button>
      <button onClick={reset} className='reset-btn'>Reset</button>
      </div>
    </div>
    <ol>
        {laps.map((lapTime) => (
            <li>{formatTime(lapTime)}</li>
        ))}
    </ol>
    </>
  );
};

export default Stopwatch;
