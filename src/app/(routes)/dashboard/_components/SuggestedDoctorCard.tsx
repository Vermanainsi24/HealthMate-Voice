// import React from "react";
// import Image from "next/image";
// import { DoctorAgent } from "./DoctorAgentCard";

// type Props = {
//   doctor: DoctorAgent;
//   selectedDoctor?: DoctorAgent | null;
//   setSelectedDoctor: React.Dispatch<React.SetStateAction<DoctorAgent | null>>;
// };

// export default function SuggestedDoctorCard({ doctor, setSelectedDoctor, selectedDoctor }: Props) {
//   const isSelected = selectedDoctor?.id === doctor.id;

//   return (
//     <div
//       className={`flex flex-col items-center text-center p-3 rounded-2xl border shadow-sm cursor-pointer transition-all duration-300 ease-in-out
//         ${isSelected ? "border-blue-500 shadow-lg scale-105 bg-blue-50" : "border-gray-300 bg-white hover:shadow-md hover:border-blue-400"}
//       `}
//       onClick={() => setSelectedDoctor(doctor)}
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           setSelectedDoctor(doctor);
//         }
//       }}
//     >
//       <Image
//         src={doctor.image || "/placeholder-doctor.png"}
//         alt={doctor.specialist || "Doctor"}
//         width={60}
//         height={60}
//         className="rounded-full object-cover border border-gray-200"
//       />
//       <h2 className="font-semibold text-gray-800 text-sm leading-tight mt-2">{doctor.specialist}</h2>
//       <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">
//         {doctor.description || "No description available."}
//       </p>
//       {isSelected && <div className="mt-1 text-xs text-blue-600 font-medium">✓ Selected</div>}
//     </div>
//   );
// }

import React from "react";
import Image from "next/image";
import { DoctorAgent } from "./DoctorAgentCard";
import { useState } from "react";

type Props = {
  doctor: DoctorAgent;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<DoctorAgent | null>>;
  selectedDoctor?: DoctorAgent | null;
};

export default function SuggestedDoctorCard({
  doctor,
  setSelectedDoctor,
  selectedDoctor,
  
}: Props) {
  const isSelected = selectedDoctor?.id === doctor?.id;
  const [vapiAgentId, setVapiAgentId] = useState<string | null>(null);

  return (
    <div
      className={`flex flex-col items-center text-center p-3 rounded-2xl border shadow-sm cursor-pointer transition-all duration-300 ease-in-out
        ${isSelected ? "border-blue-500 shadow-lg scale-105 bg-blue-50" : "border-gray-300 bg-white hover:shadow-md hover:border-blue-400"}
      `}
      onClick={() => setSelectedDoctor(doctor)  }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setSelectedDoctor(doctor);
        }
      }}
    >
      <Image
        src={doctor?.image || "/placeholder-doctor.png"} // fallback image
        alt={doctor?.specialist || "Doctor"}
        width={60}
        height={60}
        className="rounded-full object-cover border border-gray-200"
      />
      <h2 className="font-semibold text-gray-800 text-sm leading-tight mt-2">{doctor?.specialist}</h2>
      <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-snug">
        {doctor?.description || "No description available."}
      </p>
      {isSelected && <div className="mt-1 text-xs text-blue-600 font-medium">✓ Selected</div>}
    </div>
  );
}
