import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlayCircle, 
  Search, 
  Award, 
  FileText,
  Calendar,
  Filter,
  UserCheck
} from 'lucide-react';
import { Assignment, AssignmentStatus } from '../types';
import { AssignmentModal } from './AssignmentModal';

interface AssignmentsViewProps {
  assignments: Assignment[];
  onSubmitAssignment: (
    assignmentId: string, 
    answers: Record<string, number>, 
    essayText: string, 
    calculatedScore: number
  ) => void;
  projectorMode: boolean;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  onSubmitAssignment,
  projectorMode
}) => {
  const [activeTab, setActiveTab] = useState<'all' | AssignmentStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.topic.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      if (activeTab !== 'all' && a.status !== activeTab) return false;

      return true;
    });
  }, [assignments, searchQuery, activeTab]);

  const stats = {
    total: assignments.length,
    notStarted: assignments.filter(a => a.status === 'not_started').length,
    inProgress: assignments.filter(a => a.status === 'in_progress').length,
    completed: assignments.filter(a => a.status === 'completed').length,
  };

  return (
    <div id="view-assignments" className={`space-y-6 ${projectorMode ? 'text-lg' : ''}`}>
      {/* Header card with quick numbers */}
      <div className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <CheckSquare className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Nhiệm vụ & Bài tập thực hành
            </span>
          </div>
          <h2 className={`font-bold tracking-tight text-slate-900 ${projectorMode ? 'text-white text-2xl' : 'text-xl sm:text-2xl'}`}>
            Danh mục Bài tập THPT Bùi Dục Tài
          </h2>
          <p className={`text-xs sm:text-sm text-slate-500 ${projectorMode ? 'text-slate-300' : ''}`}>
            Các bài tập vận dụng kiến thức, rèn luyện tư duy thuật toán và kiểm tra định kỳ do Thầy Trần Văn Bích giao.
          </p>
        </div>

        {/* Stats counter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[80px]">
            <div className="text-[10px] uppercase font-bold text-emerald-700">Đã nộp</div>
            <div className="text-lg font-bold text-emerald-800">{stats.completed}</div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-center min-w-[80px]">
            <div className="text-[10px] uppercase font-bold text-blue-700">Đang làm</div>
            <div className="text-lg font-bold text-blue-800">{stats.inProgress}</div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center min-w-[80px]">
            <div className="text-[10px] uppercase font-bold text-amber-700">Chưa làm</div>
            <div className="text-lg font-bold text-amber-800">{stats.notStarted}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-assignments"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..."
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                projectorMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('not_started')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'not_started'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chưa làm ({stats.notStarted})
            </button>
            <button
              onClick={() => setActiveTab('in_progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'in_progress'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đang làm ({stats.inProgress})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'completed'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đã nộp ({stats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Assignments Cards List */}
      {filteredAssignments.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-3">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-base">Không có bài tập nào trong danh mục này</h4>
          <p className="text-xs text-slate-500">
            Hãy chọn bộ lọc "Tất cả" để xem toàn bộ danh mục bài tập của Thầy Trần Văn Bích.
          </p>
          <button
            onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold hover:bg-blue-100 transition"
          >
            Hiện tất cả bài tập
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((asg) => {
            const isCompleted = asg.status === 'completed';
            const isInProgress = asg.status === 'in_progress';
            const isNotStarted = asg.status === 'not_started';

            return (
              <div
                key={asg.id}
                id={`assignment-card-${asg.id}`}
                className={`p-5 rounded-2xl border transition-all hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  projectorMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : isCompleted
                    ? 'bg-white border-slate-200 hover:border-emerald-300'
                    : isInProgress
                    ? 'bg-white border-blue-200 hover:border-blue-400'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                {/* Left Side: Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInProgress
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isInProgress && <PlayCircle className="w-3.5 h-3.5" />}
                      {isNotStarted && <Clock className="w-3.5 h-3.5" />}
                      <span>
                        {isCompleted ? 'Đã hoàn thành' : isInProgress ? 'Đang làm bài' : 'Chưa làm'}
                      </span>
                    </span>

                    <span className={`text-xs px-2 py-0.5 rounded-md ${
                      projectorMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700 font-medium'
                    }`}>
                      {asg.topic}
                    </span>

                    {/* Deadline */}
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hạn nộp: <strong className="text-slate-700">{asg.deadline}</strong></span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-bold leading-snug ${projectorMode ? 'text-xl' : 'text-base sm:text-lg'} text-slate-900 ${projectorMode ? 'text-white' : ''}`}>
                    {asg.title}
                  </h3>
                  <p className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${projectorMode ? 'text-slate-300' : ''}`}>
                    {asg.description}
                  </p>

                  {/* Question count & feedback preview */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>{asg.questions ? `${asg.questions.length} câu hỏi trắc nghiệm` : 'Bài tập tự luận'}</span>
                    {asg.submittedAt && (
                      <span className="text-emerald-700">Đã nộp vào: {asg.submittedAt}</span>
                    )}
                    {asg.feedback && (
                      <span className="text-blue-600 italic">
                        "{asg.feedback}"
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Score & Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {isCompleted && asg.score !== undefined && (
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Điểm đạt được</div>
                      <div className="text-2xl font-black text-emerald-600 leading-none mt-0.5">
                        {asg.score} <span className="text-xs font-normal text-slate-400">/ 10</span>
                      </div>
                    </div>
                  )}

                  <button
                    id={`btn-do-assignment-${asg.id}`}
                    onClick={() => setSelectedAssignment(asg)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-xs cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isCompleted ? 'Xem lại bài làm' : 'Làm bài'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Assignment Solver Modal */}
      <AssignmentModal
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onSubmitAssignment={(id, answers, essay, score) => {
          onSubmitAssignment(id, answers, essay, score);
          // Also update selectedAssignment locally
          if (selectedAssignment && selectedAssignment.id === id) {
            setSelectedAssignment({
              ...selectedAssignment,
              status: 'completed',
              score,
              submittedAt: 'Vừa xong',
              feedback: 'Thầy Trần Văn Bích đã ghi nhận bài nộp của em!',
              studentSubmission: {
                selectedAnswers: answers,
                essayText: essay
              }
            });
          }
        }}
        projectorMode={projectorMode}
      />
    </div>
  );
};
