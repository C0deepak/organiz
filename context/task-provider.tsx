"use client"

import { Task, TaskContextType } from "@/types/task-interface";
import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("organiz-tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("organiz-tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => {
        setTasks((prev) => {
            const updatedTasks = [...prev, task];
            localStorage.setItem("organiz-tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const editTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const changePriority = (id: string, priority: Task["priority"]) => {
        editTask(id, { priority });
    };

    const toggleStatus = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "Complete" ? "Incomplete" : "Complete" }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, changePriority, toggleStatus }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
    return context;
};
