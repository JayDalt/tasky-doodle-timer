import { useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { Sidebar } from "../components/Sidebar";
import { PlusCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      notes: "Include budget estimates and timeline",
    },
    {
      id: "2",
      title: "Review client feedback",
      completed: true,
      notes: "Focus on UI/UX suggestions",
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Today's Tasks</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
              <PlusCircle className="w-5 h-5" />
              Add Task
            </button>
          </div>
          
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;