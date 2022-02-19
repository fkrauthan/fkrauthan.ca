import EarthOutline from "react-ionicons/lib/EarthOutline";

import ThemedIcon from "../../ThemedIcon";
import DaysWorked, { calculateDaysWorked } from "./DaysWorked";
import RoleTimeline from "./RoleTimeline";

function calculateTotalDaysWorked(roles) {
  return roles.reduce((acc, { startDate, endDate }) => {
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();

    return acc + calculateDaysWorked(start, end);
  }, 0);
}

export default function WorkEntry({ company, website, isCurrent, roles }) {
  const daysWorked = calculateTotalDaysWorked(roles);

  return (
    <div>
      <h3>
        {company}{" "}
        {website && (
          <a href={website} target="_blank" rel="noreferrer nofollow" title={`${company} Website`}>
            <ThemedIcon component={EarthOutline} width="18px" height="18px" style={{ display: "inline" }} />
          </a>
        )}{" "}
        <DaysWorked days={daysWorked} isCurrent={isCurrent} />
      </h3>

      <RoleTimeline roles={roles} />
    </div>
  );
}
