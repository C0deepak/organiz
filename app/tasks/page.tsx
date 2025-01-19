"use client"

import React, { useState } from 'react'
import bgGrid from '@/public/img/bgGridDot.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TaskFilter } from '@/components/tasks/TaskFilter'
import { Input } from '@/components/ui/input'
import AddTaskDialog from '@/components/tasks/AddTaskDialog'
import { useTaskContext } from '@/context/task-provider'
import TaskViewer from '@/components/tasks/TaskViewer'
import { Task } from '@/types/task-interface'

const Tasks = () => {
    const { tasks } = useTaskContext()

    const [filter, setFilter] = useState<"All" | "Complete" | "Incomplete">("All");
    const [search, setSearch] = useState("");

    const filteredTasks: Task[] = tasks.filter((task) => {
        const matchesFilter = filter === "All" || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const groupedTasks = {
        High: filteredTasks.filter((task) => task.priority === "High"),
        Medium: filteredTasks.filter((task) => task.priority === "Medium"),
        Low: filteredTasks.filter((task) => task.priority === "Low"),
    };

    return (
        <div>
            <div className='w-full p-2 md:p-4'>
                <div className='p-4 md:p-12 w-full relative rounded-2xl bg-background overflow-hidden'>
                    <Image src={bgGrid} alt='bg_grid' className='absolute w-full top-0 left-0' />
                    <div className="flex flex-col gap-6 max-w-3xl relative z-10">
                        <h3 className="font-bold text-3xl md:text-4xl"> <span className="text-primary">Organise </span> Your <span className="text-primary">Task,</span> <br />like never before.</h3>
                        <p className="">Take control of your workflow with ease. Manage tasks, set priorities, and track progress—all in one place. Upgrade to unlock advanced features and supercharge your productivity. Your goals deserve the best tools to succeed!</p>
                        <Link href='#' className="w-fit">
                            <Button variant='link'>Subscribe for more <ArrowRight /></Button>
                        </Link>
                    </div>
                    <img className='absolute -right-12 -bottom-12 w-44 hidden md:block' src="https://static.vecteezy.com/system/resources/thumbnails/050/981/100/small/3d-resume-icon-suitable-for-business-presentations-office-materials-task-completion-illustrations-productivity-concepts-png.png" alt="" />
                </div>
            </div>

            <div className='flex flex-col gap-12 w-full px-6 md:px-16 py-4'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div className='flex items-center gap-2 md:gap-6'>
                        <TaskFilter filter={filter} setFilter={setFilter} />
                        <div className='flex items-center gap-2'>
                            <Input
                                type="text"
                                placeholder='Search Tasks...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='text-sm bg-background md:w-80' />
                        </div>
                    </div>

                    <div>
                        <AddTaskDialog />
                    </div>
                </div>

                <TaskViewer groupedTasks={groupedTasks} />
            </div>
        </div>
    )
}

export default Tasks