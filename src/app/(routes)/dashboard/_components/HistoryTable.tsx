import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import { ViewReportDialog } from "./ViewReportDialog";

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {historyList.map((record: SessionDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {record.selectedDoctor?.specialist || "N/A"}
              </TableCell>
              <TableCell>{record.notes || "No notes available"}</TableCell>
              <TableCell>
                {record.createdOn ? new Date(record.createdOn).toLocaleDateString() : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                {/* Manage open state for the dialog */}
                {/* <RowWithDialog record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */} 
        <TableBody>
  {Array.isArray(historyList) && historyList.map((record: SessionDetail, index: number) => (
    <TableRow key={record.id || record.sessionId || index}>
      <TableCell className="font-medium">
        {record.selectedDoctor?.specialist || "N/A"}
      </TableCell>
      <TableCell>{record.notes || "No notes available"}</TableCell>
      <TableCell>
        {record.createdOn ? new Date(record.createdOn).toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell className="text-right">
        <RowWithDialog record={record} />
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </div>
  );
}

function RowWithDialog({ record }: { record: SessionDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="link" size="sm" onClick={() => setOpen(true)}>
        View Report
      </Button>
      {/* @ts-ignore */}
      <ViewReportDialog report={record} open={open} onOpenChange={setOpen} />
    </>
  );
}

export default HistoryTable;
