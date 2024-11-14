import { useState } from "react";
import { CheckCircle, Circle, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    notes?: string;
    createdAt?: Date;
    priority?: "low" | "medium" | "high";
    description?: string;
  };
  onToggle: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const TaskCard = ({ task, onToggle, onUpdateNotes }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState(task.notes || "");

  const handleNoteSave = () => {
    onUpdateNotes(task.id, noteContent);
    setIsOpen(false);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="task-card animate-fade-in">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id);
            }}
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
        <div className="flex items-center gap-2">
          {task.createdAt && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Calendar className="w-4 h-4" />
              {format(task.createdAt, "MMM d, yyyy")}
            </div>
          )}
          {task.priority && (
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {task.description && (
              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            )}
            {task.priority && (
              <div className="space-y-2">
                <h4 className="font-medium">Priority</h4>
                <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            )}
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <Textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[100px]"
              />
            </div>
            <button
              onClick={handleNoteSave}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Notes
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};