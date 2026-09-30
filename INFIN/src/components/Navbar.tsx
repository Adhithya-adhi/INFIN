import React from 'react';
import { Briefcase, Building2, Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-slate-800 dark:text-slate-100">
              SkillOrbit
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block leading-none">
              Career & Internship Portal
            </span>
          </div>
          <span className="ml-3 hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
            <Building2 className="w-3 h-3 text-slate-400" /> University Network
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};