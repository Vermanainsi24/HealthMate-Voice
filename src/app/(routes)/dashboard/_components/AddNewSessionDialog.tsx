// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Loader2 } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import SuggestedDoctorCard from "./SuggestedDoctorCard";
// import { DoctorAgent } from "./DoctorAgentCard";
// import { toast } from "sonner"; // or your preferred toast library
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { SessionDetail } from "../medical-agent/[sessionId]/page";
// import { useSearchParams } from 'next/navigation';
// export function AddNewSessionDialog() {
//   const [step, setStep] = useState<1 | 2>(1);
//   const [note, setNote] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>([]);
//   // const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent | null>(null);
//   const router = useRouter();
//   const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
//   const { has } = useAuth();
//   const paidUser = has && has({ plan: "pro" });
//   const searchParams = useSearchParams();
//   const doctorParam = searchParams.get('selectedDoctor');
//   const selectedDoctor = doctorParam ? JSON.parse(doctorParam) : null;

//   useEffect(() => {
//       GetHistoryList();
//     }, []);
  
//     const GetHistoryList = async () => {
//       try {
//         const response = await axios.get("/api/session-chat?sessionId=all");
//         console.log("History List:", response.data);
//         setHistoryList(response.data);
       
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       }
//     };

//   const onClickNext = async () => {
//     if (!note.trim()) {
//       toast.error("Please add some details before proceeding.");
//       return;
//     }
//     setLoading(true);

//     try {
//       const result = await axios.post("/api/suggest-doctors", { notes: note });
//       const doctorsArray: DoctorAgent[] = Array.isArray(result.data?.result)
//         ? result.data.result.map((doc: any) => ({
//             id: doc.id,
//             name: doc.name,
//             specialist: doc.specialist, // or specialization based on your data key
//             description: doc.description,
//             image: doc.image,
//             voiceId: doc.voiceId,
//             vapiAgentId: doc.vapiAgentId,
//             ...doc,
//           }))
//         : [];

//       if (doctorsArray.length === 0) {
//         toast.info("No matching doctors found. Try different details.");
//       } else {
//         setSuggestedDoctors(doctorsArray);
//         setStep(2);
//       }
//     } catch (err) {
//       console.error("Error fetching suggested doctors:", err);
//       toast.error("Failed to fetch doctors. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onStartConsultation = async () => {
//     if (!selectedDoctor) {
//       toast.error("Please select a doctor first.");
//       return;
//     }
//     setLoading(true);

//     try {
//       const res = await axios.post("/api/session-chat", {
//         notes: note,
//         selectedDoctor,
//       });
     
//       // if(res.data?.sessionId){
//       //   console.log("Session ID:", res.data.sessionId);
//       //   router.push(`/dashboard/medical-agent/${res.data.sessionId}`);
//       // }
//         if (res.data?.sessionId) {
//   console.log("Session ID:", res.data.sessionId);
//   const queryString = new URLSearchParams({
//     selectedDoctor: JSON.stringify(selectedDoctor),
//   }).toString();

//   router.push(`/dashboard/medical-agent/${res.data.sessionId}?${queryString}`);
// }



//       toast.success("Consultation started successfully!");
//       console.log("Session created:", res.data);
//     } catch (err) {
//       console.error("Error creating session:", err);
//       toast.error("Failed to start consultation. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetState = () => {
//     setStep(1);
//     setNote("");
//     // setSuggestedDoctors([]);
//     setSelectedDoctor(null);
//     setLoading(false);
//   };
  

//   return (
//     <Dialog onOpenChange={(open) => !open && resetState()}>
//       <DialogTrigger asChild>
//         <Button className="mt-2 bg-green-400 font-bold text-gray-900 px-8 hover:bg-green-500" disabled={!paidUser && historyList?.length >=1}>
//           + Start Consultation
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="bg-white dark:bg-gray-900">
//         <DialogHeader>
//           <DialogTitle className="font-bold mx-2">
//             {step === 1 ? "Add Basic Details" : "Select Doctor"}
//           </DialogTitle>
//           <DialogDescription asChild>
//             {step === 1 ? (
//               <div>
//                 <h2 className="mx-2">Add Symptoms or Any Other Details:</h2>
//                 <Textarea
//                   placeholder="Add details here..."
//                   className="h-[200px]"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                 />
//               </div>
//             ) : (
//               <div className="grid grid-cols-3 gap-5">
//                 {suggestedDoctors.map((doctor, index) => (
//                   <SuggestedDoctorCard
//                     key={doctor.id || index}
//                     doctor={doctor}
//                     selectedDoctor={selectedDoctor}
//                     setSelectedDoctor={setSelectedDoctor}
//                   />
//                 ))}
//               </div>
//             )}
//           </DialogDescription>
//         </DialogHeader>

//         <DialogFooter className="flex justify-between">
//           {step === 1 ? (
//             <>
//               <Button variant="outline" onClick={resetState}>
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-black text-white hover:bg-neutral-800"
//                 disabled={!note || loading}
//                 onClick={onClickNext}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <Loader2 className="animate-spin w-4 h-4" /> Loading...
//                   </div>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Next <ArrowRight className="w-4 h-4" />
//                   </span>
//                 )}
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setStep(1);
//                   setSuggestedDoctors([]);
//                   setSelectedDoctor(null);
//                 }}
//               >
//                 Back
//               </Button>
//               <Button
//                 className="bg-black text-white font-bold px-8 hover:bg-grey-600"
//                 disabled={loading || !selectedDoctor}
//                 onClick={onStartConsultation}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <Loader2 className="animate-spin w-4 h-4" /> Loading...
//                   </div>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Start <ArrowRight className="w-4 h-4" />
//                   </span>
//                 )}
//               </Button>
//             </>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { DoctorAgent } from "./DoctorAgentCard";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

