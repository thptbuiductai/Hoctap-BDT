import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  PlusCircle, 
  RotateCcw, 
  Save, 
  User, 
  BookOpen, 
  CheckSquare, 
  Bell, 
  Sparkles,
  Download,
  Upload
} from 'lucide-react';
import { StudentProfile, Lesson, Assignment, Announcement, GradeItem } from '../types';
import { SchoolLogo } from './SchoolLogo';

interface TeacherAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onUpdateStudent: (student: StudentProfile) => void;
  onAddLesson: (lesson: Lesson) => void;
  onAddAssignment: (assignment: Assignment) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onResetDataToDefault: () => void;
  totalLessons: number;
}

export const TeacherAdminModal: React.FC<TeacherAdminModalProps> = ({
  isOpen,
  onClose,
  student,
  onUpdateStudent,
  onAddLesson,
  onAddAssignment,
  onAddAnnouncement,
  onResetDataToDefault,
  totalLessons
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addLesson' | 'addAssignment' | 'addAnnouncement'>('profile');

  // Student profile form state
  const [studentName, setStudentName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);
  const [studentId, setStudentId] = useState(student.studentId);

  // New Lesson form state
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonTopic, setNewLessonTopic] = useState('Lập trình Python');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonWeek, setNewLessonWeek] = useState(`Tuần ${totalLessons + 1}`);

  // New Assignment form state
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgTopic, setNewAsgTopic] = useState('Thực hành & Thuật toán');
  const [newAsgDesc, setNewAsgDesc] = useState('');
  const [newAsgDeadline, setNewAsgDeadline] = useState('10/10/2026 - 22:00');

  // New Announcement form state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnImportant, setNewAnnImportant] = useState(false);
  const [newAnnCategory, setNewAnnCategory] = useState<'Kiểm tra' | 'Bài tập' | 'Lịch học' | 'Chung'>('Chung');

  if (!isOpen) return null;

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudent({
      ...student,
      name: studentName,
      class: studentClass,
      studentId: studentId
    });
    alert('Đã cập nhật thông tin học sinh thành công!');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const lesson: Lesson = {
      id: `lesson-${Date.now()}`,
      lessonNumber: totalLessons + 1,
      title: newLessonTitle,
      topic: newLessonTopic,
      shortDesc: newLessonDesc || 'Nội dung kiến thức do Thầy Trần Văn Bích biên soạn.',
      mainContent: `Nội dung chi tiết bài học:\n1. Giới thiệu khái niệm trọng tâm.\n2. Các ví dụ minh họa và bài tập vận dụng trên máy tính.`,
      keyPoints: ['Nắm vững định nghĩa và ứng dụng.', 'Thực hành đầy đủ các ví dụ.'],
      materials: [
        { id: `mat-${Date.now()}`, title: `Tài liệu bài giảng: ${newLessonTitle}`, type: 'pdf', sizeOrDuration: '1.5 MB' }
      ],
      isCompleted: false,
      durationMinutes: 45,
      recommendedWeek: newLessonWeek
    };

    onAddLesson(lesson);
    setNewLessonTitle('');
    setNewLessonDesc('');
    alert('Đã thêm bài học mới thành công!');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsgTitle.trim()) return;

    const assignment: Assignment = {
      id: `asg-${Date.now()}`,
      title: newAsgTitle,
      topic: newAsgTopic,
      description: newAsgDesc || 'Hoàn thành các câu hỏi trắc nghiệm và nộp bài đúng hạn.',
      deadline: newAsgDeadline,
      status: 'not_started',
      maxScore: 10,
      questions: [
        {
          id: `q-${Date.now()}-1`,
          question: `Nội dung câu hỏi kiến thức vận dụng của ${newAsgTitle}: Chọn phương án đúng?`,
          options: ['Phương án A', 'Phương án B (Chính xác)', 'Phương án C', 'Phương án D'],
          correctAnswer: 1,
          explanation: 'Đáp án B là đáp án chính xác theo giáo trình của Thầy Bích.'
        }
      ],
      essayPrompt: 'Em hãy viết tóm tắt ngắn gọn hướng giải quyết của bài tập này?'
    };

    onAddAssignment(assignment);
    setNewAsgTitle('');
    setNewAsgDesc('');
    alert('Đã thêm bài tập mới thành công!');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim()) return;

    const announcement: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      content: newAnnContent || 'Thông báo từ Thầy Trần Văn Bích tới các em học sinh.',
      date: 'Hôm nay',
      author: 'Thầy Trần Văn Bích',
      isImportant: newAnnImportant,
      isRead: false,
      category: newAnnCategory
    };

    onAddAnnouncement(announcement);
    setNewAnnTitle('');
    setNewAnnContent('');
    alert('Đã đăng thông báo mới thành công!');
  };

  return (
    <div 
      id="teacher-admin-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="teacher-admin-modal-content"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <SchoolLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />
            <div>
              <div className="text-xs font-bold text-blue-700 uppercase">Khu vực dành cho giáo viên</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Quản trị & Tùy chỉnh dữ liệu học tập
              </h3>
              <p className="text-xs text-slate-500">Giáo viên: Thầy Trần Văn Bích • THPT Bùi Dục Tài</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Học sinh</span>
          </button>
          <button
            onClick={() => setActiveTab('addLesson')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'addLesson' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thêm bài học</span>
          </button>
          <button
            onClick={() => setActiveTab('addAssignment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'addAssignment' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Thêm bài tập</span>
          </button>
          <button
            onClick={() => setActiveTab('addAnnouncement')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'addAnnouncement' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Đăng thông báo</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Tab 1: Edit Student Info */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh đang theo dõi:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lớp:
                  </label>
                  <input
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mã học sinh:
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thông tin học sinh</span>
              </button>
            </form>
          )}

          {/* Tab 2: Add Lesson */}
          {activeTab === 'addLesson' && (
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên bài học mới:
                </label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Ví dụ: Bài 7: Thuật toán đồ thị và ứng dụng"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chủ đề / Chuyên đề:
                  </label>
                  <input
                    type="text"
                    value={newLessonTopic}
                    onChange={(e) => setNewLessonTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tuần học dự kiến:
                  </label>
                  <input
                    type="text"
                    value={newLessonWeek}
                    onChange={(e) => setNewLessonWeek(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả tóm tắt bài học:
                </label>
                <textarea
                  value={newLessonDesc}
                  onChange={(e) => setNewLessonDesc(e.target.value)}
                  rows={3}
                  placeholder="Tóm tắt ngắn gọn mục tiêu bài học..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm bài học vào danh sách</span>
              </button>
            </form>
          )}

          {/* Tab 3: Add Assignment */}
          {activeTab === 'addAssignment' && (
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên bài tập:
                </label>
                <input
                  type="text"
                  value={newAsgTitle}
                  onChange={(e) => setNewAsgTitle(e.target.value)}
                  placeholder="Ví dụ: Bài tập 05: Cài đặt thuật toán Sắp xếp nhanh"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chủ đề:
                  </label>
                  <input
                    type="text"
                    value={newAsgTopic}
                    onChange={(e) => setNewAsgTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thời hạn nộp:
                  </label>
                  <input
                    type="text"
                    value={newAsgDeadline}
                    onChange={(e) => setNewAsgDeadline(e.target.value)}
                    placeholder="Ví dụ: 15/10/2026 - 23:59"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả yêu cầu bài tập:
                </label>
                <textarea
                  value={newAsgDesc}
                  onChange={(e) => setNewAsgDesc(e.target.value)}
                  rows={3}
                  placeholder="Yêu cầu học sinh cần đạt..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Giao bài tập mới cho học sinh</span>
              </button>
            </form>
          )}

          {/* Tab 4: Add Announcement */}
          {activeTab === 'addAnnouncement' && (
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề thông báo:
                </label>
                <input
                  type="text"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="Ví dụ: Lịch thi giữa học kỳ và danh sách phòng thi"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chuyên mục:
                  </label>
                  <select
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Kiểm tra">Kiểm tra</option>
                    <option value="Bài tập">Bài tập</option>
                    <option value="Lịch học">Lịch học</option>
                    <option value="Chung">Chung</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="chk-important"
                    checked={newAnnImportant}
                    onChange={(e) => setNewAnnImportant(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="chk-important" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Ghim nổi bật (Quan trọng)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung thông báo:
                </label>
                <textarea
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  rows={4}
                  placeholder="Nhập nội dung dặn dò của Thầy Bích..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Đăng thông báo lên hệ thống</span>
              </button>
            </form>
          )}

          {/* Data Reset Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-800">Khôi phục dữ liệu mẫu ban đầu</div>
                <div className="text-[11px] text-slate-500">
                  Đặt lại toàn bộ danh mục bài học, bài tập, điểm số và thông báo chuẩn.
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Em/Thầy có chắc chắn muốn khôi phục lại toàn bộ dữ liệu mẫu ban đầu?')) {
                    onResetDataToDefault();
                    onClose();
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 text-xs font-semibold text-slate-700 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mẫu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
