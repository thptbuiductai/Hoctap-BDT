import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  Award, 
  Send, 
  RotateCcw,
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Assignment } from '../types';

interface AssignmentModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSubmitAssignment: (
    assignmentId: string, 
    answers: Record<string, number>, 
    essayText: string, 
    calculatedScore: number
  ) => void;
  projectorMode: boolean;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  assignment,
  onClose,
  onSubmitAssignment,
  projectorMode
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [essayText, setEssayText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync state when assignment changes
  useEffect(() => {
    if (assignment) {
      setSelectedAnswers(assignment.studentSubmission?.selectedAnswers || {});
      setEssayText(assignment.studentSubmission?.essayText || '');
      setSubmitted(assignment.status === 'completed');
    }
  }, [assignment]);

  if (!assignment) return null;

  const questions = assignment.questions || [];

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submitted) return; // locked if already completed
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate score from multiple choice questions
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const totalQuestions = questions.length;
    let finalScore = assignment.maxScore;

    if (totalQuestions > 0) {
      // 70% multiple choice + 30% essay effort if essay exists
      if (assignment.essayPrompt) {
        const mcScore = (correctCount / totalQuestions) * 7;
        const essayBonus = essayText.trim().length > 15 ? 2.5 : essayText.trim().length > 0 ? 1.5 : 0;
        finalScore = Math.min(10, Math.round((mcScore + essayBonus) * 10) / 10);
      } else {
        finalScore = Math.round(((correctCount / totalQuestions) * 10) * 10) / 10;
      }
    }

    setSubmitted(true);
    onSubmitAssignment(assignment.id, selectedAnswers, essayText, finalScore);
  };

  const isCompleted = assignment.status === 'completed' || submitted;

  return (
    <div 
      id="assignment-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="assignment-modal-content"
        className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all border ${
          projectorMode 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 shrink-0 ${
          projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isCompleted 
                  ? 'bg-emerald-600 text-white' 
                  : assignment.status === 'in_progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-amber-500 text-white'
              }`}>
                {isCompleted ? 'Đã hoàn thành' : assignment.status === 'in_progress' ? 'Đang làm bài' : 'Chưa làm'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                {assignment.topic}
              </span>
              <span className="text-xs text-amber-700 font-medium flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                Hạn nộp: {assignment.deadline}
              </span>
            </div>

            <h3 className={`font-bold leading-tight ${projectorMode ? 'text-2xl text-white' : 'text-xl sm:text-2xl text-slate-900'}`}>
              {assignment.title}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 text-slate-600 ${projectorMode ? 'text-slate-300' : ''}`}>
              {assignment.description}
            </p>
          </div>

          <button
            id="btn-close-assignment-modal"
            onClick={onClose}
            className={`p-2 rounded-xl border transition ${
              projectorMode 
                ? 'border-slate-700 hover:bg-slate-700 text-slate-300' 
                : 'border-slate-200 hover:bg-slate-200 text-slate-600'
            }`}
            aria-label="Đóng giao diện bài tập"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Result Banner if Completed */}
          {isCompleted && assignment.score !== undefined && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {assignment.score}
                </div>
                <div>
                  <div className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã nộp bài và chấm điểm thành công!</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Thời điểm nộp: {assignment.submittedAt || 'Gần đây'} • Thang điểm: {assignment.maxScore} điểm
                  </div>
                </div>
              </div>

              {assignment.feedback && (
                <div className="text-xs bg-white p-2.5 rounded-lg border border-emerald-200 text-slate-700 sm:max-w-xs">
                  <span className="font-bold text-emerald-800 block">Lời nhận xét của Thầy:</span>
                  {assignment.feedback}
                </div>
              )}
            </div>
          )}

          {/* Interactive Multiple Choice Questions */}
          {questions.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-blue-600">
                  <HelpCircle className="w-4 h-4" />
                  <span>Phần I: Câu hỏi trắc nghiệm kiến thức ({questions.length} câu)</span>
                </h4>
                <span className="text-xs text-slate-500">Chọn phương án đúng nhất</span>
              </div>

              {questions.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const studentAns = selectedAnswers[q.id];
                const isCorrect = isCompleted && studentAns === q.correctAnswer;

                return (
                  <div 
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all ${
                      projectorMode 
                        ? 'bg-slate-800/90 border-slate-700' 
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-3 flex items-start gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold shrink-0 mt-0.5">
                        Câu {qIndex + 1}
                      </span>
                      <span className={projectorMode ? 'text-white' : 'text-slate-800'}>
                        {q.question}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = studentAns === optIndex;
                        const isRightAnswer = isCompleted && q.correctAnswer === optIndex;
                        const isWrongChoice = isCompleted && isSelected && !isRightAnswer;

                        return (
                          <label
                            key={optIndex}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer ${
                              isRightAnswer
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                : isWrongChoice
                                ? 'bg-rose-50 border-rose-300 text-rose-900'
                                : isSelected
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium'
                                : projectorMode
                                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={isSelected}
                              disabled={isCompleted}
                              onChange={() => handleSelectOption(q.id, optIndex)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 shrink-0"
                            />
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1 leading-relaxed">{opt}</span>
                            
                            {isRightAnswer && (
                              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1 shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Đáp án đúng
                              </span>
                            )}
                            {isWrongChoice && (
                              <span className="text-rose-600 text-xs font-bold flex items-center gap-1 shrink-0">
                                <AlertCircle className="w-3.5 h-3.5" /> Chưa chính xác
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>

                    {/* Teacher Explanation when completed */}
                    {isCompleted && (
                      <div className="mt-3 p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-blue-900">
                        <strong className="text-blue-800">Giải thích của Thầy Trần Văn Bích:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Essay / Free text section */}
          {assignment.essayPrompt && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-indigo-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>Phần II: Tự luận ngắn & Trình bày thuật toán</span>
                </h4>
              </div>

              <div className={`p-4 rounded-xl border ${
                projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                  Đề bài: {assignment.essayPrompt}
                </div>

                <textarea
                  id="textarea-essay-answer"
                  value={essayText}
                  disabled={isCompleted}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="Em hãy nhập câu trả lời hoặc đoạn code giải thuật tại đây để Thầy Bích xem..."
                  rows={4}
                  className={`w-full p-3 rounded-xl border text-xs sm:text-sm transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-sans ${
                    projectorMode 
                      ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer Controls */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
          projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Bài tập đã được nộp và lưu kết quả
              </span>
            ) : (
              <span>Vui lòng hoàn thành các câu hỏi trước khi bấm Nộp bài</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isCompleted ? (
              <button
                type="button"
                id="btn-submit-assignment"
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Nộp bài & Chấm điểm ngay</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition"
                title="Làm lại bài để rèn luyện thêm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại thử sức</span>
              </button>
            )}

            <button
              type="button"
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
