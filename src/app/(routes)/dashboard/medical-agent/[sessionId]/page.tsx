

// "use client";

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Circle, PhoneCall, PhoneOff } from "lucide-react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState, useRef } from "react";
// import Vapi from "@vapi-ai/web";
// import { toast } from "sonner";

// export type DoctorAgent = {
//   id: number;
//   specialist: string;
//   description: string;
//   image: string;
//   agentPrompt: string;
//   voiceId: string;
//   vapiAgentId: string; // Required for vapi start
//   subscriptionRequired: boolean;
// };

// export type SessionDetail = {
//   id: number;
//   notes: string;
//   sessionId: string;
//   report: JSON;
//   selectedDoctor: DoctorAgent;
//   createdOn: string;
// };

// export type messages={
//   role:string,
//   text:string,
// }

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<any>(null);
//   const [currentTranscript, setCurrentTranscript] = useState<string>("");
//   const [currentRole, setCurrentRole] = useState<string | null>();
//   // const [transcripts, setTranscripts] = useState<{ role: string; text: string }[]>([]);
//   const typingTimeout = useRef<NodeJS.Timeout | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const [seconds, setSeconds] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState<messages[]>([]);
//   const router = useRouter();

//   // Timer formatting
//   const formatTime = (seconds: number) => {
//     const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const ss = (seconds % 60).toString().padStart(2, "0");
//     return `${mm}:${ss}`;
//   };

//   // Call timer effect
//   useEffect(() => {
//     if (callStarted) {
//       timerRef.current = setInterval(() => {
//         setSeconds((prev) => prev + 1);
//       }, 1000);
//     } else {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//       setSeconds(0);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [callStarted]);

//   // Fetch session details on mount or sessionId change
//   useEffect(() => {
//     if (sessionId) {
//       GetSessionDetails();
//     }
//   }, [sessionId]);

//   const GetSessionDetails = async () => {
//     try {
//       const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//       setSessionDetail(result.data);
//     } catch (error) {
//       console.error("Error fetching session details:", error);
//     }
//   };

//   // Handlers: define with stable references
//   const handleCallStart = () => {
//     setCallStarted(true);
//     setLoading(false);
//   };

//   const handleCallEnd = () => {
//     setCallStarted(false);
//   };

//   const handleMessage = (message: any) => {
//     if (message.type === "transcript") {
//       const { role, transcriptType, transcript } = message;
//       if (transcriptType === "partial") {
//         setCurrentTranscript(transcript);
//         setCurrentRole(role);
//         if (typingTimeout.current) clearTimeout(typingTimeout.current);
//         typingTimeout.current = setTimeout(() => {
//           setMessages((prev) => [...prev, { role, text: transcript }]);
//           setCurrentTranscript("");
//         }, 1000);
//       }
//       else if(transcriptType === "final") {
//         setMessages((prev:any) => [...prev.slice(-3), { role:role, text: transcript }]);
//         setCurrentTranscript("");
//         setCurrentRole(null);

//       }
//     }
//   };

//   const handleSpeechStart = () => setCurrentRole("assistant");

//   const handleSpeechEnd = () => setCurrentRole("user");

//   const handleError = (err: any) => {
//     if (
//       err?.errorMsg?.includes("Meeting ended") ||
//       err?.errorMsg?.includes("ejection")
//     ) {
//       alert("This meeting has ended or you were removed. Please join a new meeting.");
//       setCallStarted(false);
//       setVapiInstance(null);
//       setLoading(false);
//       router.replace("/dashboard");
//     } else {
//       console.error("VAPI error:", err);
//     }
//   };

//   // Start the call and setup event listeners
//   const StartCall = () => {
//     setLoading(true);
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//     setVapiInstance(vapi);

//     vapi.on("call-start", handleCallStart);
//     vapi.on("call-end", handleCallEnd);
//     vapi.on("message", handleMessage);
//     vapi.on("speech-start", handleSpeechStart);
//     vapi.on("speech-end", handleSpeechEnd);
//     vapi.on("error", handleError);

//     if (sessionDetail?.selectedDoctor.vapiAgentId) {
      
//       vapi.start(sessionDetail.selectedDoctor.vapiAgentId);
//       console.log("Starting call with VAPI Agent ID:", sessionDetail.selectedDoctor.vapiAgentId);

//     }
//   };

//   // End call and remove event listeners appropriately
//   const endCall = async () => {
//     setLoading(true);
//     if (!vapiInstance) return;

//     vapiInstance.off("call-start", handleCallStart);
//     vapiInstance.off("call-end", handleCallEnd);
//     vapiInstance.off("message", handleMessage);
//     vapiInstance.off("speech-start", handleSpeechStart);
//     vapiInstance.off("speech-end", handleSpeechEnd);
//     vapiInstance.off("error", handleError);

//     vapiInstance.stop();
//     setCallStarted(false);
//     setVapiInstance(null);
//     const result=await GenerateReport();
//     toast.success("Your report is generated!");
//     setLoading(false);
//     router.replace("/dashboard");
//   }
//   const GenerateReport = async () => {
//     const result = await axios.post("/api/medical-report", {
//       messages: messages,
//       sessionDetail: sessionDetail,
//       sessionId: sessionId,
//     });

