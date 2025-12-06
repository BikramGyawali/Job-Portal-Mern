import React from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

function DashTable({ title, headData, bodyData }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <p className="text-[20px] font-semibold">{title}</p>
        <p className="text-[20px] font-semibold cursor-pointer hover:underline">
          View All
        </p>
      </div>

      {/* Table */}
      <Table>
        {/* ======= Table Head ======= */}
        <TableHead>
          <TableRow>
            {headData.map((head, i) => (
              <TableHeadCell key={i}>{head}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ======= Table Body ======= */}
        <TableBody>
          {bodyData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headData.length} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            bodyData.map((row, i) => (
              <TableRow key={i}>
                {headData.map((key, j) => (
                  <TableCell key={j}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DashTable;
