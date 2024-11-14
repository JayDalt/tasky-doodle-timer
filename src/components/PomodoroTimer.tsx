import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [interval, setInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [interval]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setInterval(id);
    }
  };

  const pauseTimer = () => {
    if (interval) clearInterval(interval);
    setInterval(null);
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (interval) clearInterval(interval);
    setInterval(null);
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center">
        <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button onClick={startTimer} variant="outline" size="icon">
              <PlayCircle className="h-6 w-6" />
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline" size="icon">
              <PauseCircle className="h-6 w-6" />
            </Button>
          )}
          <Button onClick={resetTimer} variant="outline" size="icon">
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
};