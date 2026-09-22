import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  BarChart3, 
  Bell, 
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Tv,
  Volume2,
  VolumeX,
  User,
  X,
  Sparkles
} from 'lucide-react';
import { NavigationTab, StudentProfile } from '../types';
import { SchoolLogo } from './SchoolLogo';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  lessonsStats: { completed: number; total: number };
  pendingAssignmentsCount: number;
  unreadAnnouncementsCount: number;
  projectorMode: boolean;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
  student?: StudentProfile;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onToggleProjectorMode?: () => void;
  onOpenAdminModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  lessonsStats,
  pendingAssignmentsCount,
  unreadAnnouncementsCount,
  projectorMode,
  mobileMenuOpen,
  onCloseMobileMenu,
  sidebarCollapsed = false,
  onToggleSidebarCollapse,
  student,
  soundEnabled = false,
  onToggleSound,
  onToggleProjectorMode,
  onOpenAdminModal
}) => {
  const navItems: {
    id: NavigationTab;
    label: string;
    description: string;
    icon: React.ElementType;
    badge?: string | number | null;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Tổng quan',
      description: 'Bảng tin & chỉ số',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'lessons',
      label: 'Bài học & tài liệu',
      description: 'Bài giảng & giáo trình',
      icon: BookOpen,
      badge: `${lessonsStats.completed}/${lessonsStats.total}`,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'assignments',
      label: 'Bài tập',
      description: 'Luyện tập & thực hành',
      icon: CheckSquare,
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount} cần làm` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'grades',
      label: 'Điểm & tiến độ',
      description: 'Kết quả & xếp loại',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'announcements',
      label: 'Thông báo',
      description: 'Tin từ Thầy Bích',
      icon: Bell,
      badge: unreadAnnouncementsCount > 0 ? unreadAnnouncementsCount : null,
      badgeColor: 'bg-rose-500 text-white'
    }
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP & TABLET LEFT SIDEBAR (STICKY ON THE LEFT) */}
      {/* ========================================================================= */}
      <aside
        id="desktop-left-sidebar"
        className={`hidden md:flex flex-col shrink-0 sticky top-0 h-screen z-30 transition-all duration-300 border-r ${
          sidebarCollapsed ? 'w-20' : 'w-64 lg:w-72'
        } ${
          projectorMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
        aria-label="Menu điều hướng bên trái"
      >
        {/* Sidebar Header: School Logo, School Name & Collapse Toggle */}
        <div className={`p-4 border-b flex items-center justify-between gap-3 ${
          projectorMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50/50'
        }`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <button 
                onClick={() => onSelectTab('overview')}
                className="flex items-center gap-3 text-left group focus:outline-hidden"
                title="Về trang Tổng quan"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center transition group-hover:scale-105">
                  <SchoolLogo className="w-10 h-10 drop-shadow-xs" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                      projectorMode
                        ? 'bg-blue-900 text-blue-200 border border-blue-700'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      THPT BÙI DỤC TÀI
                    </span>
                  </div>
                  <h2 className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                    GV: Thầy Trần Văn Bích
                  </h2>
                </div>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onSelectTab('overview')}
              className="mx-auto block group focus:outline-hidden"
              title="THPT Bùi Dục Tài - Về Tổng quan"
            >
              <SchoolLogo className="w-10 h-10 drop-shadow-xs transition group-hover:scale-105" />
            </button>
          )}

          {/* Desktop Collapse/Expand Sidebar Toggle Button */}
          {onToggleSidebarCollapse && (
            <button
              id="btn-sidebar-collapse-toggle"
              onClick={onToggleSidebarCollapse}
              className={`p-1.5 rounded-lg border transition ${
                sidebarCollapsed ? 'mx-auto mt-2' : ''
              } ${
                projectorMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title={sidebarCollapsed ? 'Mở rộng menu bên trái' : 'Thu gọn menu bên trái'}
              aria-label={sidebarCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Sidebar Nav Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {!sidebarCollapsed && (
            <div className={`px-3 pb-2 text-[11px] font-bold uppercase tracking-wider ${
              projectorMode ? 'text-slate-400' : 'text-slate-400'
            }`}>
              Menu học tập
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                title={`${item.label} - ${item.description}`}
                className={`w-full flex items-center rounded-xl transition-all text-left relative group ${
                  sidebarCollapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-3'
                } ${
                  isActive
                    ? projectorMode
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-blue-50 text-blue-800 font-semibold border border-blue-200 shadow-2xs'
                    : projectorMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`shrink-0 ${sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5'} ${
                      isActive
                        ? projectorMode
                          ? 'text-white'
                          : 'text-blue-600'
                        : projectorMode
                        ? 'text-slate-400 group-hover:text-white'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <div className="min-w-0">
                      <div className={`text-sm tracking-tight truncate ${isActive ? 'font-bold' : 'font-medium'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[11px] truncate ${
                        isActive 
                          ? projectorMode ? 'text-blue-100' : 'text-blue-600/80' 
                          : 'text-slate-400'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges */}
                {!sidebarCollapsed && item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold shrink-0 transition ${
                      isActive && !projectorMode
                        ? 'bg-blue-200/70 text-blue-900'
                        : item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed dot badge */}
                {sidebarCollapsed && item.badge !== null && item.badge !== undefined && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                )}

                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Student Profile Card & Quick Actions */}
        <div className={`p-3 border-t space-y-2 shrink-0 ${
          projectorMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/80'
        }`}>
          {/* Student Profile Card */}
          {student && !sidebarCollapsed && (
            <div className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${
              projectorMode 
                ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                : 'bg-white border-slate-200/80 text-slate-800 shadow-2xs'
            }`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                {student.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate leading-tight">{student.name}</div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <span>Lớp {student.class}</span>
                  <span>•</span>
                  <span>{student.schoolYear}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Toolbar inside Sidebar */}
          <div className={`flex items-center ${sidebarCollapsed ? 'flex-col gap-1.5' : 'justify-between gap-1.5'}`}>
            {/* Teacher Admin Modal Button */}
            {onOpenAdminModal && (
              <button
                id="sidebar-btn-admin"
                onClick={onOpenAdminModal}
                className={`flex items-center gap-1.5 py-1.5 px-2 text-xs font-medium rounded-lg border transition ${
                  sidebarCollapsed ? 'w-full justify-center p-2' : 'flex-1 justify-center'
                } ${
                  projectorMode
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Quản trị dữ liệu (Thầy Trần Văn Bích)"
              >
                <Settings className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {!sidebarCollapsed && <span>Dữ liệu</span>}
              </button>
            )}

            {/* Projector Toggle */}
            {onToggleProjectorMode && (
              <button
                id="sidebar-btn-projector"
                onClick={onToggleProjectorMode}
                className={`p-2 text-xs font-medium rounded-lg border transition ${
                  projectorMode
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={projectorMode ? 'Tắt chế độ máy chiếu' : 'Bật chế độ máy chiếu'}
                aria-label="Chế độ máy chiếu"
              >
                <Tv className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Sound Toggle */}
            {onToggleSound && (
              <button
                id="sidebar-btn-sound"
                onClick={onToggleSound}
                className={`p-2 text-xs font-medium rounded-lg border transition ${
                  soundEnabled
                    ? projectorMode
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                    : projectorMode
                    ? 'bg-slate-800 border-slate-700 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                }`}
                title={soundEnabled ? 'Đang bật âm thanh' : 'Âm thanh đang tắt'}
                aria-label="Bật tắt âm thanh"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE DRAWER NAVIGATION (SLIDES IN FROM LEFT) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex"
          onClick={onCloseMobileMenu}
        >
          <div 
            className={`w-4/5 max-w-xs h-full shadow-2xl p-5 flex flex-col justify-between transition-all ${
              projectorMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <SchoolLogo className="w-9 h-9" />
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">THPT BÙI DỤC TÀI</span>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">Trợ lý học tập</h3>
                    <p className="text-[11px] text-slate-400">GV: Thầy Trần Văn Bích</p>
                  </div>
                </div>
                <button
                  onClick={onCloseMobileMenu}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                  aria-label="Đóng menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Student info on Mobile Drawer */}
              {student && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-blue-950 truncate">{student.name}</div>
                    <div className="text-[11px] text-blue-700">Lớp {student.class} • Năm học {student.schoolYear}</div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation List */}
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Danh mục học tập
              </div>
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobileMenu();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition ${
                        isActive 
                          ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge !== null && item.badge !== undefined && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            isActive ? 'bg-white text-blue-700' : (item.badgeColor || 'bg-slate-100 text-slate-700')
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions on Mobile Drawer */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {onOpenAdminModal && (
                <button
                  onClick={() => {
                    onOpenAdminModal();
                    onCloseMobileMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Quản trị dữ liệu (Thầy Bích)</span>
                </button>
              )}
              <div className="text-center text-[11px] text-slate-400">
                THPT Bùi Dục Tài • Thầy Trần Văn Bích
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MOBILE FIXED BOTTOM NAVIGATION (FOR QUICK ONE-THUMB USAGE) */}
      {/* ========================================================================= */}
      <div 
        id="mobile-bottom-navigation" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-2 py-1 shadow-lg flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition relative ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.id === 'announcements' && unreadAnnouncementsCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
                {item.id === 'assignments' && pendingAssignmentsCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {item.label.split('&')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

