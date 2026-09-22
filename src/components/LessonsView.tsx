import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Video, 
  Clock, 
  Layers, 
  Filter,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Lesson, Material } from '../types';
import { LessonModal } from './LessonModal';

interface LessonsViewProps {
  lessons: Lesson[];
  onToggleComplete: (lessonId: string) => void;
  projectorMode: boolean;
  onDownloadMaterial: (material: Material) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  lessons,
  onToggleComplete,
  projectorMode,
  onDownloadMaterial
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Extract distinct topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    lessons.forEach(l => set.add(l.topic));
    return Array.from(set);
  }, [lessons]);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
      // Search query
      const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.mainContent.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      // Status filter
      if (statusFilter === 'completed' && !l.isCompleted) return false;
      if (statusFilter === 'uncompleted' && l.isCompleted) return false;

      // Topic filter
      if (selectedTopic !== 'all' && l.topic !== selectedTopic) return false;

      return true;
    });
  }, [lessons, searchQuery, statusFilter, selectedTopic]);

  const completedCount = lessons.filter(l => l.isCompleted).length;

  return (
    <div id="view-lessons" className={`space-y-6 ${projectorMode ? 'text-lg' : ''}`}>
      {/* Header section with summary */}
      <div className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Chương trình môn học • THPT Bùi Dục Tài
            </span>
          </div>
          <h2 className={`font-bold tracking-tight text-slate-900 ${projectorMode ? 'text-white text-2xl' : 'text-xl sm:text-2xl'}`}>
            Danh mục Bài học & Tài liệu học tập
          </h2>
          <p className={`text-xs sm:text-sm text-slate-500 ${projectorMode ? 'text-slate-300' : ''}`}>
            Do Thầy Trần Văn Bích biên soạn và giảng dạy. Bao gồm bài giảng điện tử, tóm tắt lý thuyết và tài liệu đính kèm.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-500">Tiến độ bài giảng</div>
            <div className="text-base sm:text-lg font-bold text-blue-600">
              {completedCount} / {lessons.length} đã học
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-xs bg-blue-50 text-blue-800">
            {lessons.length > 0 ? `${Math.round((completedCount / lessons.length) * 100)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-lessons"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên bài học, nội dung kiến thức, thuật toán..."
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                projectorMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
            <button
              id="filter-status-all"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({lessons.length})
            </button>
            <button
              id="filter-status-uncompleted"
              onClick={() => setStatusFilter('uncompleted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'uncompleted'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chưa học ({lessons.length - completedCount})
            </button>
            <button
              id="filter-status-completed"
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'completed'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đã học ({completedCount})
            </button>
          </div>
        </div>

        {/* Topic Pills */}
        {topics.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
            <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Chủ đề:
            </span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                selectedTopic === 'all'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Toàn bộ chủ đề
            </button>
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lessons List Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-base">Không tìm thấy bài học phù hợp</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc để hiển thị toàn bộ bài giảng.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('all'); setSelectedTopic('all'); }}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold hover:bg-blue-100 transition"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              id={`lesson-card-${lesson.id}`}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-sm ${
                projectorMode
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                {/* Card Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                      #{lesson.lessonNumber}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      projectorMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lesson.topic}
                    </span>
                  </div>

                  {/* Complete status badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(lesson.id);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                      lesson.isCompleted
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Bấm để thay đổi trạng thái đã học"
                  >
                    {lesson.isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã học</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Chưa học</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Lesson Title */}
                <h3 className={`font-bold leading-snug ${projectorMode ? 'text-xl' : 'text-base'} text-slate-900 ${projectorMode ? 'text-white' : ''}`}>
                  {lesson.title}
                </h3>

                {/* Short Description */}
                <p className={`text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed ${projectorMode ? 'text-slate-300' : ''}`}>
                  {lesson.shortDesc}
                </p>

                {/* Materials & duration preview */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {lesson.durationMinutes} phút
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {lesson.recommendedWeek}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-blue-600">
                    <Layers className="w-3.5 h-3.5" />
                    {lesson.materials.length} tài liệu học tập
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`btn-view-lesson-${lesson.id}`}
                  onClick={() => setActiveLesson(lesson)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem bài học</span>
                </button>

                <button
                  onClick={() => onToggleComplete(lesson.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition cursor-pointer ${
                    lesson.isCompleted
                      ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title={lesson.isCompleted ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
                >
                  {lesson.isCompleted ? 'Hủy hoàn thành' : 'Đã học'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lesson Details Modal */}
      <LessonModal
        lesson={activeLesson}
        onClose={() => setActiveLesson(null)}
        onToggleComplete={(id) => {
          onToggleComplete(id);
          // Also update activeLesson state so modal UI updates immediately
          if (activeLesson && activeLesson.id === id) {
            setActiveLesson({ ...activeLesson, isCompleted: !activeLesson.isCompleted });
          }
        }}
        projectorMode={projectorMode}
        onDownloadMaterialPrompt={onDownloadMaterial}
      />
    </div>
  );
};
