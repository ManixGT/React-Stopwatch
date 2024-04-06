import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log(startTimeRef.current, "refObj");
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliS = Math.floor((elapsedTime % 1000) % 10);

    hours = String(hours).padStart(2, "00");
    minutes = String(minutes).padStart(2, "00");
    seconds = String(seconds).padStart(2, "00");
    miliS = String(miliS).padStart(2, "00");

    return `${hours}:${minutes}:${seconds}:${miliS}`;
  }

  return (
    <>
      <div>
        <div>{formatTime()}</div>
        <div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
}
