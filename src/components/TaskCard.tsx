import { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    notes?: string;
  };
  onToggle: (id: string) => void;
}

export const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="task-card animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(task.id)}
            className="text-primary hover:scale-110 transition-transform"
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <span className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-muted rounded-full transition-colors"
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      
      {expanded && task.notes && (
        <div className="mt-4 p-4 bg-muted rounded-lg animate-fade-in">
          <p className="text-sm text-gray-600">{task.notes}</p>
        </div>
      )}
    </div>
  );
};