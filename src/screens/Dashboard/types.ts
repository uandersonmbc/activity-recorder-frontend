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

interface Hour {
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
  type_id: number;
  start: string;
}
