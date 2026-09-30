import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import type { StudentProfile, Department } from '../../types';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftProfile: Partial<StudentProfile>;
  onComplete: (completedProfile: StudentProfile) => void;
}

const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Data Science',
  'Product',
  'Design',
  'Cybersecurity',
];

export const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  isOpen,
  onClose,
  draftProfile,
  onComplete,
}) => {
  const [department, setDepartment] = useState<Department>(
    draftProfile.department || 'Computer Science'
  );
  const [graduationYear, setGraduationYear] = useState<number>(
    draftProfile.graduationYear || 2027
  );
  const [targetSalary, setTargetSalary] = useState(draftProfile.targetSalary || '$95,000');
  const [strength, setStrength] = useState('');
  const [weakness, setWeakness] = useState('');
  const [goal, setGoal] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalizedProfile: StudentProfile = {
      id: draftProfile.id || crypto.randomUUID(),
      fullName: draftProfile.fullName || 'Anonymous Candidate',
      email: draftProfile.email || 'candidate@local.privacy',
      department,
      graduationYear,
      targetSalary,
      skills: draftProfile.skills || [],
      swot: {
        strengths: strength ? [strength] : ['Rapid prototyping'],
        weaknesses: weakness ? [weakness] : ['Distributed Systems'],
        opportunities: goal ? [goal] : ['Cloud native internships'],
        threats: ['Fast-paced tech turnover'],
      },
      missingProfileFields: [],
      updatedAt: Date.now(),
    };

    onComplete(finalizedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Complete Career Blueprint
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Fill in missing profile dimensions to calibrate recommendations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {!draftProfile.department && (
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Core Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="dark:bg-zinc-900">
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!draftProfile.graduationYear && (
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Graduation Year
              </label>
              <input
                type="number"
                min={2024}
                max={2032}
                value={graduationYear}
                onChange={(e) => setGraduationYear(parseInt(e.target.value, 10))}
                className="w-full text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Target Annual Compensation / Stipend
            </label>
            <input
              type="text"
              value={targetSalary}
              onChange={(e) => setTargetSalary(e.target.value)}
              placeholder="e.g. $45/hr or $90,000"
              className="w-full text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Career SWOT Calibration
            </span>
            <div className="mt-2 space-y-3">
              <input
                type="text"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                placeholder="Core Strength (e.g., Python algorithms, System Design)"
                className="w-full text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
              <input
                type="text"
                value={weakness}
                onChange={(e) => setWeakness(e.target.value)}
                placeholder="Identified Gap to Address (e.g., Docker, Unit Testing)"
                className="w-full text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Opportunity Target (e.g., Tier-1 Tech Summer Internship)"
                className="w-full text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};