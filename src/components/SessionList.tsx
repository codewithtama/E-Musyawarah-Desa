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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_1px_2px_0_rgba(60,64,67,0.03)] flex flex-col gap-4">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-display">
          <FolderOpen size={16} className="text-[#0b57d0]" />
          <span>Daftar Rapat Desa</span>
        </h2>
        <span className="text-[10px] text-[#0b57d0] bg-blue-50 px-2.5 py-0.5 border border-blue-100 rounded-full font-bold">
          {sessions.length} Rapat
        </span>
      </div>

      {/* Google Drive Style Search Box */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={13} className="text-slate-450" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama atau lokasi rapat..."
          className="w-full pl-8.5 pr-8 py-2 bg-slate-50 border border-slate-250 hover:border-slate-300 rounded-full text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans transition"
          id="sidebar-search-sessions"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-450 hover:text-slate-700 cursor-pointer"
            id="sidebar-clear-search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[9px] font-bold font-sans uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Filter size={10} className="text-slate-400" />
            <span>Kategori Bidang</span>
          </label>
          {selectedCategory !== 'Semua' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('Semua')}
              className="text-[9px] font-bold font-sans text-[#0b57d0] hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1 max-h-[105px] overflow-y-auto pr-0.5 select-none" id="sidebar-category-chips">
          {categories.map((cat) => {
            const isCatSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[9.5px] px-2.5 py-1 rounded-full border transition font-sans cursor-pointer whitespace-nowrap ${
                  isCatSelected
                    ? 'bg-blue-50 text-[#0b57d0] border-blue-200 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat === 'Semua' ? 'Semua Bidang' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Google-Drive style list */}
      <div className="space-y-1.5 max-h-[45vh] overflow-y-auto pr-1" id="sessions-scroll-list">
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
              className={`flex flex-col gap-2 p-3.5 rounded-xl transition duration-150 text-left cursor-pointer group border ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                  : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-700 hover:border-slate-200'
              }`}
              id={`session-card-${s.id}`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-green-100 text-green-800'
                    : isFinished
                    ? 'bg-slate-150 text-slate-600'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isActive ? '● Aktif' : isFinished ? 'Selesai' : 'Konsep'}
                </span>
                
                <span className="text-[9px] text-slate-400 font-sans tracking-wide">
                  {s.date}
                </span>
              </div>

              <h3 className={`text-xs font-bold leading-tight font-display transition-colors ${isSelected ? 'text-[#0b57d0]' : 'text-slate-800 group-hover:text-[#0b57d0]'}`}>
                {s.title}
              </h3>

              <div className="flex items-center justify-between text-[9.5px] text-slate-500 font-sans mt-1.5">
                <div className="flex items-center gap-1.5">
                  <Users size={11} className="text-slate-450 shrink-0" />
                  <span className="font-semibold text-slate-700">
                    {attendance.filter(at => at.sessionId === s.id).length} Absen
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[100px] text-slate-450" title={s.location}>{s.location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(s.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer"
                    title="Hapus musyawarah"
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
          <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl animate-none" id="empty-lobby-graphic">
            <FolderOpen size={24} className="mx-auto text-slate-350 mb-2 animate-none" />
            <p className="text-xs text-slate-400">Belum ada jadwal rapat.</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl animate-none" id="empty-search-graphic">
            <FolderOpen size={24} className="mx-auto text-slate-350 mb-2 animate-none" />
            <p className="text-xs text-slate-400">Tidak ada rapat yang cocok.</p>
          </div>
        ) : null}
      </div>

      {/* Info Guidelines */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] space-y-2 mt-2">
        <h4 className="font-bold text-slate-700 flex items-center gap-1.5 font-display uppercase tracking-wider text-[11px]">
          <HelpCircle size={14} className="text-[#0b57d0] shrink-0" />
          <span>Panduan Singkat:</span>
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed pl-0.5">
          <li>Pilih rapat dari daftar di atas atau buat rapat baru.</li>
          <li>Atur dan pantau topik pembahasan di menu **Agenda**.</li>
          <li>Minta warga mengisi daftar hadir dan tanda tangan di menu **Absensi**.</li>
          <li>Catat kesimpulan diskusi dan rencana tindak lanjut di menu **Notulen**.</li>
          <li>Kumpulkan pemungutan suara warga di menu **Keputusan**.</li>
          <li>Cetak dokumen hasil rapat mufakat di **Berita Acara**.</li>
        </ol>
      </div>

    </div>
  );
}
