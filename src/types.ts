export interface MusyawarahSession {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'draft' | 'active' | 'finished';
  category: MusyawarahCategory;
  leader: string;
  secretary: string;
}

export type MusyawarahCategory =
  | 'Pembangunan Infrastruktur'
  | 'Pemberdayaan & Sosial'
  | 'Alokasi Dana Desa (ADD)'
  | 'Keamanan & Ketertiban'
  | 'Keadaan Darurat & Bencana'
  | 'Regulasi & Hukum Desa';

export interface AgendaItem {
  id: string;
  sessionId: string;
  topic: string;
  duration: string;
  speaker: string;
  status: 'pending' | 'ongoing' | 'completed';
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  name: string;
  nik: string;
  role: string;
  phone?: string;
  timestamp: string;
  signature: string; // Base64 signature image
}

export interface ActionItem {
  id: string;
  task: string;
  pic: string;
  deadline: string;
}

export interface MinutesRecord {
  sessionId: string;
  summary: string;
  discussionPoints: string[];
  actionItems: ActionItem[];
}

export interface DecisionRecord {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  method: 'Mufakat' | 'Voting';
  votes?: {
    agree: number;
    disagree: number;
    abstain: number;
  };
  status: 'Draft' | 'Disahkan' | 'Dibatalkan';
}
