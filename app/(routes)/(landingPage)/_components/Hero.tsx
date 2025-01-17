'use client'
import { HeroSection } from "@/components/Framer-motion/HeroSection";
import { TextGenerateEffect } from "@/components/Framer-motion/TextGenerateEffect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

const words = `Empower your creativity with Gemini AI – the ultimate tool to build, customize, and share forms effortlessly. Turn your ideas into interactive forms faster than ever before!`;

export function Hero() {



    return (
        <HeroSection className="flex items-center justify-center w-full flex-col px-4 bg-[#dbf5e1]">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-slate-900 to-slate-700 mt-10 md:mt-0 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    FormEgde AI
                </h2>
                <TextGenerateEffect words={words} />


                <Button variant={"default"} className=" rounded-full md:px-6 md:py-4 md:text-lg px-4 py-2 text-base">
                    <RegisterLink>
                        Get&apos;s Started
                    </RegisterLink>
                </Button>
            </motion.div>
        </HeroSection>
    );
}