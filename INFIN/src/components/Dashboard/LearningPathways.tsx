import React from 'react';
import { BookMarked, CheckCircle2, Lock, ExternalLink, Clock } from 'lucide-react';
import type { LearningPathwayNode } from '../../types';

interface LearningPathwaysProps {
  pathways: LearningPathwayNode[];
}

export const LearningPathways: React.FC<LearningPathwaysProps> = ({ pathways }) => {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-indigo-500" />
          Recommended Coursework
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Required modules to bridge identified skill requirements.
        </p>
      </div>

      <div className="space-y-3">
        {pathways.map((node, index) => (
          <div
            key={node.id}
            className={`p-3.5 rounded-lg border transition ${
              node.isUnlocked
                ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40'
                : 'border-slate-200/50 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/20 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">
                  {node.isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {index + 1}. {node.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{node.provider}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {node.timeCommitment}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={node.courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition ${
                  !node.isUnlocked ? 'pointer-events-none opacity-40' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="mt-2 text-[11px] flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="uppercase text-[10px] text-slate-400 font-semibold">Requires:</span>
              {node.prerequisites.map((req) => (
                <span key={req} className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-[10px]">
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};