export function AddNewSessionDialog() {
  const [step, setStep] = useState<1 | 2>(1);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent | null>(null);
  // console.log("Selected doctor's VAPI Agent ID:", selectedDoctor?.vapiAgentId);
//  useEffect(() => {
//   console.log("selectedDoctor state changed:", selectedDoctor);
// }, [selectedDoctor]);

  const router = useRouter();
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const { has } = useAuth();
  const paidUser = has && has({ plan: "pro" });

  // If you want to get doctor from query param (optional, remove if not needed)
  const searchParams = useSearchParams();
  const doctorParam = searchParams.get("selectedDoctor");
  const doctorFromQuery = doctorParam ? JSON.parse(doctorParam) : null;

  useEffect(() => {
    // Optional: Set selectedDoctor from query if present on mount
    if (doctorFromQuery && !selectedDoctor) {
      setSelectedDoctor(doctorFromQuery);
      setStep(2);
    }
  }, [doctorFromQuery, selectedDoctor]);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    try {
      const response = await axios.get("/api/session-chat?sessionId=all");
      setHistoryList(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const onClickNext = async () => {
    if (!note.trim()) {
      toast.error("Please add some details before proceeding.");
      return;
    }
    setLoading(true);

    try {
      const result = await axios.post("/api/suggest-doctors", { notes: note });
      const doctorsArray: DoctorAgent[] = Array.isArray(result.data?.result)
        ? result.data.result.map((doc: any) => ({
            id: doc.id,
            name: doc.name,
            specialist: doc.specialist,
            description: doc.description,
            image: doc.image,
            voiceId: doc.voiceId,
            vapiAgentId: doc.vapiAgentId,
            ...doc,
          }))
        : [];

      if (doctorsArray.length === 0) {
        toast.info("No matching doctors found. Try different details.");
      } else {
        setSuggestedDoctors(doctorsArray);
        setStep(2);
      }
    } catch (err) {
      console.error("Error fetching suggested doctors:", err);
      toast.error("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const onStartConsultation = async () => {
  //   if (!selectedDoctor) {
  //     toast.error("Please select a doctor first.");
  //     return;
  //   }
  //   setLoading(true);

  //   try {
  //     const res = await axios.post("/api/session-chat", {
  //       notes: note,
  //       selectedDoctor,
  //     }); 
  //     console.log("Starting consultation", selectedDoctor, note);
  //     console.log("API response:", res.data);
  //     if (res.data?.sessionId) {
  //       const queryString = new URLSearchParams({
  //         selectedDoctor: JSON.stringify(selectedDoctor),
  //       }).toString();

  //       router.push(`/dashboard/medical-agent/${res.data.sessionId}?${queryString}`);
  //     }

  //     toast.success("Consultation started successfully!");
  //   } catch (err) {
  //     console.error("Error creating session:", err);
  //     toast.error("Failed to start consultation. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onStartConsultation = async () => {
  console.log("Start button clicked", { selectedDoctor, note });

  if (!selectedDoctor) {
    toast.error("Please select a doctor first.");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post("/api/session-chat", { notes: note, selectedDoctor });
    console.log("API response:", res.data);

    if (res.data?.sessionId) {
      const url = `/dashboard/medical-agent/${res.data.sessionId}?selectedDoctor=${encodeURIComponent(JSON.stringify(selectedDoctor))}`;
      console.log("Navigating to:", url);
      router.push(url);
    }
    toast.success("Consultation started successfully!");
  } catch (error) {
    console.error("Error creating session:", error);
    toast.error("Failed to start consultation. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const resetState = () => {
    setStep(1);
    setNote("");
    setSuggestedDoctors([]);
    setSelectedDoctor(null);
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetState()}>
      <DialogTrigger asChild>
        <Button
          className="mt-2 bg-green-400 font-bold text-gray-900 px-8 hover:bg-green-500"
          disabled={!paidUser && historyList?.length >= 1}
        >
          + Start Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="font-bold mx-2">
            {step === 1 ? "Add Basic Details" : "Select Doctor"}
          </DialogTitle>
          <DialogDescription asChild>
            {step === 1 ? (
              <div>
                <h2 className="mx-2">Add Symptoms or Any Other Details:</h2>
                <Textarea
                  placeholder="Add details here..."
                  className="h-[200px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {suggestedDoctors.map((doctor, index) => (
                  <SuggestedDoctorCard
                    key={doctor.id || index}
                    doctor={doctor}
                    selectedDoctor={selectedDoctor}
                    setSelectedDoctor={setSelectedDoctor}
                  />
                ))}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={resetState}>
                Cancel
              </Button>
              <Button
                className="bg-black text-white hover:bg-neutral-800"
                disabled={!note || loading}
                onClick={onClickNext}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" /> Loading...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1);
                  setSuggestedDoctors([]);
                  setSelectedDoctor(null);
                }}
              >
                Back
              </Button>
              <Button
                className="bg-black text-white font-bold px-8 hover:bg-grey-600"
                 onClick={onStartConsultation}
                // disabled={loading || !selectedDoctor}
               
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" /> Loading...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Start <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
