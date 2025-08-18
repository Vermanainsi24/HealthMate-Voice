"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IconArrowRight } from "@tabler/icons-react";

export type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  vapiAgentId?: string | null;
  subscriptionRequired: boolean;
};

type Props = {
  doctorAgent: DoctorAgent;
};

function DoctorAgentCard({ doctorAgent }: Props) {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>("");
  const router = useRouter();
  const { has } = useAuth();
  // Determine if user has "pro" plan; fallback to false
  // @ts-ignore
  const paidUser = has && has({ plan: "pro" });

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: doctorAgent,
      });
      if (res.data?.sessionId) {
        router.push(`/dashboard/medical-agent/${res.data.sessionId}`);
        toast.success("Consultation started successfully!");
      }
    } catch (err) {
      console.error("Error creating session:", err);
      toast.error("Failed to start consultation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg hover :border2 transition px-2 py-2">
      {doctorAgent.subscriptionRequired && (
        <Badge className="bg-neutral-800 text-white absolute top-2 right-2 rounded-md">
          Premium
        </Badge>
      )}
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={340}
        height={180}
        className="w-full h-[180px] object-cover rounded-xl"
        priority
      />
      <h2 className="font-bold text-lg mt-2">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1 text-sm text-gray-600 flex-grow">
        {doctorAgent.description}
      </p>
      
      <Button
  className="w-full mt-4 bg-blue-500 text-white text-[10px] font-semibold px-3  flex items-center justify-center gap-2 rounded-lg hover:bg-blue-600 transition-all"
  onClick={onStartConsultation}
  disabled={loading || (doctorAgent.subscriptionRequired && !paidUser)}
  aria-label="Start Consultation"
  // ensures a minimum button height for visual consistency
>
  <span className="truncate">Start Consultation</span>
  {loading ? (
    <Loader2 className="animate-spin w-4 h-4" />
  ) : (
    <IconArrowRight className="w-4 h-4 font-bold" />
  )}
  
</Button>

    </div>
  );
}

export default DoctorAgentCard;
