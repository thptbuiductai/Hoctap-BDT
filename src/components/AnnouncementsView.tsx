import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  CheckCheck, 
  AlertCircle, 
  Calendar, 
  UserCheck, 
  Pin, 
  Search, 
  X, 
  BookOpen, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  onToggleRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  projectorMode: boolean;
  activeAnnouncementModal: Announcement | null;
  onSelectAnnouncementModal: (announcement: Announcement | null) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  onToggleRead,
  onMarkAllAsRead,
  projectorMode,
  activeAnnouncementModal,
  onSelectAnnouncementModal
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.content.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      if (filter === 'unread' && a.isRead) return false;
      if (filter === 'important' && !a.isImportant) return false;

      return true;
    });
  }, [announcements, searchQuery, filter]);

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div id="view-announcements" className={`space-y-6 ${projectorMode ? 'text-lg' : ''}`}>
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        projectorMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
              <Bell className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Kênh thông tin trực tiếp từ giáo viên
            </span>
          </div>
          <h2 className={`font-bold tracking-tight text-slate-900 ${projectorMode ? 'text-white text-2xl' : 'text-xl sm:text-2xl'}`}>
            Thông báo học tập • Thầy Trần Văn Bích
          </h2>
          <p className={`text-xs sm:text-sm text-slate-500 ${projectorMode ? 'text-slate-300' : ''}`}>
            Cập nhật lịch kiểm tra, nhắc nhở hạn nộp bài tập và các thông tin dặn dò quan trọng từ giáo viên bộ môn.
          </p>
        </div>

        {/* Mark All as Read button */}
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              id="btn-mark-all-read"
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Đánh dấu tất cả đã đọc ({unreadCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        projectorMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-announcements"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thông báo theo nội dung, lịch học, kiểm tra..."
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm transition focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${
                projectorMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({announcements.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'unread'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'important'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ghim quan trọng ({announcements.filter(a => a.isImportant).length})
            </button>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-base">Không có thông báo phù hợp</h4>
          <p className="text-xs text-slate-500">
            Hãy điều chỉnh bộ lọc để xem các thông báo khác từ Thầy Bích.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((ann) => {
            return (
              <div
                key={ann.id}
                id={`announcement-card-${ann.id}`}
                onClick={() => {
                  onSelectAnnouncementModal(ann);
                  if (!ann.isRead) onToggleRead(ann.id);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-sm ${
                  projectorMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : !ann.isRead
                    ? 'bg-blue-50/40 border-blue-200 hover:border-blue-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Pinned badge */}
                      {ann.isImportant && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
                          <Pin className="w-3 h-3" />
                          <span>Quan trọng</span>
                        </span>
                      )}

                      {/* Read / Unread badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        !ann.isRead
                          ? 'bg-rose-100 text-rose-800 font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {!ann.isRead ? 'Mới • Chưa đọc' : 'Đã đọc'}
                      </span>

                      {/* Category */}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {ann.category}
                      </span>

                      {/* Date */}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {ann.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold ${projectorMode ? 'text-xl' : 'text-base sm:text-lg'} text-slate-900 ${projectorMode ? 'text-white' : ''} leading-snug`}>
                      {ann.title}
                    </h3>

                    {/* Content preview */}
                    <p className={`text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed ${projectorMode ? 'text-slate-300' : ''}`}>
                      {ann.content}
                    </p>
                  </div>

                  {/* Actions & Author */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ann.author}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleRead(ann.id);
                      }}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition"
                      title={ann.isRead ? 'Đánh dấu là chưa đọc' : 'Đánh dấu là đã đọc'}
                    >
                      {ann.isRead ? 'Đánh dấu chưa đọc' : 'Đã đọc'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Announcement Detail Reader Modal */}
      {activeAnnouncementModal && (
        <div 
          id="announcement-modal-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => onSelectAnnouncementModal(null)}
        >
          <div 
            id="announcement-modal-card"
            className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 border transition-all ${
              projectorMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b pb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {activeAnnouncementModal.isImportant && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      <span>Thông báo quan trọng</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
                    {activeAnnouncementModal.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeAnnouncementModal.date}
                  </span>
                </div>

                <h3 className={`font-bold ${projectorMode ? 'text-2xl text-white' : 'text-xl text-slate-900'}`}>
                  {activeAnnouncementModal.title}
                </h3>
              </div>

              <button
                onClick={() => onSelectAnnouncementModal(null)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Announcement Full Content */}
            <div className={`p-4 rounded-xl border text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line ${
              projectorMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              {activeAnnouncementModal.content}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Giáo viên phụ trách: <strong>{activeAnnouncementModal.author}</strong></span>
              </div>

              <button
                onClick={() => onSelectAnnouncementModal(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Đã hiểu nội dung
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
