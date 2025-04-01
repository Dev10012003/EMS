import React from "react";
import { ISummaryCardProps } from "../../interfaces/Dashboard";

const SummaryCard: React.FC<ISummaryCardProps> = ({
  icon,
  text,
  number,
  color,
  isCurrency,
  details,
}) => {
  return (
    <div className="shadow-md">
      <div className="rounded flex bg-white">
        <div
          className={`text-4xl flex items-center justify-center text-white px-5 ${color}`}
        >
          {icon}
        </div>
        <div className="pl-6 py-3">
          <p className="text-xl font-semibold">{text}</p>
          <p className="text-2xl font-bold">
            {isCurrency ? `₹${number.toLocaleString()}` : number}
          </p>
        </div>
      </div>
      {details && (
        <div className="p-4 border-t h-[200px] overflow-y-auto bg-white">
          {details.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className=" bg-gray-100">
                <tr>
                  {Object.keys(details[0]).map((key) => (
                    <th key={key} className="border p-2 text-left capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {details.map((row, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="border p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No records available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
