/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Trợ lý học tập THPT Bùi Dục Tài
 * Hệ thống quản trị học tập dành cho Giáo viên: Thầy Trần Văn Bích và Học sinh THPT
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  NavigationTab, 
  StudentProfile, 
  Lesson, 
  Assignment, 
  GradeItem, 
  Announcement,
  Material
} from './types';
import { 
  INITIAL_STUDENT, 
  INITIAL_LESSONS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_GRADES, 
  INITIAL_ANNOUNCEMENTS 
} from './data/learningData';
import { Navbar } from './components/Navbar';
import { Navigation } from './components/Navigation';
import { OverviewView } from './components/OverviewView';
import { LessonsView } from './components/LessonsView';
import { AssignmentsView } from './components/AssignmentsView';
import { GradesProgressView } from './components/GradesProgressView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { TeacherAdminModal } from './components/TeacherAdminModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { playSuccessChime, playSoftClick } from './utils/audio';

// Local storage keys for state persistence
const STORAGE_KEYS = {
  STUDENT: 'bdt_learning_student',
  LESSONS: 'bdt_learning_lessons',
  ASSIGNMENTS: 'bdt_learning_assignments',
  GRADES: 'bdt_learning_grades',
  ANNOUNCEMENTS: 'bdt_learning_announcements',
  SOUND: 'bdt_learning_sound_enabled',
  PROJECTOR: 'bdt_learning_projector_mode',
  CURRENT_TAB: 'bdt_learning_current_tab',
  SIDEBAR_COLLAPSED: 'bdt_learning_sidebar_collapsed'
};

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_TAB);
      if (saved && ['overview', 'lessons', 'assignments', 'grades', 'announcements'].includes(saved)) {
        return saved as NavigationTab;
      }
    } catch {
      // fallback
    }
    return 'overview';
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop Left Sidebar Collapse State
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleSidebarCollapse = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(next));
      } catch {}
      return next;
    });
  };

  // Settings & Toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SOUND) === 'true';
    } catch {
      return false; // Default quiet per requirements
    }
  });

  const [projectorMode, setProjectorMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PROJECTOR) === 'true';
    } catch {
      return false;
    }
  });

  // Data States
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STUDENT;
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_LESSONS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ASSIGNMENTS;
  });

  const [grades, setGrades] = useState<GradeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GRADES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GRADES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ANNOUNCEMENTS;
  });

  // Modals
  const [isTeacherAdminOpen, setIsTeacherAdminOpen] = useState(false);
  const [activeAnnouncementModal, setActiveAnnouncementModal] = useState<Announcement | null>(null);

  // Notifications (Toast)
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_TAB, currentTab);
    } catch {}
  }, [currentTab]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND, soundEnabled.toString());
    } catch {}
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTOR, projectorMode.toString());
    } catch {}
  }, [projectorMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
    } catch {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
    } catch {}
  }, [lessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch {}
  }, [assignments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
    } catch {}
  }, [grades]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  // Tab switching handler
  const handleSelectTab = (tab: NavigationTab) => {
    playSoftClick(soundEnabled);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      playSuccessChime(true);
      showToast('Đã bật âm thanh thông báo và phản hồi.', 'info');
    } else {
      showToast('Đã chuyển sang chế độ yên tĩnh.', 'info');
    }
  };

  // Projector mode toggle
  const handleToggleProjector = () => {
    const nextVal = !projectorMode;
    setProjectorMode(nextVal);
    playSoftClick(soundEnabled);
    showToast(
      nextVal 
        ? 'Đã bật Chế độ Máy chiếu (Tăng kích thước chữ & độ tương phản cho lớp học).' 
        : 'Đã tắt Chế độ Máy chiếu, quay về giao diện chuẩn.',
      'info'
    );
  };

  // Lesson complete toggle
  const handleToggleLessonComplete = (lessonId: string) => {
    playSoftClick(soundEnabled);
    setLessons(prev => {
      return prev.map(l => {
        if (l.id === lessonId) {
          const nextState = !l.isCompleted;
          showToast(
            nextState 
              ? `Đã hoàn thành "${l.title}"!` 
              : `Đã đánh dấu chưa học "${l.title}".`,
            nextState ? 'success' : 'info'
          );
          if (nextState) playSuccessChime(soundEnabled);
          return { ...l, isCompleted: nextState };
        }
        return l;
      });
    });
  };

  // Assignment submission
  const handleSubmitAssignment = (
    assignmentId: string,
    answers: Record<string, number>,
    essayText: string,
    calculatedScore: number
  ) => {
    playSuccessChime(soundEnabled);
    const nowStr = new Date().toLocaleDateString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    setAssignments(prev => {
      return prev.map(a => {
        if (a.id === assignmentId) {
          return {
            ...a,
            status: 'completed',
            score: calculatedScore,
            submittedAt: nowStr,
            feedback: `Thầy Trần Văn Bích: Đã chấm điểm ${calculatedScore}/10. Em đã nộp bài thành công!`,
            studentSubmission: {
              selectedAnswers: answers,
              essayText
            }
          };
        }
        return a;
      });
    });

    showToast(`Đã nộp bài thành công! Em đạt ${calculatedScore}/10 điểm.`, 'success');
  };

  // Announcement read toggle
  const handleToggleAnnouncementRead = (announcementId: string) => {
    playSoftClick(soundEnabled);
    setAnnouncements(prev => {
      return prev.map(a => {
        if (a.id === announcementId) {
          return { ...a, isRead: !a.isRead };
        }
        return a;
      });
    });
  };

  // Mark all announcements read
  const handleMarkAllAnnouncementsRead = () => {
    playSoftClick(soundEnabled);
    setAnnouncements(prev => prev.map(a => ({ ...a, isRead: true })));
    showToast('Đã đánh dấu tất cả thông báo là đã đọc.', 'info');
  };

  // Download simulation prompt
  const handleDownloadMaterial = (material: Material) => {
    playSoftClick(soundEnabled);
    showToast(`Đang mở tài liệu "${material.title}" (${material.sizeOrDuration}).`, 'info');
  };

  // Reset data to defaults
  const handleResetDataToDefault = () => {
    setStudent(INITIAL_STUDENT);
    setLessons(INITIAL_LESSONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setGrades(INITIAL_GRADES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    showToast('Đã khôi phục dữ liệu mẫu ban đầu của Thầy Trần Văn Bích thành công!', 'success');
  };

  // Quick jump actions
  const handleOpenLessonFromOverview = (lesson: Lesson) => {
    handleSelectTab('lessons');
  };

  const handleOpenAssignmentFromOverview = (assignment: Assignment) => {
    handleSelectTab('assignments');
  };

  const handleOpenAnnouncementFromOverview = (announcement: Announcement) => {
    setActiveAnnouncementModal(announcement);
    handleSelectTab('announcements');
  };

  // Calculated stats for navigation badges
  const lessonsStats = {
    completed: lessons.filter(l => l.isCompleted).length,
    total: lessons.length
  };
  const pendingAssignmentsCount = assignments.filter(a => a.status !== 'completed').length;
  const unreadAnnouncementsCount = announcements.filter(a => !a.isRead).length;

  return (
    <div 
      id="app-root" 
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${
        projectorMode 
          ? 'bg-slate-950 text-slate-100 font-medium' 
          : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* 1. Left Sidebar Navigation Menu */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        lessonsStats={lessonsStats}
        pendingAssignmentsCount={pendingAssignmentsCount}
        unreadAnnouncementsCount={unreadAnnouncementsCount}
        projectorMode={projectorMode}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebarCollapse={handleToggleSidebarCollapse}
        student={student}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onToggleProjectorMode={handleToggleProjector}
        onOpenAdminModal={() => setIsTeacherAdminOpen(true)}
      />

      {/* 2. Main Right Column (Top Bar + Dynamic Viewport + Footer) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar for Main Area */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          student={student}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          projectorMode={projectorMode}
          onToggleProjectorMode={handleToggleProjector}
          onOpenAdminModal={() => setIsTeacherAdminOpen(true)}
          unreadAnnouncementsCount={unreadAnnouncementsCount}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebarCollapse={handleToggleSidebarCollapse}
        />

        {/* Dynamic Content Viewport */}
        <main 
          id="main-content-viewport" 
          className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-20 md:pb-12"
        >
          {/* Render Tab 1: Tổng quan */}
          {currentTab === 'overview' && (
            <OverviewView
              student={student}
              lessons={lessons}
              assignments={assignments}
              grades={grades}
              announcements={announcements}
              onNavigate={handleSelectTab}
              onOpenLesson={handleOpenLessonFromOverview}
              onOpenAssignment={handleOpenAssignmentFromOverview}
              onOpenAnnouncement={handleOpenAnnouncementFromOverview}
              projectorMode={projectorMode}
            />
          )}

          {/* Render Tab 2: Bài học & tài liệu */}
          {currentTab === 'lessons' && (
            <LessonsView
              lessons={lessons}
              onToggleComplete={handleToggleLessonComplete}
              projectorMode={projectorMode}
              onDownloadMaterial={handleDownloadMaterial}
            />
          )}

          {/* Render Tab 3: Bài tập */}
          {currentTab === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              onSubmitAssignment={handleSubmitAssignment}
              projectorMode={projectorMode}
            />
          )}

          {/* Render Tab 4: Điểm & tiến độ */}
          {currentTab === 'grades' && (
            <GradesProgressView
              grades={grades}
              lessons={lessons}
              assignments={assignments}
              onNavigate={handleSelectTab}
              projectorMode={projectorMode}
            />
          )}

          {/* Render Tab 5: Thông báo */}
          {currentTab === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              onToggleRead={handleToggleAnnouncementRead}
              onMarkAllAsRead={handleMarkAllAnnouncementsRead}
              projectorMode={projectorMode}
              activeAnnouncementModal={activeAnnouncementModal}
              onSelectAnnouncementModal={setActiveAnnouncementModal}
            />
          )}
        </main>

        {/* Footer */}
        <footer className={`border-t py-6 text-xs text-center transition-colors mt-auto ${
          projectorMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-700">
              Trợ lý học tập THPT Bùi Dục Tài • Giáo viên quản trị: Thầy Trần Văn Bích
            </p>
            <p className="text-[11px] text-slate-400">
              Hệ thống hỗ trợ quản lý học tập, theo dõi tiến độ và thông báo học vụ dành cho học sinh THPT.
            </p>
          </div>
        </footer>
      </div>

      {/* 5. Teacher Data Admin Modal */}
      <TeacherAdminModal
        isOpen={isTeacherAdminOpen}
        onClose={() => setIsTeacherAdminOpen(false)}
        student={student}
        onUpdateStudent={setStudent}
        onAddLesson={(newLesson) => {
          setLessons(prev => [...prev, newLesson]);
          showToast(`Đã thêm bài học "${newLesson.title}"!`, 'success');
        }}
        onAddAssignment={(newAsg) => {
          setAssignments(prev => [...prev, newAsg]);
          showToast(`Đã thêm bài tập "${newAsg.title}"!`, 'success');
        }}
        onAddAnnouncement={(newAnn) => {
          setAnnouncements(prev => [newAnn, ...prev]);
          showToast(`Đã đăng thông báo mới!`, 'success');
        }}
        onResetDataToDefault={handleResetDataToDefault}
        totalLessons={lessons.length}
      />

      {/* 6. Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
