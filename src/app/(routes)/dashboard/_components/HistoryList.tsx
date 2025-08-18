"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddNewSessionDialog } from "./AddNewSessionDialog"; // Adjust path if needed
import HistoryTable from "./HistoryTable"; // Adjust path if needed
import axios from "axios";

function HistoryList() {
  const [historyList, setHistoryList] = useState<any[]>([]);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    try {
      const response = await axios.get("/api/session-chat?sessionId=all");
      console.log("History List:", response.data);
      setHistoryList(response.data);
     
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="mt-2">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-7 border-dashed border-2 border-gray-300 rounded-2xl">
          <Image
            src="/consult.png"
            alt="No history available"
            width={100}
            height={100}
          />
          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
}

export default HistoryList;
