import type { StudentProfile, Department, ProficiencyLevel, SkillBadge } from '../types';

const KNOWN_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Docker',
  'Kubernetes', 'AWS', 'Node.js', 'PostgreSQL', 'Figma', 'System Design'
];

export async function parseResumeFile(file: File): Promise<Partial<StudentProfile>> {
  const text = await readFileAsText(file);
  return parseResumeText(text);
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

export function parseResumeText(text: string): Partial<StudentProfile> {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // 1. Guess Name (assume top line)
  const fullName = lines[0] && lines[0].length < 40 ? lines[0] : '';

  // 2. Extract Email via Regex
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 3. Extract Department
  let department: Department | undefined;
  if (/data\s*science|machine\s*learning|ai/i.test(text)) {
    department = 'Data Science';
  } else if (/computer\s*science|software|full\s*stack/i.test(text)) {
    department = 'Computer Science';
  } else if (/cyber|security|infosec/i.test(text)) {
    department = 'Cybersecurity';
  } else if (/design|ux|ui/i.test(text)) {
    department = 'Design';
  } else if (/product\s*manager|product/i.test(text)) {
    department = 'Product';
  }

  // 4. Extract Skills
  const detectedSkills: SkillBadge[] = [];
  KNOWN_SKILLS.forEach((skill) => {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(text)) {
      detectedSkills.push({
        id: crypto.randomUUID(),
        name: skill,
        level: 'Intermediate' as ProficiencyLevel,
        source: 'resume',
        verified: false,
      });
    }
  });

  // 5. Extract Graduation Year (looks for 2024–2030)
  const gradMatch = text.match(/\b(202[4-9]|2030)\b/);
  const graduationYear = gradMatch ? parseInt(gradMatch[0], 10) : undefined;

  return {
    fullName,
    email,
    department,
    graduationYear,
    skills: detectedSkills,
    rawResumeText: text,
  };
}

export function evaluateMissingFields(profile: Partial<StudentProfile>): (keyof StudentProfile)[] {
  const missing: (keyof StudentProfile)[] = [];
  if (!profile.fullName) missing.push('fullName');
  if (!profile.department) missing.push('department');
  if (!profile.graduationYear) missing.push('graduationYear');
  if (!profile.targetSalary) missing.push('targetSalary');
  if (!profile.swot || !profile.swot.strengths?.length) missing.push('swot');
  return missing;
}