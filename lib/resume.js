import { promises as fs } from "fs";
import path from "path";

async function loadJson(file) {
  const dataResumePath = path.join(process.cwd(), "data", "resume", file);
  const fileContent = await fs.readFile(dataResumePath, "utf8");
  return JSON.parse(fileContent);
}

export async function loadResumeData() {
  const baseData = await loadJson("base.json");
  const details = await loadJson("details.json");

  const work = baseData.work
    .reduce((pre, cur) => {
      if (pre.length === 0 || pre[pre.length - 1].company !== cur.name) {
        pre.push({
          company: cur.name,
          website: (details[cur.name] || {}).website || null,

          roles: [],
        });
      }
      pre[pre.length - 1].roles.push({
        position: cur.position,
        location: cur.location,
        ...((details[cur.names] || {})[cur.position] || {}),

        summary: cur.summary || null,

        startDate: cur.startDate,
        endDate: cur.endDate || null,
      });
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

      const startDate1 = new Date(startDate1Raw);
      const startDate2 = new Date(startDate2Raw);

      return startDate1 - startDate2;
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
