import React from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Download, 
  FileText, 
  Video, 
  ExternalLink, 
  Clock, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { Lesson, Material } from '../types';

interface LessonModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onToggleComplete: (lessonId: string) => void;
  projectorMode: boolean;
  onDownloadMaterialPrompt: (material: Material) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onToggleComplete,
  projectorMode,
  onDownloadMaterialPrompt
}) => {
  if (!lesson) return null;

  return (
    <div 
      id="lesson-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="lesson-modal-content"
        className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all border ${
          projectorMode 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 shrink-0 ${
          projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                Bài học {lesson.lessonNumber}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                projectorMode ? 'bg-slate-700 text-slate-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {lesson.topic}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {lesson.recommendedWeek}
              </span>
            </div>
            
            <h3 className={`font-bold leading-tight ${projectorMode ? 'text-2xl text-white' : 'text-xl sm:text-2xl text-slate-900'}`}>
              {lesson.title}
            </h3>
            <p className={`text-xs sm:text-sm mt-1.5 ${projectorMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {lesson.shortDesc}
            </p>
          </div>

          <button
            id="btn-close-lesson-modal"
            onClick={onClose}
            className={`p-2 rounded-xl border transition ${
              projectorMode 
                ? 'border-slate-700 hover:bg-slate-700 text-slate-300' 
                : 'border-slate-200 hover:bg-slate-200 text-slate-600'
            }`}
            aria-label="Đóng bài học"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Key points to master */}
          <div className={`p-4 rounded-xl border ${
            projectorMode 
              ? 'bg-slate-800/80 border-slate-700' 
              : 'bg-amber-50/70 border-amber-200/80 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-2 text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Trọng tâm kiến thức Thầy Trần Văn Bích yêu cầu ghi nhớ:</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Lesson Lecture Content */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Nội dung bài giảng chi tiết:</span>
            </h4>
            <div className={`p-4 rounded-xl border font-sans leading-relaxed whitespace-pre-line text-xs sm:text-sm ${
              projectorMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200' 
                : 'bg-white border-slate-200 text-slate-700'
            }`}>
              {lesson.mainContent}
            </div>
          </div>

          {/* Study Materials List */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-indigo-600">
              <Layers className="w-4 h-4" />
              <span>Tài liệu học tập & Giáo trình đính kèm ({lesson.materials.length}):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.materials.map((mat) => (
                <div 
                  key={mat.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition hover:shadow-xs ${
                    projectorMode 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      {mat.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate leading-tight" title={mat.title}>
                        {mat.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="uppercase font-mono font-bold text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                          {mat.type}
                        </span>
                        <span>{mat.sizeOrDuration}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDownloadMaterialPrompt(mat)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition shrink-0 cursor-pointer"
                    title="Mở hoặc tải tài liệu"
                    aria-label={`Tải tài liệu ${mat.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
          projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Thời lượng dự kiến: <strong>{lesson.durationMinutes} phút</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="btn-toggle-lesson-complete"
              onClick={() => onToggleComplete(lesson.id)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                lesson.isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {lesson.isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã học (Bấm để hủy đánh dấu)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Đánh dấu đã hoàn thành bài học</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm transition cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
