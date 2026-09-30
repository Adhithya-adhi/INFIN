export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type DifficultyLevel = 'Entry' | 'Intermediate' | 'Competitive';
export type Department = 'Computer Science' | 'Data Science' | 'Product' | 'Design' | 'Cybersecurity';

export interface SkillBadge {
  id: string;
  name: string;
  level: ProficiencyLevel;
  source: 'resume' | 'manual' | 'certification';
  verified: boolean;
}

export interface CareerSWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  department: Department;
  graduationYear: number;
  targetSalary: string;
  rawResumeText?: string;
  skills: SkillBadge[];
  swot: CareerSWOT;
  missingProfileFields: (keyof StudentProfile)[];
  updatedAt: number;
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  department: Department;
  deadline: string; // ISO 8601 string (YYYY-MM-DD)
  difficulty: DifficultyLevel;
  credibilityScore: number; // 1 to 5 scale
  requiredSkills: string[];
  matchScore: number; // Computed 0 - 100%
  portalUrl: string;
}

export interface LearningPathwayNode {
  id: string;
  title: string;
  targetSkill: string;
  provider: string;
  timeCommitment: string;
  courseUrl: string;
  prerequisites: string[];
  isUnlocked: boolean;
}

export interface RecommendationEngineResult {
  internships: Internship[];
  pathways: LearningPathwayNode[];
  profileMatchAverage: number;
}