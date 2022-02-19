import { SkillListItem } from "../SkillList";
import DaysWorked, { calculateDaysWorked } from "./DaysWorked";

import styles from "./RoleTimeline.module.css";

function formatDate(dateRaw) {
  if (!dateRaw) {
    return "Present";
  }

  const date = new Date(dateRaw);
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });

  return `${formatter.format(date)} ${date.getFullYear()}`;
}

function Role({ position, location, technologies, startDate, endDate, summary }) {
  const daysWorked = calculateDaysWorked(startDate, endDate);

  return (
    <li>
      <h4>
        {position} <DaysWorked days={daysWorked} isCurrent={!endDate} />
      </h4>
      <small>
        {location && <>{location} &bull; </>}
        {formatDate(startDate)} - {formatDate(endDate)}
      </small>

      <p>{summary}</p>

      <div className="mb-2.5">
        {(technologies || []).map((technology) => (
          <SkillListItem key={technology} title={technology} />
        ))}
      </div>
    </li>
  );
}

export default function RoleTimeline({ roles }) {
  return (
    <div className={styles.timeline}>
      <ul>
        {roles.map(({ position, ...props }) => (
          <Role key={position} position={position} {...props} />
        ))}
      </ul>
    </div>
  );
}
