import { inflate } from 'zlib';

export interface Week {
  dayWeek: string;
  pause: Hour;
  coffee: Hour;
  lunch: Hour;
  total: Hour;
  absent: Hour;
  start_date_timestamp: string;
  end_date_timestamp: string;
}

export interface Hour {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DayWeek {
  activity: string;
  end: string;
  hours: Hour;
  id: string;
  project: string;
  project_id: number;
  activity_id: number;
  start: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
}

export interface Activity {
  name: string;
  id: string;
  slug: string;
}

export interface ReportsProject {
  name: string;
  slug: string;
  total: Hour;
}
export interface ReportsYear {
  day?: string;
  month?: string;
  total: Hour;
}
export interface ReportsActivity {
  name: string;
  slug: string;
  total: Hour;
}
