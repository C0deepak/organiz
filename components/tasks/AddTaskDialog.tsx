"use client"

import { useTaskContext } from "@/context/task-provider";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { File, Plus, Trash } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const AddTaskDialog = () => {
    const { addTask } = useTaskContext();
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
        addTask(task);
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

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="w-full md:w-fit">Add Task <Plus size={18} /></Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Task Here</DialogTitle>
                        <DialogDescription>
                            Fill out the details to create your task and stay on top of your priorities.
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
        </>
    );
};

export default AddTaskDialog;