//     console.log(result.data);
//     return result.data;
//   };

//   useEffect(() => {
//     if (sessionId) {
//       GetSessionDetails();
//     }
//   }, [sessionId]); 
//   const doctor = sessionDetail?.selectedDoctor;
//   const imageSrc = doctor?.image?.startsWith("/") ? doctor.image : `/${doctor?.image}`;

//   return (
//     <div className="bg-secondary w-full min-h-screen overflow-hidden flex items-center justify-center p-0">
//       <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full">

//         {/* Left Panel: Doctor Image with Overlay */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-6">
//           <div className="w-full max-w-sm aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
//             {doctor?.image && (
//               <Image
//                 src={imageSrc}
//                 alt={doctor.specialist}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             )}

//             {/* Professional Overlay */}
//             <div className="absolute bottom-0 left-0 w-full">
//               <div className="m-3 bg-black/30 rounded-xl px-5 py-4 shadow-lg backdrop-blur-lg flex flex-col items-start text-white break-words max-h-40 overflow-y-auto">
//                 <h2 className="text-lg md:text-xl font-bold truncate text-black">{doctor?.specialist}</h2>
//                 <p className="text-xs md:text-sm mt-1 whitespace-pre-wrap">{doctor?.description}</p>
//                 <p className="text-xs italic text-gray-300 mt-2">AI Medical Voice Agent</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel: Call Status and Chat */}
//         <div className="w-full lg:w-1/2 relative flex flex-col justify-between p-6 bg-gray-50 rounded-xl shadow-lg">
//           {/* Connection Status */}
//           <div className="flex items-center justify-between p-3 rounded-xl shadow-sm border border-gray-200">
//             <div className="flex items-center gap-2">
//               <Circle
//                 className={`h-3.5 w-3.5 ${
//                   callStarted ? "text-green-500 fill-green-500 animate-pulse" : "text-red-500 fill-red-500"
//                 }`}
//               />
//               <span className={`text-sm font-medium ${callStarted ? "text-green-700" : "text-red-600"}`}>
//                 {callStarted ? "Connected" : "Not Connected"}
//               </span>
//             </div>
//             <div className="font-mono bg-gray-100 px-4 py-2 rounded-lg text-gray-600">{formatTime(seconds)}</div>
//           </div>

//           {/* Transcript Messages */}
//           <div className="mt-4 flex flex-col gap-2 overflow-hidden min-h-[200px]">
//           {messages?.slice(-4).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md transition-opacity duration-500 ease-in-out ${
//                 msg.role === "assistant"
//                   ? "self-start text-green-800 bg-green-100"
//                   : "self-end text-blue-800 bg-blue-100"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           {currentTranscript && currentTranscript.length > 0 && (
//             <div
//               className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md italic animate-pulse ${
//                 currentRole === "assistant"
//                   ? "self-start text-green-800 bg-green-100"
//                   : "self-end text-blue-800 bg-blue-100"
//               }`}
//             >
//               {currentTranscript}
//             </div>
//           )}
//         </div>


//           {/* Call Controls */}
//           <div className="mt-6">
//             {!callStarted ? (
//               <Button
//                 onClick={StartCall}
//                 disabled={loading}
//                 className="w-full cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-xl shadow-md transition duration-200"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="white"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     Starting...
//                   </>
//                 ) : (
//                   <>
//                     <PhoneCall className="w-4 h-4" /> Start Call
//                   </>
//                 )}
//               </Button>
//             ) : (
//               <Button
//                 variant="destructive"
//                 onClick={endCall}
//                 className="w-full cursor-pointer bg-red-500 flex items-center justify-center gap-2 hover:text-red-600"
//               >
//                 <PhoneOff className="w-4 h-4" /> Disconnect
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MedicalVoiceAgent;



"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  sessionId: string;
  notes: string;
  selectedDoctor: {
    id: number;
    specialist: string;
    description: string;
    image: string;
    vapiAgentId: string;
  };
  report?: any;
  conversation?: any;
  createdOn: string;
};

