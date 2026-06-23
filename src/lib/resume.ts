import { promises as fs } from "fs";
import path from "path";

import type { CurrentPosition, ResumeData, ResumeRole, ResumeWork } from "./types";

interface BaseWorkEntry {
  name: string;
  position: string;
  location?: string;
  summary?: string;
  startDate: string;
  endDate?: string;
}

interface BaseVolunteerEntry {
  organization: string;
  position: string;
  summary: string;
  startDate?: string;
  endDate?: string;
}

interface BaseResume {
  basics: { label: string };
  work: BaseWorkEntry[];
  volunteer: BaseVolunteerEntry[];
}

type DetailsData = Record<string, Record<string, { website?: string; technologies?: string[] } | string>>;

async function loadJson<T>(file: string): Promise<T> {
  const dataResumePath = path.join(process.cwd(), "data", "resume", file);
  const fileContent = await fs.readFile(dataResumePath, "utf8");
  return JSON.parse(fileContent) as T;
}

export async function loadResumeData(): Promise<ResumeData> {
  const baseData = await loadJson<BaseResume>("base.json");
  const details = await loadJson<DetailsData>("details.json");

  const work: ResumeWork[] = baseData.work
    .reduce<ResumeWork[]>((pre, cur) => {
      if (pre.length === 0 || pre[pre.length - 1].company !== cur.name) {
        pre.push({
          company: cur.name,
          website: ((details[cur.name] || {}).website as string | undefined) || null,

          roles: [],
          isCurrent: false,
        });
      }
      pre[pre.length - 1].roles.push({
        position: cur.position,
        location: cur.location,
        ...(((details[cur.name] || {})[cur.position] as { technologies?: string[] }) || {}),

        summary: cur.summary || null,

        startDate: cur.startDate,
        endDate: cur.endDate || null,
      } as ResumeRole);
      return pre;
    }, [])
    .map((work) => {
      const isCurrent = work.roles.findIndex(({ endDate }) => !endDate) !== -1;
      return {
        ...work,
        isCurrent,
      };
    });

  const volunteer = baseData.volunteer
    .sort(({ startDate: startDate1Raw, endDate: endDate1Raw }, { startDate: startDate2Raw, endDate: endDate2Raw }) => {
      if (!endDate1Raw && endDate2Raw) {
        return -1;
      } else if (endDate1Raw && !endDate2Raw) {
        return 1;
      }

      if (!startDate1Raw && endDate1Raw) {
        return 1;
      } else if (!startDate2Raw && endDate2Raw) {
        return -1;
      }

      const startDate1 = new Date(startDate1Raw as string);
      const startDate2 = new Date(startDate2Raw as string);

      return startDate1.getTime() - startDate2.getTime();
    })
    .map(({ organization, position, summary, startDate, endDate }) => ({
      organization,
      position,
      summary,

      isCurrent: !!startDate && (startDate === endDate || !endDate),
    }));

  return {
    label: baseData.basics.label,
    work,
    volunteer,
  };
}

/** Derive the most recent (current) position from already-loaded resume data. */
export function deriveCurrentPosition(resume: ResumeData): CurrentPosition | null {
  const currentWork = resume.work.find(({ isCurrent }) => isCurrent) ?? resume.work[0];
  if (!currentWork) {
    return null;
  }

  const currentRole = currentWork.roles.find(({ endDate }) => !endDate) ?? currentWork.roles[0];
  return {
    jobTitle: currentRole.position,
    company: currentWork.company,
    companyUrl: currentWork.website,
  };
}

export async function loadCurrentPosition(): Promise<CurrentPosition | null> {
  return deriveCurrentPosition(await loadResumeData());
}
