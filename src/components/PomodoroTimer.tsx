import { useState, useEffect } from "react";
import { PlayCircle, PauseCircle, RefreshCw } from "lucide-react";

export const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const reset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="glass p-8 rounded-2xl text-center max-w-sm mx-auto animate-fade-in">
      <div className="text-6xl font-light mb-8">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="p-2 hover:scale-110 transition-transform text-primary"
        >
          {isActive ? (
            <PauseCircle className="w-12 h-12" />
          ) : (
            <PlayCircle className="w-12 h-12" />
          )}
        </button>
        <button
          onClick={reset}
          className="p-2 hover:scale-110 transition-transform text-gray-400"
        >
          <RefreshCw className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};