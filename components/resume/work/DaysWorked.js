import { useEffect, useState } from "react";

export function calculateDaysWorked(startDate, endDate) {
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();

  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export default function DaysWorked({ isCurrent, days }) {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  let numYears = Math.floor(days / 365);
  let numMonths = Math.ceil((days % 365) / 30);
  if (numMonths === 12) {
    numYears += 1;
    numMonths = 0;
  }

  return (
    <span className="text-gray-700 pl-3 text-sm">
      {isCurrent && !client && "current"}
      {(!isCurrent || client) && (
        <>
          {numYears > 0 && `${numYears} yrs`} {numMonths > 0 && `${numMonths} mos`}
        </>
      )}
    </span>
  );
}
