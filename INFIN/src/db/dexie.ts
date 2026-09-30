import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { StudentProfile, Internship, LearningPathwayNode } from '../types';

export class SkillOrbitDatabase extends Dexie {
  profiles!: Table<StudentProfile, string>;
  internships!: Table<Internship, string>;
  pathways!: Table<LearningPathwayNode, string>;

  constructor() {
    super('SkillOrbitDB');
    this.version(1).stores({
      profiles: 'id, department, graduationYear, updatedAt',
      internships: 'id, department, deadline, difficulty, matchScore',
      pathways: 'id, targetSkill, isUnlocked'
    });
  }
}

export const db = new SkillOrbitDatabase();