"use client";
import React ,{useEffect} from "react";
import { motion } from "motion/react";
import { BentoGridThirdDemo } from "@/_component/BentoGridThirdDemo";
import {LampDemo} from "@/_component/LampDemo";
import {SparklesPreview} from "@/_component/SparklesPreview";
import {UserButton, useUser} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
;

/**
 * Navbar Component
 */

const Navbar = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in"); // redirect to login if not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

 

  return (
   // Assuming you're using Clerk for auth

    <nav className="flex w-full items-center justify-between border-b border-neutral-300 bg-neutral-`00 px-4 py-4 text-black shadow-lg ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="2465196.jpg" alt="HealthMate Voice" className="w-16 h-10" />
        <h1 className="text-base font-bold md:text-2xl">
          <span className="text-green-400">HealthMate</span>{" "}
          <span className="text-black">Voice</span>
        </h1>
      </div>

      {/* Auth / Dashboard */}
      {!user ? (
        <Link href="/sign-in">
          <Button className="w-24 md:w-32 rounded-lg bg-black px-6 py-2 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </Button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Link href="/dashboard">
            <Button className="bg-blue-200 hover:bg-blue-400 rounded-lg">
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};




/**
 * Main Home Component
 */
export default function Home() {
  return (
    <div className=" mx-0  my-0 flex w-full flex-col items-center justify-center">
      {/* Navbar */}
       <Navbar />
      <div className="relative mx-auto  my-6 flex w-full h-screen flex-col items-center justify-center" >
        <LampDemo />
      </div>

      
        {/* Subtitle */}
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
  className="mx-auto w-full rounded-2xl bg-white dark:bg-neutral-800 shadow-md p-6 md:p-8 text-center"
>
  <p className="text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-300 px-10 ">
    Provide 24/7 intelligent medical support using conversational AI.
    Triage symptoms, book appointments, and deliver empathetic care with<br/>
    voice-first automation.
  </p>
</motion.div>


        {/* Getting Started Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-8 flex justify-center"
        >
          <Link href={"/sign-in"}>
            <button className="w-60  h-14 rounded-lg bg-black px-6 py-2 font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Getting Started
            </button>
          </Link>
        </motion.div>

        {/* Infinite Moving Cards Section */}
       
      {/* </div> */}
      <BentoGridThirdDemo />

      <SparklesPreview />
      
    </div>
  );
}
