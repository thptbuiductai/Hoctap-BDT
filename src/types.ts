/**
 * Định nghĩa cấu trúc dữ liệu cho Hệ thống Trợ lý học tập THPT Bùi Dục Tài
 * Quản trị bởi Thầy Trần Văn Bích
 */

export type NavigationTab = 'overview' | 'lessons' | 'assignments' | 'grades' | 'announcements';

export interface StudentProfile {
  name: string;
  studentId: string;
  class: string;
  schoolYear: string;
  avatarUrl?: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'doc' | 'slide' | 'link';
  sizeOrDuration: string;
  url?: string;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  topic: string;
  shortDesc: string;
  mainContent: string;
  keyPoints: string[];
  materials: Material[];
  isCompleted: boolean;
  durationMinutes: number;
  recommendedWeek: string;
}

export type AssignmentStatus = 'not_started' | 'in_progress' | 'completed';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assignment {
  id: string;
  title: string;
  topic: string;
  description: string;
  deadline: string; // e.g., "28/09/2026 - 23:59"
  status: AssignmentStatus;
  maxScore: number;
  score?: number;
  submittedAt?: string;
  feedback?: string;
  questions?: QuizQuestion[];
  essayPrompt?: string;
  studentSubmission?: {
    selectedAnswers?: Record<string, number>;
    essayText?: string;
  };
}

export interface GradeItem {
  id: string;
  title: string;
  category: 'Miệng' | '15 phút' | '1 tiết (Giữa kỳ)' | 'Học kỳ' | 'Thực hành';
  weight: number; // hệ số 1, 2, 3
  score: number;
  maxScore: number;
  date: string;
  status: 'completed' | 'pending';
  note: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string; // "Thầy Trần Văn Bích"
  isImportant: boolean;
  isRead: boolean;
  category: 'Lịch học' | 'Bài tập' | 'Kiểm tra' | 'Chung';
}
