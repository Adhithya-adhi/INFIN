import React, { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import type { SkillBadge, ProficiencyLevel } from '../../types';

interface SkillMatrixProps {
  skills: SkillBadge[];
  onAddSkill: (skill: SkillBadge) => void;
}

const LEVEL_COLORS: Record<ProficiencyLevel, string> = {
  Beginner: 'bg-amber-50/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
  Intermediate: 'bg-sky-50/80 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-900/60',
  Advanced: 'bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
};

export const SkillStrengthMatrix: React.FC<SkillMatrixProps> = ({ skills, onAddSkill }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [level, setLevel] = useState<ProficiencyLevel>('Intermediate');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    onAddSkill({
      id: crypto.randomUUID(),
      name: newSkillName.trim(),
      level,
      source: 'manual',
      verified: true,
    });
    setNewSkillName('');
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-slate-500" />
            Applicant Competencies
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Current catalog of demonstrated qualifications and tools.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 min-h-[48px] items-center">
        {skills.length === 0 ? (
          <span className="text-xs text-slate-400 italic">No skills listed yet. Add credentials below.</span>
        ) : (
          skills.map((skill) => (
            <span
              key={skill.id}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium ${LEVEL_COLORS[skill.level]}`}
            >
              {skill.name}
              <span className="text-[10px] opacity-75">({skill.level})</span>
            </span>
          ))
        )}
      </div>

      <form onSubmit={handleCreate} className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Enter skill or framework..."
          className="flex-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as ProficiencyLevel)}
          className="text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-700 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Skill
        </button>
      </form>
    </div>
  );
};