"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import Image from "next/image";

export function LampDemo() {
  return (
    <LampContainer>
      <div className="relative flex flex-col md:flex-row items-center justify-between mt-16 md:mt-0">
        <motion.h1
          initial={{ opacity: 0.5, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-br from-blue-300 via-teal-500 to-blue-600 bg-clip-text text-4xl md:text-7xl font-extrabold tracking-tight text-transparent drop-shadow-lg text-center md:text-left mt-120"
        >
          Transform Healthcare <br /> with AI Voice Assistants
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="mt-6 md:mt-140 md:ml-8"
        >
          <Image src="/consult.png" alt="Lamp" width={300} height={300} />
        </motion.div>
      </div>
    </LampContainer>
  );
}
