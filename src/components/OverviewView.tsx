import React from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { Lesson, Assignment, GradeItem, Announcement, StudentProfile, NavigationTab } from '../types';
import { SchoolLogo } from './SchoolLogo';

interface OverviewViewProps {
  student: StudentProfile;
  lessons: Lesson[];
  assignments: Assignment[];
  grades: GradeItem[];
  announcements: Announcement[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenAssignment: (assignment: Assignment) => void;
  onOpenAnnouncement: (announcement: Announcement) => void;
  projectorMode: boolean;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  student,
  lessons,
  assignments,
  grades,
  announcements,
  onNavigate,
  onOpenLesson,
  onOpenAssignment,
  onOpenAnnouncement,
  projectorMode
}) => {
  // Statistics calculation
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const lessonProgressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const pendingAssignments = assignments.filter(a => a.status !== 'completed');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  // GPA calculation with weights
  const completedGrades = grades.filter(g => g.status === 'completed');
  const totalWeight = completedGrades.reduce((sum, g) => sum + g.weight, 0);
  const weightedSum = completedGrades.reduce((sum, g) => sum + (g.score * g.weight), 0);
  const averageGrade = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '8.8';

  // Academic rating based on average score (THPT benchmark)
  const numericAvg = parseFloat(averageGrade);
  const ratingText = numericAvg >= 9.0 ? 'Xuất sắc' : numericAvg >= 8.0 ? 'Học lực Tốt' : numericAvg >= 6.5 ? 'Học lực Khá' : 'Đạt';
  const ratingBadgeClass = numericAvg >= 8.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800';

  // Important / Pinned announcement
  const pinnedAnnouncement = announcements.find(a => a.isImportant) || announcements[0];

  // Next lesson to learn
  const nextLesson = lessons.find(l => !l.isCompleted) || lessons[0];

  // Next assignment to do
  const nextAssignment = assignments.find(a => a.status !== 'completed') || assignments[0];

  // Current greeting time
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Chào buổi sáng' : currentHour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  return (
    <div id="view-overview" className={`space-y-6 ${projectorMode ? 'text-lg' : ''}`}>
      {/* 1. Student Greeting & School Header Banner */}
      <div 
        id="overview-hero-card"
        className={`rounded-2xl p-6 sm:p-8 transition-all border ${
          projectorMode
            ? 'bg-slate-800 border-slate-700 text-white shadow-xl'
            : 'bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-md'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-xs border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Hệ thống Học tập THPT Bùi Dục Tài • Năm học {student.schoolYear}</span>
            </div>
            
            <h2 className={`font-bold tracking-tight text-white ${
              projectorMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl lg:text-3xl'
            }`}>
              {timeGreeting}, em <span className="text-amber-300 underline decoration-amber-300/40">{student.name}</span>!
            </h2>
            
            <p className={`text-blue-100 max-w-2xl leading-relaxed ${
              projectorMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}>
              Chào mừng em đến với không gian học tập lớp <span className="font-semibold text-white">{student.class}</span> dưới sự hướng dẫn của <span className="font-semibold text-white">Thầy Trần Văn Bích</span>. Chúc em tiếp thu thật nhiều kiến thức bổ ích!
            </p>
          </div>

          {/* Quick Action Badges with School Logo */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center min-w-[105px]">
              <SchoolLogo className="w-12 h-12 drop-shadow-md transition hover:scale-105" />
              <span className="text-[10px] font-bold text-white tracking-wider uppercase mt-1">THPT Bùi Dục Tài</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center min-w-[120px]">
              <div className="text-xs text-blue-200">Xếp loại hiện tại</div>
              <div className="text-lg sm:text-xl font-bold text-amber-300 mt-0.5">{ratingText}</div>
              <div className="text-[11px] text-blue-100 mt-0.5">Điểm TB: {averageGrade}/10</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center min-w-[120px]">
              <div className="text-xs text-blue-200">Tiến độ bài học</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-0.5">{lessonProgressPercent}%</div>
              <div className="text-[11px] text-emerald-300 mt-0.5">{completedLessons}/{totalLessons} bài học</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Prominent Overview Stat Cards */}
      <div id="overview-stat-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Lessons */}
        <div 
          id="stat-card-lessons"
          onClick={() => onNavigate('lessons')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] shadow-xs ${
            projectorMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${projectorMode ? 'text-slate-300' : 'text-slate-500'}`}>
              Số bài học
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-blue-600">{completedLessons}</span>
            <span className={`text-sm font-medium ${projectorMode ? 'text-slate-400' : 'text-slate-500'}`}>
              / {totalLessons} bài đã học
            </span>
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className={projectorMode ? 'text-slate-300' : 'text-slate-600'}>
              {totalLessons - completedLessons > 0 ? `Còn ${totalLessons - completedLessons} bài cần xem` : 'Đã hoàn thành tất cả'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>

        {/* Stat 2: Assignments Pending */}
        <div 
          id="stat-card-assignments"
          onClick={() => onNavigate('assignments')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] shadow-xs ${
            projectorMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${projectorMode ? 'text-slate-300' : 'text-slate-500'}`}>
              Bài tập cần làm
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-amber-600">{pendingAssignments.length}</span>
            <span className={`text-sm font-medium ${projectorMode ? 'text-slate-400' : 'text-slate-500'}`}>
              bài tập đang chờ
            </span>
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className="text-amber-700 font-medium">
              Đã nộp {completedAssignments.length} bài
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

        {/* Stat 3: Average Grade */}
        <div 
          id="stat-card-grades"
          onClick={() => onNavigate('grades')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] shadow-xs ${
            projectorMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${projectorMode ? 'text-slate-300' : 'text-slate-500'}`}>
              Điểm trung bình
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-emerald-600">{averageGrade}</span>
            <span className={`text-sm font-medium ${projectorMode ? 'text-slate-400' : 'text-slate-500'}`}>
              / 10 điểm
            </span>
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${ratingBadgeClass}`}>
              {ratingText}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        {/* Stat 4: Total Learning Progress */}
        <div 
          id="stat-card-progress"
          onClick={() => onNavigate('grades')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] shadow-xs ${
            projectorMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${projectorMode ? 'text-slate-300' : 'text-slate-500'}`}>
              Tiến độ học tập
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-indigo-600">{lessonProgressPercent}%</span>
            <span className={`text-sm font-medium ${projectorMode ? 'text-slate-400' : 'text-slate-500'}`}>
              chương trình
            </span>
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className={projectorMode ? 'text-slate-300' : 'text-slate-600'}>
              Theo kế hoạch học kỳ I
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Progress Bar Section */}
      <div 
        id="overview-progress-section"
        className={`p-6 rounded-2xl border transition-all ${
          projectorMode
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className={`font-bold ${projectorMode ? 'text-xl' : 'text-lg'} text-slate-900 ${projectorMode ? 'text-white' : ''}`}>
              Thanh tiến độ học tập toàn khóa
            </h3>
            <p className={`text-xs ${projectorMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Cập nhật trực quan theo các bài học và bài tập Thầy Trần Văn Bích giao cho lớp 12A1
            </p>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
            {lessonProgressPercent}% Hoàn thành
          </span>
        </div>

        {/* Large Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5 border border-slate-200">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(lessonProgressPercent, 8)}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          {lessons.map((lesson, idx) => (
            <div 
              key={lesson.id}
              onClick={() => onOpenLesson(lesson)}
              className={`p-2 rounded-lg border text-center cursor-pointer transition hover:bg-blue-50/50 ${
                lesson.isCompleted 
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-center gap-1 font-semibold">
                {lesson.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-400 inline-block text-[10px] leading-3">
                    {idx + 1}
                  </span>
                )}
                <span>Bài {lesson.lessonNumber}</span>
              </div>
              <div className="text-[10px] truncate text-slate-500 mt-0.5" title={lesson.title}>
                {lesson.topic.split('&')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Important Announcement Highlight & Quick Task Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pinned Announcement from Teacher */}
        {pinnedAnnouncement && (
          <div 
            id="overview-pinned-announcement"
            className={`lg:col-span-2 p-6 rounded-2xl border transition-all ${
              projectorMode 
                ? 'bg-slate-800 border-slate-700 text-white' 
                : 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                  <Bell className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Thông báo quan trọng từ Thầy Trần Văn Bích
                  </span>
                  <div className="text-xs text-slate-500 mt-0.5">{pinnedAnnouncement.date}</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <h4 className={`font-bold text-slate-900 ${projectorMode ? 'text-white' : ''} text-base sm:text-lg mb-2`}>
              {pinnedAnnouncement.title}
            </h4>

            <p className={`text-slate-600 ${projectorMode ? 'text-slate-300' : ''} text-sm leading-relaxed line-clamp-3 mb-4`}>
              {pinnedAnnouncement.content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200/60 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <UserCheck className="w-4 h-4 text-amber-600" />
                <span>Người đăng: <strong>{pinnedAnnouncement.author}</strong></span>
              </div>
              <button
                onClick={() => onOpenAnnouncement(pinnedAnnouncement)}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium transition cursor-pointer"
              >
                Đọc toàn văn thông báo
              </button>
            </div>
          </div>
        )}

        {/* Right Column: Next Immediate Action (Lesson or Assignment) */}
        <div 
          id="overview-next-task"
          className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
            projectorMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              <span>Nhiệm vụ tiếp theo</span>
              <Clock className="w-4 h-4" />
            </div>

            {nextAssignment ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">
                    Bài tập cần nộp
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-2">
                    {nextAssignment.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Hạn nộp: <strong className="text-amber-700">{nextAssignment.deadline}</strong></span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 uppercase">
                    Bài học đang theo dõi
                  </span>
                  <h4 className="font-semibold text-slate-800 text-sm mt-1 line-clamp-1">
                    {nextLesson.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Thời lượng: {nextLesson.durationMinutes} phút • {nextLesson.materials.length} tài liệu
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 text-sm">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                Em đã hoàn thành xuất sắc tất cả bài tập hiện có!
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            {nextAssignment && (
              <button
                id="btn-overview-do-assignment"
                onClick={() => onOpenAssignment(nextAssignment)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Làm bài ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              id="btn-overview-view-lessons"
              onClick={() => onNavigate('lessons')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs transition cursor-pointer"
            >
              Xem bài học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
