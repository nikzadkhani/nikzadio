import resumeData from '../generated/resume.json';
import { Resume, Category, categoryToJSON } from '../generated/resume';

// Strongly typed message from Proto
export const RESUME = Resume.fromJSON(resumeData);


export interface Experience {
    company: string
    tagline?: string
    title: string
    start: Date
    end?: Date
    location: string
    description?: string[]
    skills?: string[]
}

export interface EducationInfo {
    school: string
    degree: string
    start: Date
    end?: Date
}

export interface PublicationInfo {
    title: string
    conference: string
    date: Date
    description: string[]
    link?: string
    skills?: string[]
}

// Convert Proto Enum to Pretty UI Labels
const CATEGORY_LABELS: Record<string, string> = {
    LANGUAGES: "Languages",
    FRONTEND_FRAMEWORKS: "Frontend & Frameworks",
    CLOUD_INFRASTRUCTURE: "Cloud & Infrastructure",
    DATA_AI: "Data & AI",
    TOOLS_OS: "Tools & OS"
};

// Backward compatibility for existing components
export const EXPERIENCE: Experience[] = RESUME.jobs.map(job => ({
    company: job.company,
    tagline: job.tagline,
    title: job.title,
    start: new Date(job.start),
    end: job.end ? new Date(job.end) : undefined,
    location: job.location,
    description: job.description,
    skills: job.skills
}));

export const EDUCATION: EducationInfo[] = RESUME.education.map(edu => ({
    school: edu.school,
    degree: edu.degree,
    start: new Date(edu.start),
    end: edu.end ? new Date(edu.end) : undefined
}));

export const PUBLICATIONS: PublicationInfo[] = RESUME.publications.map(pub => ({
    title: pub.title,
    conference: pub.conference,
    date: new Date(pub.date),
    description: pub.description,
    link: pub.link || undefined,
    skills: pub.skills
}));

// Transform repeated SkillGroup to Record<string, string[]>
export const SKILLS: Record<string, string[]> = RESUME.skills.reduce((acc, group) => {
    const enumKey = categoryToJSON(group.category);
    const label = CATEGORY_LABELS[enumKey] || enumKey;
    acc[label] = group.names;
    return acc;
}, {} as Record<string, string[]>);
