"use client"

import { useTaskContext } from '@/context/task-provider';
import { Task } from '@/types/task-interface';
import { Download, File, Send } from 'lucide-react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import userImg from '@/public/img/user.jpg'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TaskDetail = () => {
    const { tasks } = useTaskContext()
    const pathname = usePathname()
    const taskId = pathname.split('/')[2];

    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    useEffect(() => {
        if (taskId) {
            const task = tasks.find((task) => task.id === taskId);
            if (task) {
                setCurrentTask(task);
            } else {
                console.error('Task not found');
            }
        }
    }, [taskId, tasks]);

    return (
        <div className='py-2 md:py-0 px-2 md:px-4 flex flex-col-reverse md:flex-row w-full gap-4'>
            <div className='py-6 px-4 md:px-6 flex flex-col gap-6 bg-background rounded-lg w-full md:w-80 md:min-h-[84vh]'>
                <h2 className='font-medium text-2xl'>Task Assigned By</h2>
                <Image src={userImg} alt='user_img' className='w-16 aspect-square rounded-full object-cover' />
                <div>
                    <h3 className='text-md md:text-lg font-semibold flex items-center gap-2'>Emily Carter <span className='py-.5 px-2 rounded-full bg-purple-500 text-sm'>End-User</span></h3>
                    <span className='underline text-sm'>emily.williams@example.com</span>
                </div>
                <p className='text-sm md:text-base text-muted-foreground line-clamp-6'>A long-term customer of the company, having been associated with our services for over 3 years. She primarily uses our project management software to manage her team of freelancers. Emily values efficiency and regularly provides constructive feedback that helps improve the software&apos;s user experience. She’s active in community discussions and has recommended our services to her peers, making her a valuable advocate for our brand.</p>
            </div>

            <div className='py-6 px-4 md:px-6 flex flex-col gap-6 bg-background rounded-lg w-full md:min-h-[84vh]'>
                <div className='flex flex-wrap items-center gap-2'>
                    <h2 className='text-2xl md:text-4xl'>
                        {currentTask?.title}
                    </h2>
                    {currentTask?.priority === 'High' && (<span className="font-semibold mb-4 py-1 px-2 h-fit text-base rounded-lg text-white bg-amber-900/90">{currentTask?.priority} Priority</span>)}
                    {currentTask?.priority === 'Medium' && (<span className="font-semibold mb-4 py-1 px-2 h-fit text-base rounded-lg text-white/80 bg-amber-900/60">{currentTask?.priority} Priority</span>)}
                    {currentTask?.priority === 'Low' && (<span className="font-semibold mb-4 py-1 px-2 h-fit text-base rounded-lg text-white/60 bg-amber-900/30">{currentTask?.priority} Priority</span>)}
                </div>
                <p className='text-md md:text-lg'>{currentTask?.description}</p>

                <div className='flex items-center gap-2'>
                    <span>Status:</span>
                    <span
                        className={`inline-block px-2 py-1 text-sm rounded-full ${currentTask?.status === "Complete" ? "bg-green-500 text-neutral-100" : "bg-red-500 text-neutral-100"
                            }`}
                    >
                        {currentTask?.status}
                    </span>
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-semibold'>Attachements</h4>
                    <ul className='flex flex-col gap-2'>
                        {currentTask?.attachments?.map((name) => (
                            <li key={name} className="flex justify-between items-center bg-secondary px-4 py-2 text-sm rounded-md">
                                <div className='flex items-center gap-2'>
                                    <File size={16} />
                                    <span>{name}</span>
                                </div>
                                <Button size='sm'>Download <Download size={16}/></Button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-semibold'>Thread</h4>
                    <div className='flex items-center gap-2'>
                        <Input type='text'
                            placeholder='Your message...'
                        />
                        <Send size={18}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail