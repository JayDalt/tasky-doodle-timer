import { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    notes?: string;
    createdAt?: Date;
  };
  onToggle: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const TaskCard = ({ task, onToggle, onUpdateNotes }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [noteContent, setNoteContent] = useState(task.notes || "");

  const handleNoteSave = () => {
    onUpdateNotes(task.id, noteContent);
  };

  const notePreview = task.notes ? task.notes.slice(0, 100) + (task.notes.length > 100 ? "..." : "") : "No notes yet";

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
        <div className="flex items-center gap-2">
          {task.createdAt && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Calendar className="w-4 h-4" />
              {format(task.createdAt, "MMM d, yyyy")}
            </div>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                <p className="text-sm text-gray-600">{notePreview}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Notes for "{task.title}"</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Add your notes here..."
                  className="min-h-[200px]"
                />
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
      )}
    </div>
  );
};