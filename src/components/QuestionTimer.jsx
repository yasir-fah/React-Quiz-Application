import { useState, useEffect } from "react";

function QuestionTimer({ onFinish, timer, mode }) {
  const [intervalState, setIntervalState] = useState(timer);

  useEffect(() => {
    const timerCounter = setTimeout(onFinish, timer);

    // when effect() execute twice || it's component unmount
    return () => {
      clearTimeout(timerCounter);
    };
  }, [onFinish, timer]); // when done || when new timer (parent re-render)

  // wrap at with "useEffect()" to make it render only 1 time, after 1st render:
  useEffect(() => {
    setIntervalState(timer); // reset timer
    const interval = setInterval(() => {
      setIntervalState((current) => current - 100);
    }, 100);

    // since we in 'StrictMode', effect() render 2 times, and this is a case of triggering clean-up() => will remove old effect()
    return () => {
      clearInterval(interval); // when got new timer (parent re-render)
    };
  }, []);

  return <progress value={intervalState} max={timer} className={mode} />;
}

export default QuestionTimer;
