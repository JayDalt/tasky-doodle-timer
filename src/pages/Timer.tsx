import { Sidebar } from "../components/Sidebar";
import { PomodoroTimer } from "../components/PomodoroTimer";

const Timer = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Focus Timer</h2>
          <PomodoroTimer />
        </div>
      </main>
    </div>
  );
};

export default Timer;