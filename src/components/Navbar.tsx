import React from 'react';
import { 
  Home, 
  Volume2, 
  VolumeX, 
  Tv, 
  Settings, 
  UserCircle2, 
  Sparkles,
  Menu,
  X,
  PanelLeftOpen,
  PanelLeftClose,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, StudentProfile } from '../types';
import { SchoolLogo } from './SchoolLogo';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  student: StudentProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  projectorMode: boolean;
  onToggleProjectorMode: () => void;
  onOpenAdminModal: () => void;
  unreadAnnouncementsCount: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  student,
  soundEnabled,
  onToggleSound,
  projectorMode,
  onToggleProjectorMode,
  onOpenAdminModal,
  unreadAnnouncementsCount,
  mobileMenuOpen,
  onToggleMobileMenu,
  sidebarCollapsed = false,
  onToggleSidebarCollapse
}) => {
  const getTabTitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'overview':
        return { name: 'Tổng quan học tập', group: 'Trang chủ' };
      case 'lessons':
        return { name: 'Bài học & tài liệu', group: 'Học tập' };
      case 'assignments':
        return { name: 'Bài tập rèn luyện', group: 'Luyện tập' };
      case 'grades':
        return { name: 'Điểm & tiến độ', group: 'Đánh giá' };
      case 'announcements':
        return { name: 'Thông báo học vụ', group: 'Tin tức' };
      default:
        return { name: 'Tổng quan', group: 'Trang chủ' };
    }
  };

  const currentTabInfo = getTabTitle(currentTab);

  return (
    <header 
      id="main-top-header" 
      className={`sticky top-0 z-20 transition-all border-b ${
        projectorMode 
          ? 'py-3 shadow-md bg-slate-900/95 backdrop-blur-xs border-slate-800 text-white' 
          : 'py-2.5 shadow-xs bg-white/95 backdrop-blur-xs border-slate-200 text-slate-800'
      }`}
    >
      <div className="w-full px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Section: Mobile Menu Button / Desktop Sidebar Toggle + Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Hamburger Toggle (Opens Left Menu Drawer) */}
          <button
            id="btn-mobile-menu"
            onClick={onToggleMobileMenu}
            className={`md:hidden p-2 rounded-xl border transition shrink-0 ${
              projectorMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Mở menu bên trái"
            title="Mở menu bên trái"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Sidebar Collapse / Expand Toggle Button */}
          {onToggleSidebarCollapse && (
            <button
              id="btn-navbar-sidebar-toggle"
              onClick={onToggleSidebarCollapse}
              className={`hidden md:flex items-center justify-center p-2 rounded-xl border transition shrink-0 ${
                projectorMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
              }`}
              title={sidebarCollapsed ? 'Mở rộng menu bên trái' : 'Thu gọn menu bên trái'}
              aria-label={sidebarCollapsed ? 'Mở rộng menu bên trái' : 'Thu gọn menu bên trái'}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-blue-600" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Mobile School Title (visible on mobile only) */}
          <div className="md:hidden flex items-center gap-2 min-w-0">
            <SchoolLogo className="w-7 h-7 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-bold truncate block leading-tight">THPT Bùi Dục Tài</span>
              <span className="text-[10px] text-slate-400 truncate block">Trợ lý học tập</span>
            </div>
          </div>

          {/* Desktop Breadcrumbs & Page Location */}
          <div className="hidden md:flex items-center gap-2 text-xs min-w-0">
            <span className={`font-medium ${projectorMode ? 'text-slate-400' : 'text-slate-400'}`}>
              {currentTabInfo.group}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <h1 className={`font-bold truncate text-sm sm:text-base ${
              projectorMode ? 'text-white' : 'text-slate-900'
            }`}>
              {currentTabInfo.name}
            </h1>
          </div>
        </div>

        {/* Right Section: Utility Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Home Button if not in overview */}
          {currentTab !== 'overview' && (
            <button
              id="btn-quick-home"
              onClick={() => onSelectTab('overview')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition border ${
                projectorMode
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title="Quay về trang Tổng quan"
            >
              <Home className="w-3.5 h-3.5 text-blue-600" />
              <span>Tổng quan</span>
            </button>
          )}

          {/* Projector Mode Toggle */}
          <button
            id="btn-toggle-projector"
            onClick={onToggleProjectorMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition border ${
              projectorMode
                ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Chế độ máy chiếu trong lớp học (Tăng kích thước chữ & độ tương phản)"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {projectorMode ? 'Tắt chiếu' : 'Chế độ máy chiếu'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className={`p-2 rounded-lg text-xs font-medium transition border ${
              soundEnabled
                ? projectorMode
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
                : projectorMode
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
            }`}
            title={soundEnabled ? 'Đang bật âm thanh (Bấm để tắt)' : 'Âm thanh đang tắt (Bấm để bật âm phản hồi)'}
            aria-label="Bật tắt âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Teacher Data Admin Modal Button */}
          <button
            id="btn-teacher-admin"
            onClick={onOpenAdminModal}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition border ${
              projectorMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
            }`}
            title="Tùy chỉnh & Quản trị dữ liệu học tập (Thầy Trần Văn Bích)"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Quản trị dữ liệu</span>
          </button>

          {/* Student Profile Pill */}
          <div 
            id="student-profile-pill"
            className={`hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-full border ${
              projectorMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {student.name.charAt(0)}
            </div>
            <div className="text-xs leading-tight">
              <span className="font-semibold block">{student.name}</span>
              <span className="text-[10px] text-slate-500">Lớp {student.class}</span>
            </div>
          </div>

          {/* School Emblem Logo Top Right */}
          <div 
            id="header-school-logo-top-right"
            className={`hidden xl:flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl border transition shadow-2xs ${
              projectorMode 
                ? 'bg-slate-800/90 border-slate-700 text-white' 
                : 'bg-blue-50/80 hover:bg-blue-50 border-blue-200/80 text-blue-950'
            }`}
            title="Logo chính thức: Trường THPT Bùi Dục Tài - Hải Lăng, Quảng Trị"
          >
            <SchoolLogo className="w-7 h-7 shrink-0 drop-shadow-xs" />
            <div className="text-left leading-none">
              <span className={`block text-[8px] uppercase font-bold tracking-wider ${
                projectorMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                THPT
              </span>
              <span className={`block text-[11px] font-black tracking-tight ${
                projectorMode ? 'text-white' : 'text-slate-900'
              }`}>
                Bùi Dục Tài
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

