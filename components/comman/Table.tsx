"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

interface WinningRecord {
  id: number;
  prize: string;
  date: string;
}

interface WinningTableProps {
  records: WinningRecord[];
}

export function WinningTable({ records }: WinningTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-6 bg-white shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-yellow-500 text-white px-6 py-3 text-lg font-bold">
        Winning Record
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{record.prize}</TableCell>
                <TableCell>{record.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                No winning history yet 🎡
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}
