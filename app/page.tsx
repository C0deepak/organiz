import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import heroImg from '@/public/img/hero1.png'
import bgGrid from '@/public/img/bgGridDot.svg'

export default function Home() {
  return (
    <div className="p-6 md:p-16 pt-12 md:pt-16 flex flex-col gap-12 md:gap-16 items-center justify-center">
      <Image src={bgGrid} alt='bg_grid' className='absolute w-full top-0 left-0 -z-10' />

      <div className="flex flex-col gap-6 max-w-2xl items-center justify-center">
        <h1 className="text-center font-bold text-4xl md:text-6xl">Own your <span className="text-primary">Tasks, </span>Own your <span className="text-primary">Time.</span></h1>
        <p className="text-center">Stay organized, track progress, and achieve more with Organiz.! Simplify your workflow and make every task count - because your time deserves better.</p>
        <Link href='/tasks' className="w-fit">
          <Button>Manage Task</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-background border-8 rounded-2xl shadow-xl">
        <Image src={heroImg} alt="hero-img" className="w-full rounded-lg max-w-7xl" />
      </div>
    </div>
  );
}
