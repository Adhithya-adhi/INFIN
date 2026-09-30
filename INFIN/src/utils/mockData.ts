import type { Internship, LearningPathwayNode, StudentProfile } from '../types';

export const SEED_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    role: 'Cloud Infrastructure Intern',
    company: 'Stripe',
    department: 'Computer Science',
    deadline: '2026-10-15',
    difficulty: 'Competitive',
    credibilityScore: 4.9,
    requiredSkills: ['Docker', 'AWS', 'Go', 'System Design'],
    matchScore: 0,
    portalUrl: 'https://stripe.com/jobs',
  },
  {
    id: 'intern-2',
    role: 'Frontend Systems Intern',
    company: 'Linear',
    department: 'Computer Science',
    deadline: '2026-11-01',
    difficulty: 'Intermediate',
    credibilityScore: 4.8,
    requiredSkills: ['React', 'TypeScript', 'Figma'],
    matchScore: 0,
    portalUrl: 'https://linear.app/careers',
  },
  {
    id: 'intern-3',
    role: 'Applied ML Research Intern',
    company: 'Anthropic',
    department: 'Data Science',
    deadline: '2026-10-25',
    difficulty: 'Competitive',
    credibilityScore: 5.0,
    requiredSkills: ['Python', 'PostgreSQL', 'AWS'],
    matchScore: 0,
    portalUrl: 'https://anthropic.com/careers',
  },
  {
    id: 'intern-4',
    role: 'Security Operations Analyst',
    company: 'Cloudflare',
    department: 'Cybersecurity',
    deadline: '2026-12-05',
    difficulty: 'Intermediate',
    credibilityScore: 4.7,
    requiredSkills: ['Python', 'Docker', 'Kubernetes'],
    matchScore: 0,
    portalUrl: 'https://cloudflare.com/careers',
  },
];

export const SEED_PATHWAYS: LearningPathwayNode[] = [
  {
    id: 'path-1',
    title: 'Containerization & Cloud Sandboxing',
    targetSkill: 'Docker',
    provider: 'Linux Foundation / Coursera',
    timeCommitment: '12 Hours',
    courseUrl: 'https://www.docker.com/101-tutorial/',
    prerequisites: ['Linux Basics'],
    isUnlocked: true,
  },
  {
    id: 'path-2',
    title: 'Production Orchestration with Kubernetes',
    targetSkill: 'Kubernetes',
    provider: 'Cloud Native Computing Foundation',
    timeCommitment: '24 Hours',
    courseUrl: 'https://kubernetes.io/docs/tutorials/',
    prerequisites: ['Docker'],
    isUnlocked: false,
  },
  {
    id: 'path-3',
    title: 'Advanced Type-Level Engineering',
    targetSkill: 'TypeScript',
    provider: 'Total TypeScript',
    timeCommitment: '18 Hours',
    courseUrl: 'https://www.totaltypescript.com/',
    prerequisites: ['JavaScript'],
    isUnlocked: true,
  },
];

export function computeRecommendations(
  profile: StudentProfile,
  internships: Internship[] = SEED_INTERNSHIPS,
  pathways: LearningPathwayNode[] = SEED_PATHWAYS
) {
  const studentSkillNames = new Set(profile.skills.map((s) => s.name.toLowerCase()));

  // 1. Calculate dynamic match scores for internships
  const scoredInternships = internships.map((internship) => {
    const required = internship.requiredSkills;
    if (required.length === 0) return { ...internship, matchScore: 100 };

    const matching = required.filter((req) =>
      studentSkillNames.has(req.toLowerCase())
    );

    const matchScore = Math.round((matching.length / required.length) * 100);
    return { ...internship, matchScore };
  });

  // Sort internships by matchScore descending
  scoredInternships.sort((a, b) => b.matchScore - a.matchScore);

  // 2. Compute unlocks on pathway nodes
  const updatedPathways = pathways.map((node) => {
    const isUnlocked = node.prerequisites.every((prereq) =>
      studentSkillNames.has(prereq.toLowerCase())
    );
    return { ...node, isUnlocked };
  });

  return {
    internships: scoredInternships,
    pathways: updatedPathways,
  };
}