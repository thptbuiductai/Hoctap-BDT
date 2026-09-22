import React from 'react';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  BarChart2, 
  Calendar, 
  FileCheck, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  CheckSquare
} from 'lucide-react';
import { GradeItem, Lesson, Assignment, NavigationTab } from '../types';

interface GradesProgressViewProps {
  grades: GradeItem[];
  lessons: Lesson[];
  assignments: Assignment[];
  onNavigate: (tab: NavigationTab) => void;
  projectorMode: boolean;
}

export const GradesProgressView: React.FC<GradesProgressViewProps> = ({
  grades,
  lessons,
  assignments,
  onNavigate,
  projectorMode
}) => {
  // GPA Calculation
  const completedGrades = grades.filter(g => g.status === 'completed');
  const totalWeight = completedGrades.reduce((sum, g) => sum + g.weight, 0);
  const weightedSum = completedGrades.reduce((sum, g) => sum + (g.score * g.weight), 0);
  const averageGrade = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '8.8';

  const numAvg = parseFloat(averageGrade);
  const ratingText = numAvg >= 9.0 ? 'Xuất sắc' : numAvg >= 8.0 ? 'Học lực Tốt' : numAvg >= 6.5 ? 'Học lực Khá' : 'Đạt';
  const ratingColor = numAvg >= 8.0 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-blue-600 bg-blue-50 border-blue-200';

  // Completion stats
  const completedLessons = lessons.filter(l => l.isCompleted);
  const uncompletedLessons = lessons.filter(l => !l.isCompleted);

  const completedAssignments = assignments.filter(a => a.status === 'completed');
  const pendingAssignments = assignments.filter(a => a.status !== 'completed');

  const totalItems = lessons.length + assignments.length;
  const totalCompleted = completedLessons.length + completedAssignments.length;
  const completionPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <div id="view-grades" className={`space-y-6 ${projectorMode ? 'text-lg' : ''}`}>
      {/* Header & Overview Card */}
      <div className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Hồ sơ Học tập & Đánh giá kết quả
            </span>
          </div>
          <h2 className={`font-bold tracking-tight text-slate-900 ${projectorMode ? 'text-white text-2xl' : 'text-xl sm:text-2xl'}`}>
            Bảng điểm & Theo dõi tiến độ học tập
          </h2>
          <p className={`text-xs sm:text-sm text-slate-500 ${projectorMode ? 'text-slate-300' : ''}`}>
            Hệ thống điểm kiểm tra thường xuyên, định kỳ và tiến độ hoàn thành các chuyên đề học phần.
          </p>
        </div>

        {/* GPA Highlight Badge */}
        <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Điểm TB môn</div>
            <div className="text-3xl font-black text-emerald-600 leading-tight mt-0.5">
              {averageGrade} <span className="text-xs font-normal text-slate-400">/ 10</span>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Xếp loại THPT</div>
            <div className={`text-xs font-bold px-2.5 py-1 rounded-md mt-1 border inline-block ${ratingColor}`}>
              {ratingText}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart Section: Interactive SVG Column Bar Chart */}
      <div className={`p-6 rounded-2xl border transition-all ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className={`font-bold ${projectorMode ? 'text-xl' : 'text-base sm:text-lg'} text-slate-900 ${projectorMode ? 'text-white' : ''}`}>
              Biểu đồ phân bố điểm các bài kiểm tra
            </h3>
            <p className="text-xs text-slate-500">So sánh điểm số đạt được so với thang điểm tối đa (10 điểm)</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Đã chấm điểm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-slate-200 inline-block" /> Điểm dự kiến
            </span>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end h-52 sm:h-56 px-2">
            {grades.map((item) => {
              const heightPercent = Math.max(15, (item.score / item.maxScore) * 100);
              const isCompleted = item.status === 'completed';

              return (
                <div key={item.id} className="flex flex-col items-center h-full justify-end group">
                  {/* Score pill tooltip above bar */}
                  <div className={`text-xs font-bold px-2 py-0.5 rounded-md mb-2 shadow-xs transition transform group-hover:-translate-y-1 ${
                    isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.score} đ
                  </div>

                  {/* Vertical bar */}
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl h-full flex items-end p-1 border border-slate-200">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isCompleted
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-500 group-hover:from-emerald-500 group-hover:to-teal-400'
                          : 'bg-slate-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Label under bar */}
                  <div className="text-center mt-2 w-full">
                    <div className="text-xs font-semibold text-slate-800 truncate" title={item.title}>
                      {item.category}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Hệ số {item.weight}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Grades Table */}
      <div className={`rounded-2xl border overflow-hidden transition-all ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className={`font-bold text-slate-900 ${projectorMode ? 'text-white text-lg' : 'text-base'}`}>
            Bảng điểm chi tiết từng cột điểm
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Có {completedGrades.length} cột điểm đã ghi nhận
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className={`border-b text-[11px] uppercase tracking-wider font-semibold ${
              projectorMode ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <tr>
                <th className="py-3 px-4">Tên bài kiểm tra / Đánh giá</th>
                <th className="py-3 px-4">Phân loại</th>
                <th className="py-3 px-4 text-center">Hệ số</th>
                <th className="py-3 px-4 text-center">Điểm số</th>
                <th className="py-3 px-4">Ngày thực hiện</th>
                <th className="py-3 px-4">Lời phê của Thầy Bích</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grades.map((item) => (
                <tr 
                  key={item.id}
                  className={`hover:bg-slate-50/80 transition ${
                    projectorMode ? 'hover:bg-slate-700/50' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <span className={projectorMode ? 'text-white' : ''}>{item.title}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-600">
                    x{item.weight}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-sm ${
                      item.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.score} / {item.maxScore}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 italic">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Completed vs Pending Learning Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Already Completed Items */}
        <div className={`p-6 rounded-2xl border transition-all ${
          projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-emerald-700 text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Nội dung đã hoàn thành ({totalCompleted})</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Đạt yêu cầu
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {completedLessons.map((l) => (
              <div 
                key={l.id} 
                className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800">{l.title}</div>
                    <div className="text-[11px] text-slate-500">{l.topic} • {l.recommendedWeek}</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  Đã học
                </span>
              </div>
            ))}

            {completedAssignments.map((a) => (
              <div 
                key={a.id} 
                className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800">{a.title}</div>
                    <div className="text-[11px] text-slate-500">Đạt {a.score}/10 điểm</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  Đã nộp
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Pending / In-progress Items */}
        <div className={`p-6 rounded-2xl border transition-all ${
          projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-amber-700 text-base">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Nội dung cần tiếp tục hoàn thành ({totalItems - totalCompleted})</span>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Đang chờ
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {uncompletedLessons.map((l) => (
              <div 
                key={l.id} 
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:border-blue-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800">{l.title}</div>
                    <div className="text-[11px] text-slate-500">{l.recommendedWeek}</div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 shrink-0"
                >
                  <span>Học ngay</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}

            {pendingAssignments.map((a) => (
              <div 
                key={a.id} 
                className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs hover:border-amber-400 transition"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800">{a.title}</div>
                    <div className="text-[11px] text-amber-700">Hạn nộp: {a.deadline}</div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('assignments')}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] shrink-0"
                >
                  Làm bài
                </button>
              </div>
            ))}

            {uncompletedLessons.length === 0 && pendingAssignments.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                Tuyệt vời! Em đã hoàn thành tất cả nhiệm vụ học tập hiện tại.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
