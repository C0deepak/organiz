"use client"

import { useTaskContext } from '@/context/task-provider'
import { Task, TaskViewerProps } from '@/types/task-interface'
import { ChevronRight, CircleDot, CirclePlus, File, PencilLine, Trash } from 'lucide-react'
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import Link from 'next/link';
// import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
// import { Droppable } from '../ui/droppable';
// import { Draggable } from '../ui/draggable';

const TaskViewer: React.FC<TaskViewerProps> = ({ groupedTasks }) => {
    const { toggleStatus, editTask, deleteTask } = useTaskContext()
    const [isOpen, setIsOpen] = useState(false)

    const [task, setTask] = useState({
        id: Date.now().toString(),
        title: "",
        description: "",
        priority: "Medium" as "High" | "Medium" | "Low",
        status: "Incomplete" as "Complete" | "Incomplete",
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        attachments: [] as string[],
    });

    const handleEditClick = (task: Task) => {
        setTask({ ...task });
        setIsOpen(true)
    }

    const handleChange = (field: keyof typeof task, value: string) => {
        setTask((prev) => ({ ...prev, [field]: value }));
    };

    const deleteFile = (fileName: string) => {
        setTask((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((name) => name !== fileName),
        }));
    };

    const handleSubmit = () => {
        console.log(task)
        if (!task.title) return alert("Title is required!");
        editTask(task.id, task);
        setTask({
            id: Date.now().toString(),
            title: "",
            description: "",
            priority: "Medium" as "High" | "Medium" | "Low",
            status: "Incomplete" as "Complete" | "Incomplete",
            createdAt: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            attachments: [] as string[],
        })
        setIsOpen(false)
    };

    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     console.log("active : ", active)
    //     console.log("over : ", over)

    //     if (!over) return;
    //     const sourcePriority = active.data.current?.priority as Task['priority'];
    //     const destinationPriority = over.id as Task['priority'];

    //     if (sourcePriority !== destinationPriority) {
    //         const taskId = active.id as string;
    //         changePriority(taskId, destinationPriority);
    //     }
    // };

    return (
        // <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12'>
                {Object.entries(groupedTasks).map(([priority, tasks]) => (
                    // <Droppable key={priority} id={priority}>
                    <div key={priority}>
                        {priority === 'High' && (<h2 className="text-lg font-semibold mb-4 p-2 rounded-lg text-white bg-amber-900/90">{priority} Priority</h2>)}
                        {priority === 'Medium' && (<h2 className="text-lg font-semibold mb-4 p-2 rounded-lg text-white/80 bg-amber-900/60">{priority} Priority</h2>)}
                        {priority === 'Low' && (<h2 className="text-lg font-semibold mb-4 p-2 rounded-lg text-white/60 bg-amber-900/30">{priority} Priority</h2>)}

                        {tasks.length > 0 ? (
                            <ul className="space-y-4">
                                {tasks.map((task) => (
                                    // <Draggable key={task.id} id={task.id} data={{ priority }}>
                                        <li key={task.id} className="bg-background border p-4 rounded-md space-y-4 md:relative group overflow-hidden">
                                            <div className='fixed md:absolute bottom-0 md:top-0 left-0 w-full h-20 md:h-full bg-background/30 backdrop-blur-md hidden group-hover:flex items-center justify-center gap-6'>
                                                {task.status === 'Incomplete' && (
                                                    <div className='flex items-center justify-center cursor-pointer w-12 aspect-square rounded-full bg-sky-500 text-white' onClick={() => toggleStatus(task.id)}>
                                                        <CirclePlus size={20} />
                                                    </div>
                                                )}
                                                {task.status === 'Complete' && (
                                                    <div className='flex items-center justify-center cursor-pointer w-12 aspect-square rounded-full bg-sky-500 text-white' onClick={() => toggleStatus(task.id)}>
                                                        <CircleDot size={20} />
                                                    </div>
                                                )}
                                                <div className='flex items-center justify-center cursor-pointer w-12 aspect-square rounded-full bg-yellow-500 text-white' onClick={() => handleEditClick(task)}>
                                                    <PencilLine size={20} />
                                                </div>
                                                <div className='flex items-center justify-center cursor-pointer w-12 aspect-square rounded-full bg-red-500 text-white' onClick={() => deleteTask(task.id)}>
                                                    <Trash size={20} />
                                                </div>
                                                <Link href={`/tasks/${task.id}`} className='flex items-center justify-center cursor-pointer w-12 aspect-square rounded-full bg-green-500 text-white'>
                                                    <ChevronRight size={20} />
                                                </Link>
                                            </div>
                                            <h3 className="font-semibold">{task.title}</h3>
                                            <p className="text-sm line-clamp-3">{task.description}</p>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Created Date : {new Date(task.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Due Date : {new Date(task.dueDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span
                                                className={`inline-block px-2 py-1 text-sm rounded-full ${task.status === "Complete" ? "bg-green-500 text-neutral-100" : "bg-red-500 text-neutral-100"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>
                                        </li>
                                    // </Draggable>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No tasks available.</p>
                        )}
                    </div>
                    // </Droppable>
                ))}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-2xl overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Task Here</DialogTitle>
                            <DialogDescription>
                                Edit & Manage your task easily.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full flex flex-col gap-2">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Client meeting"
                                    value={task.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea
                                    value={task.description}
                                    placeholder="Prepare slides for the client meeting..."
                                    onChange={(e) => handleChange("description", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Priority</Label>
                                <Select
                                    value={task.priority}
                                    onValueChange={(e) => handleChange("priority", e)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={task.priority} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Status</Label>
                                <Select
                                    value={task.status}
                                    onValueChange={(e) => handleChange("status", e)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={task.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Incomplete">Incomplete</SelectItem>
                                        <SelectItem value="Complete">Complete</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Attachments</Label>
                                <Input
                                    type="file"
                                    className="w-full border-gray-300 rounded-md"
                                    multiple
                                    onChange={(e) => {
                                        const fileNames = Array.from(e.target.files || []).map((file) => file.name);
                                        setTask((prev) => ({ ...prev, attachments: [...prev.attachments, ...fileNames] }));
                                    }}
                                />
                                <ul className='flex flex-col gap-2 mt-2'>
                                    {task.attachments.map((name) => (
                                        <li key={name} className="flex justify-between items-center bg-secondary px-4 py-1.5 text-sm rounded-md">
                                            <div className='flex items-center gap-2'>
                                                <File size={16} />
                                                <span>{name}</span>
                                            </div>
                                            <button
                                                onClick={() => deleteFile(name)}
                                                className="text-red-500"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleSubmit}
                            >
                                Save Task
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        // </DndContext>
    )
}

export default TaskViewer