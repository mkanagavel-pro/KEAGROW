export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
  statusBadge: string;
  technologies: string[];
  caseStudy?: {
    challenge: string;
    solution: string;
    technology: string;
    outcome: string;
  };
  accentColor?: string;
}

export interface Inquiry {
  id: string;
  receivedAt: string;
  read: boolean;
  confirmed?: boolean;
  confirmedAt?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export interface ServiceCategory {
  number: string;
  title: string;
  tagline: string;
  items: string[];
  note?: string;
}

export interface CreativeService {
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface WhyPrinciple {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialization: string[];
  initials: string;
  photo?: string;
}

export interface TechCategory {
  title: string;
  items: { name: string; tag: string }[];
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}
