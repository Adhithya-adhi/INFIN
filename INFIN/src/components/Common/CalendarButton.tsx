import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import type { CalendarEventPayload } from '../../utils/calendar';

interface CalendarButtonProps {
  event: CalendarEventPayload;
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
      >
        <Calendar className="w-3.5 h-3.5" />
        Add to Calendar
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg py-1 z-20">
          <a
            href={generateGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Calendar
          </a>
          <button
            type="button"
            onClick={() => {
              downloadIcsFile(event);
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Download className="w-3.5 h-3.5" />
            Download iCal (.ics)
          </button>
        </div>
      )}
    </div>
  );
};