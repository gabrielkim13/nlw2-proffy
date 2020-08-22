export default function convertHoursToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;

  return timeInMinutes;
}
