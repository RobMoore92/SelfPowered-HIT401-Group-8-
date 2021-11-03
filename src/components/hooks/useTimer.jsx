import React, { useEffect, useState } from "react";
import formatTimer from "../../helpers/formatTimer";

const useTimer = (due, completed) => {
  const [timer, setTimer] = useState(formatTimer(due, completed));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(formatTimer(due, completed));
    }, 100);
    return () => clearInterval(interval);
  }, [completed]);
  return timer;
};

export default useTimer;
