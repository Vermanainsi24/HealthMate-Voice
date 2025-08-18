"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import {
  IconMicrophone,
  IconFileText,
  IconHeartbeat,
  IconPill,
  IconReportMedical
} from "@tabler/icons-react";

import { motion } from "motion/react";
; // assuming you're using framer-motion
import Image from "next/image";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-10 mb-10">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

// import { motion } from "framer-motion";

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 8, rotate: 2, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -8, rotate: -2, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-3 p-2 rounded-xl"
    >
      {/* Doctor message */}
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.1] rounded-2xl p-2"
      >
        <img
          src="https://img.freepik.com/premium-photo/3d-render-women-doctor-avatar-round-sticker-with-cartoon-character-face-user-id-thumbnail-modern_1181551-66.jpg"
          alt="Doctor Avatar"
          className="h-8 w-8 rounded-full object-contain"
        />
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </motion.div>

      {/* Patient message */}
      <motion.div
        variants={variantsSecond}
        className="flex flex-row items-center justify-end space-x-2 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.1] rounded-2xl p-2 w-3/4 ml-auto"
      >
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <img
          src="/patient.png"
          alt="Patient Avatar"
          className="h-8 w-8 rounded object-contain"
        />
      </motion.div>

      {/* Doctor message */}
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.1] rounded-2xl p-2"
      >
        <img
          src="https://img.freepik.com/premium-photo/3d-render-women-doctor-avatar-round-sticker-with-cartoon-character-face-user-id-thumbnail-modern_1181551-66.jpg"
          alt="Doctor Avatar"
          className="h-8 w-8 rounded-full object-contain"
        />
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

// export default SkeletonOne;


const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };

  const [widths, setWidths] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Only generate random widths on client
    setWidths(new Array(6).fill(0).map(() => `${Math.random() * (100 - 40) + 40}%`));
  }, []);

  if (widths.length === 0) {
    // Render nothing on server to avoid mismatch
    return null;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {widths.map((w, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{ maxWidth: w }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        />
      ))}
    </motion.div>
  );
};




const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col items-center justify-center space-y-2 overflow-hidden"
      style={{
        background:
          "linear-gradient(-45deg, #c2cae3ff, #e1d7d7ff, #f2f9fbff, #c2dbd5ff)",
        backgroundSize: "500% 400%",
      }}
    >
      <motion.div className="h-full w-full flex items-center justify-center">
        <Image
          src="/sick-9768413_640.png" // your image path
          alt="Example"
          width={250}
          height={300}
          className="rounded-lg shadow-lg   object-contain w-full h-full" 
        />
      </motion.div>
    </motion.div>
  );
};

export default SkeletonThree;

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      {/* Card 1 - Voice Patient Interaction */}
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="https://media.istockphoto.com/vectors/human-hand-holding-smartphone-with-video-call-to-man-doctor-character-vector-id1339331011?k=20&m=1339331011&s=612x612&w=0&h=SUmU62PwLo-YLQzJ0VL3PTzES5Je9fUQHCGJ7VPS10E="
          alt="Voice Call"
          className="object-contain w-full h-24"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Voice-based patient consultations
        </p>
        <p className="border border-blue-500 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Real-time
        </p>
      </motion.div>

      {/* Card 2 - Medical Transcription */}
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2012/04/02/12/50/ambulance-24405_1280.png"
          alt="Transcription"
          className="object-contain w-full h-24"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Automated medical transcription
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Accurate
        </p>
      </motion.div>

      {/* Card 3 - Symptom Analysis */}
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="https://cdn.pixabay.com/photo/2025/08/04/10/18/ai-generated-9753805_1280.jpg"
          alt="Symptom Analysis"
          className="object-contain w-full h-24"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          AI-driven symptom analysis
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Predictive
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {/* Doctor message */}
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2 bg-white dark:bg-black"
      >
        <img
          src="https://img.freepik.com/premium-photo/3d-render-women-doctor-avatar-round-sticker-with-cartoon-character-face-user-id-thumbnail-modern_1181551-66.jpg"
          alt="Doctor Avatar"
          className="object-contain h-10 w-10 rounded-full"
        />
        <p className="text-xs text-neutral-500">
          Hello, I’ve reviewed your symptoms. Can you confirm if you’ve been
          experiencing shortness of breath as well?
        </p>
      </motion.div>

      {/* Patient reply */}
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black float-right"
      >  
          
        <p className="text-xs text-neutral-500">Yes, doctor, since yesterday.</p>
        <img
          src="/patient.png"
          alt="paient Avatar"
          className="object-contain h-10 w-10 rounded"
        />
        {/* <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 shrink-0" /> */}
      </motion.div>
    </motion.div>
  );
};


const items = [
  {
    title: "Voice-Based Patient Interaction",
    description: (
      <span className="text-sm">
        Engage with patients through natural, AI-driven voice conversations.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: (
      <IconMicrophone className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
  },
  {
    title: "Automated Medical Transcription",
    description: (
      <span className="text-sm">
        Convert doctor-patient conversations into accurate medical notes instantly.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: (
      <IconFileText className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
  },
  {
    title: "Symptom Analysis & Triage",
    description: (
      <span className="text-sm">
        Analyze patient-reported symptoms and suggest next steps using AI.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: (
      <IconHeartbeat className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
  },
  {
    title: "Medication Reminders",
    description: (
      <span className="text-sm">
        Send personalized, voice-enabled medication reminders to patients.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: (
      <IconPill className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
  },
  {
    title: "AI Health Report Generator",
    description: (
      <span className="text-sm">
        Create detailed patient health reports from voice interactions in seconds.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: (
      <IconReportMedical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
  },
];
