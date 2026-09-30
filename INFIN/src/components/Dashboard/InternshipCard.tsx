import React from 'react';
import { Building, MapPin, ExternalLink } from 'lucide-react';
import type { Internship, SkillBadge } from '../../types';
import { CalendarButton } from '../Common/CalendarButton';

interface InternshipCardProps {
  internship: Internship;
  userSkills: SkillBadge[];
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, userSkills }) => {
  const userSkillSet = new Set(userSkills.map((s) => s.name.toLowerCase()));

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
              {internship.role}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{internship.company}</span>
              <span>•</span>
              <span>{internship.department}</span>
            </div>
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${
                internship.matchScore >= 70
                  ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : internship.matchScore >= 40
                  ? 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {internship.matchScore}% Match
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 my-3">
          <span className="capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
            {internship.difficulty} Level
          </span>
          <span>•</span>
          <span>Deadline: {internship.deadline}</span>
        </div>

        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Prerequisites
          </span>
          <div className="flex flex-wrap gap-1.5">
            {internship.requiredSkills.map((skill) => {
              const hasSkill = userSkillSet.has(skill.toLowerCase());
              return (
                <span
                  key={skill}
                  className={`text-[11px] px-2 py-0.5 rounded border ${
                    hasSkill
                      ? 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-900/50'
                  }`}
                >
                  {skill} {!hasSkill && '— Missing'}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <CalendarButton
          event={{
            title: `Application Deadline: ${internship.role} at ${internship.company}`,
            description: `Submit application for ${internship.role} (${internship.portalUrl})`,
            deadlineIsoDate: internship.deadline,
          }}
        />
        <a
          href={internship.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};