type Message = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const router = useRouter();

  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (seconds: number) => {
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Timer effect to count call duration
  useEffect(() => {
    if (callStarted) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStarted]);

  // Fetch session details on load or sessionId change
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  const fetchSessionDetails = async () => {
    try {
      const res = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
      setSessionDetail(res.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Failed to load session details.");
    }
  };

  // Stable event handlers for Vapi events
  const handleCallStart = () => {
    setCallStarted(true);
    setLoading(false);
  };

  const handleCallEnd = () => {
    setCallStarted(false);
  };

  const handleMessage = (message: any) => {
    if (message.type === "transcript") {
      const { role, transcriptType, transcript } = message;
      if (transcriptType === "partial") {
        setCurrentTranscript(transcript);
        setCurrentRole(role);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
          setMessages((prev) => [...prev, { role, text: transcript }]);
          setCurrentTranscript("");
        }, 1000);
      } else if (transcriptType === "final") {
        setMessages((prev) => [...prev.slice(-3), { role, text: transcript }]);
        setCurrentTranscript("");
        setCurrentRole(null);
      }
    }
  };

  const handleSpeechStart = () => setCurrentRole("assistant");

  const handleSpeechEnd = () => setCurrentRole("user");

  const handleError = (err: any) => {
    if (
      err?.errorMsg?.includes("Meeting ended") ||
      err?.errorMsg?.includes("ejection")
    ) {
      alert(
        "This meeting has ended or you were removed. Please join a new meeting."
      );
      setCallStarted(false);
      setVapiInstance(null);
      setLoading(false);
      router.replace("/dashboard");
    } else {
      console.error("VAPI error:", err);
      toast.error("Call error occurred. Please try again.");
      setLoading(false);
    }
  };

  const StartCall = () => {
    if (!sessionDetail?.selectedDoctor?.vapiAgentId) {
      toast.error("No VAPI Agent ID found for the selected doctor.");
      return;
    }
    setLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("error", handleError);

    console.log("Starting call with VAPI Agent ID:", sessionDetail.selectedDoctor.vapiAgentId);
    vapi.start(sessionDetail.selectedDoctor.vapiAgentId);
  };

  const GenerateReport = async () => {
    try {
      const result = await axios.post("/api/medical-report", {
        messages,
        sessionDetail,
        sessionId,
      });
      console.log("Report Generated:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report.");
      throw error;
    }
  };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;

    vapiInstance.off("call-start", handleCallStart);
    vapiInstance.off("call-end", handleCallEnd);
    vapiInstance.off("message", handleMessage);
    vapiInstance.off("speech-start", handleSpeechStart);
    vapiInstance.off("speech-end", handleSpeechEnd);
    vapiInstance.off("error", handleError);

    vapiInstance.stop();
    setCallStarted(false);
    setVapiInstance(null);

    await GenerateReport();

    toast.success("Your report has been generated!");
    setLoading(false);
    router.replace("/dashboard");
  };

  const doctor = sessionDetail?.selectedDoctor;
  const imageSrc = doctor?.image?.startsWith("/") ? doctor.image : `/${doctor?.image}`;

  return (
    <div className="bg-secondary w-full min-h-screen overflow-hidden flex items-center justify-center p-0">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full">
        {/* Left Panel: Doctor Image with Overlay */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-6">
          <div className="w-full max-w-sm aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
            {doctor?.image && (
              <Image
                src={imageSrc}
                alt={doctor.specialist}
                fill
                className="object-cover"
                priority
              />
            )}
            {/* Professional Overlay */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="m-3 bg-black/30 rounded-xl px-5 py-4 shadow-lg backdrop-blur-lg flex flex-col items-start text-white break-words max-h-40 overflow-y-auto">
                <h2 className="text-lg md:text-xl font-bold truncate text-black">{doctor?.specialist}</h2>
                <p className="text-xs md:text-sm mt-1 whitespace-pre-wrap">{doctor?.description}</p>
                <p className="text-xs italic text-gray-300 mt-2">AI Medical Voice Agent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Call Status and Chat */}
        <div className="w-full lg:w-1/2 relative flex flex-col justify-between p-6 bg-gray-50 rounded-xl shadow-lg">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-3 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <Circle
                className={`h-3.5 w-3.5 ${
                  callStarted ? "text-green-500 fill-green-500 animate-pulse" : "text-red-500 fill-red-500"
                }`}
              />
              <span className={`text-sm font-medium ${callStarted ? "text-green-700" : "text-red-600"}`}>
                {callStarted ? "Connected" : "Not Connected"}
              </span>
            </div>
            <div className="font-mono bg-gray-100 px-4 py-2 rounded-lg text-gray-600">{formatTime(seconds)}</div>
          </div>

          {/* Transcript Messages */}
          <div className="mt-4 flex flex-col gap-2 overflow-hidden min-h-[200px] max-h-[60vh] rounded-lg px-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            {messages.slice(-4).map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md transition-opacity duration-500 ease-in-out ${
                  msg.role === "assistant"
                    ? "self-start text-green-800 bg-green-100"
                    : "self-end text-blue-800 bg-blue-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {currentTranscript && currentTranscript.length > 0 && (
              <div
                className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md italic animate-pulse ${
                  currentRole === "assistant"
                    ? "self-start text-green-800 bg-green-100"
                    : "self-end text-blue-800 bg-blue-100"
                }`}
              >
                {currentTranscript}
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="mt-6">
            {!callStarted ? (
              <Button
                onClick={StartCall}
                disabled={loading}
                className="w-full cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-xl shadow-md transition duration-200"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth={4}
                        fill="none"
                      />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Starting...
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" /> Start Call
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={endCall}
                className="w-full cursor-pointer bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600"
                disabled={loading}
              >
                <PhoneOff className="w-4 h-4" /> Disconnect
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
