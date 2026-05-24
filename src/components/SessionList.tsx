import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Trash2, FolderOpen, HelpCircle, Search, X, Filter } from 'lucide-react';
import { MusyawarahSession, AttendanceRecord } from '../types';

interface SessionListProps {
  sessions: MusyawarahSession[];
  selectedSessionId: string;
  setSelectedSessionId: (id: string) => void;
  setActiveTab: (tab: 'agenda' | 'attendance' | 'minutes' | 'decisions') => void;
  attendance: AttendanceRecord[];
  handleDeleteSession: (id: string) => void;
  setShowCreateSession: (show: boolean) => void;
}

export default function SessionList({
  sessions,
  selectedSessionId,
  setSelectedSessionId,
  setActiveTab,
  attendance,
  handleDeleteSession,
  setShowCreateSession
}: SessionListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Pembangunan Infrastruktur',
    'Pemberdayaan & Sosial',
    'Alokasi Dana Desa (ADD)',
    'Keamanan & Ketertiban',
    'Keadaan Darurat & Bencana',
    'Regulasi & Hukum Desa'
  ];

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'Semua' || s.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [sessions, searchQuery, selectedCategory]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-850">
        <h2 className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-2">
          <FolderOpen size={15} className="text-indigo-600 dark:text-indigo-400" />
          <span>Agenda Sidang Desa</span>
        </h2>
        <span className="text-[10px] text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded font-medium border border-indigo-100/50 dark:border-indigo-900/30">
          {sessions.length} Sidang
        </span>
      </div>

      {/* Modern Search Box */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={13} className="text-slate-400 dark:text-zinc-500" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari sidang desa..."
          className="w-full pl-8.5 pr-8 py-2 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs text-slate-800 dark:text-zinc-100 focus:outline-none focus:bg-white focus:border-indigo-550 focus:ring-1 focus:ring-indigo-550 placeholder-slate-450 dark:placeholder-zinc-500 font-sans transition"
          id="sidebar-search-sessions"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 cursor-pointer"
            id="sidebar-clear-search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-col gap-2 select-none">
        <div className="flex items-center justify-between">
          <label className="text-[9.5px] font-semibold font-sans uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Filter size={10} className="text-slate-400" />
            <span>Saring Kategori</span>
          </label>
          {selectedCategory !== 'Semua' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('Semua')}
              className="text-[9.5px] font-semibold font-sans text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1 max-h-[105px] overflow-y-auto pr-0.5" id="sidebar-category-chips">
          {categories.map((cat) => {
            const isCatSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[9.5px] px-2.5 py-1 rounded border transition font-sans cursor-pointer whitespace-nowrap ${
                  isCatSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50 font-semibold'
                    : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-750'
                }`}
              >
                {cat === 'Semua' ? 'Semua Bidang' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean elegant list */}
      <div className="space-y-1 max-h-[45vh] overflow-y-auto pr-1" id="sessions-scroll-list">
        {filteredSessions.map((s) => {
          const isSelected = s.id === selectedSessionId;
          const isActive = s.status === 'active';
          const isFinished = s.status === 'finished';

          return (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSessionId(s.id);
                setActiveTab('agenda');
              }}
              className={`flex flex-col gap-1.5 p-3 rounded-lg transition duration-150 text-left cursor-pointer group border ${
                isSelected
                  ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40 text-indigo-950 dark:text-indigo-300'
                  : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/30 text-slate-700 dark:text-zinc-350'
              }`}
              id={`session-card-${s.id}`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className={`text-[9px] font-sans font-medium px-2 py-0.5 rounded ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30'
                    : isFinished
                    ? 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                    : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/30'
                }`}>
                  {isActive ? '● Aktif' : isFinished ? 'Selesai' : 'Konsep'}
                </span>
                
                <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-sans tracking-wide">
                  {s.date}
                </span>
              </div>

              <h3 className={`text-xs font-semibold leading-snug tracking-tight font-sans transition-colors ${isSelected ? 'text-indigo-900 dark:text-indigo-400' : 'text-slate-800 dark:text-zinc-200 group-hover:text-indigo-650 dark:group-hover:text-indigo-400'}`}>
                {s.title}
              </h3>

              <div className="flex items-center justify-between text-[9.5px] text-slate-450 dark:text-zinc-500 font-sans mt-0.5">
                <div className="flex items-center gap-1">
                  <Users size={10} className="shrink-0" />
                  <span>
                    {attendance.filter(at => at.sessionId === s.id).length} Presensi
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="truncate max-w-[100px]" title={s.location}>{s.location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(s.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition cursor-pointer"
                    title="Hapus rapat"
                    id={`btn-del-session-${s.id}`}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sessions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-zinc-800/30 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl animate-none" id="empty-lobby-graphic">
            <FolderOpen size={20} className="mx-auto text-slate-350 dark:text-zinc-600 mb-2" />
            <p className="text-xs text-slate-400 dark:text-zinc-500">Belum ada rapat sidang.</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-zinc-800/30 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl animate-none" id="empty-search-graphic">
            <FolderOpen size={20} className="mx-auto text-slate-350 dark:text-zinc-600 mb-2" />
            <p className="text-xs text-slate-400 dark:text-zinc-500">Sidang tidak ditemukan.</p>
          </div>
        ) : null}
      </div>

      {/* Modern Info Guidelines */}
      <div className="bg-slate-50 dark:bg-zinc-800/20 border border-slate-100 dark:border-zinc-850 rounded-xl p-4 text-[10.5px] space-y-2 mt-1">
        <h4 className="font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 text-[10.5px]">
          <HelpCircle size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>Panduan Singkat Sidang</span>
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-slate-500 dark:text-zinc-400 leading-relaxed pl-0.5">
          <li>Pilih sidang dari sidebar atau buat rapat baru.</li>
          <li>Atur dan verifikasi topik bahasan di **Agenda**.</li>
          <li>Pandu delegasi presensi digital di **Daftar Hadir**.</li>
          <li>Catat rangkuman rembuk & tindak lanjut di **Catatan**.</li>
          <li>Sahkan butir kesepakatan bersama di **Keputusan**.</li>
          <li>Unduh Berita Acara & presensi resmi di kop surat.</li>
        </ol>
      </div>

    </div>
  );
}
