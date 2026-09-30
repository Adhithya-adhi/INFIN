export interface CalendarEventPayload {
  title: string;
  description: string;
  location?: string;
  deadlineIsoDate: string; // YYYY-MM-DD
}

export function generateGoogleCalendarUrl(event: CalendarEventPayload): string {
  const startDate = event.deadlineIsoDate.replace(/-/g, '');
  // Defaulting to an all-day deadline event
  const dates = `${startDate}/${startDate}`;
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location || 'Online Application Portal',
    dates: dates,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: CalendarEventPayload): void {
  const dateStr = event.deadlineIsoDate.replace(/-/g, '');
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SkillOrbit//Career Intelligence//EN',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@skillorbit.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location || 'Online Application'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.title.toLowerCase().replace(/\s+/g, '-')}-deadline.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}