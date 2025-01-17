import { LampDemo } from "@/components/Framer-motion/LampDemo";
import { Spotlight } from "@/components/Framer-motion/Spotlight";
import { Hero } from "./_components/Hero";
import Image from "next/image";
import { AnimatedTestimonialsDemo } from "@/components/Framer-motion/AnimatedTestimonialsDemo";

export default function Home() {
  return (
    <div className="w-full  min-h-screen">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#15ff00"
      />
      <div className="w-full flex flex-col gap-1 items-center justify-center" >
        <Hero />

        <div className="w-full relative max-w-5xl mx-auto">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[580px] rounded-xl shadow-lg bg-transparent">
            <div className="relative w-full h-full rounded-md">
              <Image
                src="/hero.PNG"
                alt="dashboard"
                fill
                className="object-contain w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>

      </div>
      <LampDemo />



      <AnimatedTestimonialsDemo />


      <p className="w-full mt-28 mb-10 text-sm text-green-600 flex justify-center items-center gap-2">
        <span>Developed by</span>
        <a href="https://www.linkedin.com/in/tahjib/" className="font-bold"> Tahjib Hossain Leon</a>
      </p>
    </div>
  );
}