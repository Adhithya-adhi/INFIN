import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ResumeDropzone } from './components/ProfileBuilder/ResumeDropzone';
import { QuestionnaireModal } from './components/ProfileBuilder/QuestionnaireModal';
import { SkillStrengthMatrix } from './components/Matrix/SkillStrengthMatrix';
import { InternshipCard } from './components/Dashboard/InternshipCard';
import { LearningPathways } from './components/Dashboard/LearningPathways';
import { db } from './db/dexie';
import { useAppStore } from './store/useAppStore';
import type { StudentProfile, Internship, LearningPathwayNode, SkillBadge } from './types/index.ts';
import { SEED_INTERNSHIPS, SEED_PATHWAYS, computeRecommendations } from './utils/mockData';
import { evaluateMissingFields } from './utils/resumeParser';

export default function App() {
  const { theme, isQuestionnaireOpen, setQuestionnaireOpen } = useAppStore();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [draftProfile, setDraftProfile] = useState<Partial<StudentProfile>>({});
  const [internships, setInternships] = useState<Internship[]>(SEED_INTERNSHIPS);
  const [pathways, setPathways] = useState<LearningPathwayNode[]>(SEED_PATHWAYS);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    async function loadStoredData() {
      const storedProfiles = await db.profiles.toArray();
      if (storedProfiles.length > 0) {
        const active = storedProfiles[0];
        setProfile(active);
        const recalibrated = computeRecommendations(active);
        setInternships(recalibrated.internships);
        setPathways(recalibrated.pathways);
      }
    }
    loadStoredData();
  }, []);

  const handleResumeParsed = (parsed: Partial<StudentProfile>) => {
    setDraftProfile(parsed);
    const missing = evaluateMissingFields(parsed);
    if (missing.length > 0) {
      setQuestionnaireOpen(true);
    } else {
      finalizeProfile(parsed as StudentProfile);
    }
  };

  const finalizeProfile = async (completed: StudentProfile) => {
    setProfile(completed);
    await db.profiles.clear();
    await db.profiles.put(completed);

    const recalibrated = computeRecommendations(completed);
    setInternships(recalibrated.internships);
    setPathways(recalibrated.pathways);
  };

  const handleAddSkill = async (newSkill: SkillBadge) => {
    if (!profile) return;
    const updatedSkills = [...profile.skills, newSkill];
    const updatedProfile: StudentProfile = {
      ...profile,
      skills: updatedSkills,
      updatedAt: Date.now(),
    };
    await finalizeProfile(updatedProfile);
  };

  const filteredInternships = internships.filter((item) => {
    if (selectedDifficulty === 'all') return true;
    return item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
  });

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 font-sans transition-colors">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Onboarding & Input Layer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ResumeDropzone onParsed={handleResumeParsed} />
          </div>
          <div className="md:col-span-2">
            <SkillStrengthMatrix
              skills={profile?.skills || []}
              onAddSkill={handleAddSkill}
            />
          </div>
        </section>

        {/* Action & Filter Toolbar */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Matched Internship Opportunities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Positions curated according to your current coursework and skill inventory.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Difficulty Level:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Competitive">Competitive</option>
            </select>
          </div>
        </section>

        {/* Dual Recommendation Dashboard Panels */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  userSkills={profile?.skills || []}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <LearningPathways pathways={pathways} />
          </div>
        </section>
      </main>

      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setQuestionnaireOpen(false)}
        draftProfile={draftProfile}
        onComplete={finalizeProfile}
      />
    </div>
  );
}