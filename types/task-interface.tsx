import { Dispatch, SetStateAction } from "react";

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Complete" | "Incomplete";
    createdAt: Date;
    dueDate: Date;
    attachments: string[],
}

export interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    editTask: (id: string, updatedTask: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    changePriority: (id: string, priority: Task["priority"]) => void;
    toggleStatus: (id: string) => void;
}

export interface TaskFilterProps {
    filter: "All" | "Complete" | "Incomplete";
    setFilter: Dispatch<SetStateAction<"All" | "Complete" | "Incomplete">>;
}

export interface TaskViewerProps {
    groupedTasks: {
        [key in "High" | "Medium" | "Low"]: Task[];
    };
}
