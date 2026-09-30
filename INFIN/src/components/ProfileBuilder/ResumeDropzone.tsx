import React, { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { parseResumeFile } from '../../utils/resumeParser';
import type { StudentProfile } from '../../types';

interface ResumeDropzoneProps {
  onParsed: (draft: Partial<StudentProfile>) => void;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onParsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const parsedData = await parseResumeFile(file);
    onParsed(parsedData);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsHovered(true);
      }}
      onDragLeave={() => setIsHovered(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsHovered(false);
        if (e.dataTransfer.files?.[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-gradient-to-b from-white to-slate-50/70 dark:from-slate-900 dark:to-slate-950 ${
        isHovered
          ? 'border-indigo-400 bg-indigo-50/30'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <input
        type="file"
        id="resume-upload"
        accept=".txt,.pdf,.md"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />
      <label htmlFor="resume-upload" className="cursor-pointer block">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3 shadow-inner">
          {fileName ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          ) : (
            <UploadCloud className="h-6 w-6 text-slate-500" />
          )}
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {fileName ? `Loaded: ${fileName}` : 'Upload your resume or CV'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Supports TXT, PDF, or MD. Evaluated client-side for match criteria.
        </p>
      </label>
    </div>
  );
};