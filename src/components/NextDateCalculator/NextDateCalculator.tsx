export function calculateNextTime(
  from_version: string,
  to_version: string
): string {
  const fromTime = new Date(from_version).getTime();
  const toTime = new Date(to_version).getTime();

  const distance = toTime - fromTime;

  const nextTime = new Date(toTime + distance);

  
  const year = nextTime.getUTCFullYear().toString().slice(-2);
  const month = ("0" + (nextTime.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + nextTime.getUTCDate()).slice(-2);
  const hours = ("0" + nextTime.getUTCHours()).slice(-2);
  const minutes = ("0" + nextTime.getUTCMinutes()).slice(-2);
  const seconds = ("0" + nextTime.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
