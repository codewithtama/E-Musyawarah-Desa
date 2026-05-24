import React from 'react';
import { CheckSquare, Trash2, Plus } from 'lucide-react';
import { AgendaItem } from '../types';

interface AgendaPanelProps {
  activeAgendas: AgendaItem[];
  newAgendaTopic: string;
  setNewAgendaTopic: (topic: string) => void;
  newAgendaSpeaker: string;
  setNewAgendaSpeaker: (speaker: string) => void;
  newAgendaDuration: string;
  setNewAgendaDuration: (duration: string) => void;
  handleAddAgenda: (e: React.FormEvent) => void;
  handleUpdateAgendaStatus: (id: string, status: 'pending' | 'ongoing' | 'completed') => void;
  handleDeleteAgenda: (id: string) => void;
}

export default function AgendaPanel({
  activeAgendas,
  newAgendaTopic,
  setNewAgendaTopic,
  newAgendaSpeaker,
  setNewAgendaSpeaker,
  newAgendaDuration,
  setNewAgendaDuration,
  handleAddAgenda,
  handleUpdateAgendaStatus,
  handleDeleteAgenda
}: AgendaPanelProps) {
  return (
    <div className="space-y-6" id="panel-agenda-workspace">
      
      {/* Description header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Jadwal Pokok Agenda</h3>
          <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Mengatur tata urutan sidang dan status pembahasan secara terintegrasi.</p>
        </div>
        <span className="text-[10px] font-sans font-bold text-[#0b57d0] bg-blue-50 px-3 py-1 rounded-full">
          {activeAgendas.length} TOPIK
        </span>
      </div>

      {/* Flat Clean Rows instead of nested Cards */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(60,64,67,0.02)]">
        {activeAgendas.map((ag) => {
          const isOngoing = ag.status === 'ongoing';
          const isCompleted = ag.status === 'completed';

          return (
            <div
              key={ag.id}
              className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-150 ${
                isOngoing ? 'bg-blue-50/20' : isCompleted ? 'opacity-55' : 'bg-transparent'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className={`text-[9px] font-sans px-2.5 py-0.5 rounded-full shrink-0 font-bold uppercase tracking-wide leading-none mt-0.5 ${
                  isOngoing
                    ? 'bg-blue-100 text-blue-800'
                    : isCompleted
                    ? 'bg-slate-200 text-slate-600'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isOngoing ? '● Berlangsung' : isCompleted ? 'Selesai' : 'Pending'}
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{ag.topic}</p>
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-sans mt-1">
                    <span>Narasumber: <strong className="text-slate-600 font-medium">{ag.speaker}</strong></span>
                    <span>•</span>
                    <span>Durasi: <strong className="text-[#0b57d0] font-bold">{ag.duration}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <select
                  value={ag.status}
                  onChange={(e) => handleUpdateAgendaStatus(ag.id, e.target.value as any)}
                  className="bg-white text-[11px] text-slate-700 border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans cursor-pointer"
                  id={`select-status-agenda-${ag.id}`}
                >
                  <option value="pending">Tertunda</option>
                  <option value="ongoing">Sedang Dibahas</option>
                  <option value="completed">Selesai Dibahas</option>
                </select>

                <button
                  onClick={() => handleDeleteAgenda(ag.id)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer"
                  title="Hapus pokok agenda"
                  id={`btn-del-agenda-${ag.id}`}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}

        {activeAgendas.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <CheckSquare size={28} className="mx-auto text-slate-300 mb-2" />
            <p className="text-xs">Belum ada pokok agenda yang ditambahkan.</p>
          </div>
        )}
      </div>

      {/* Flat Seamless Form style */}
      <form onSubmit={handleAddAgenda} className="border-t border-slate-100 pt-5 space-y-4" id="form-add-agenda">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
          Tambah Topik Agenda Baru
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <div className="md:col-span-5">
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Nama Topik Rapat</label>
            <input
              type="text"
              value={newAgendaTopic}
              onChange={(e) => setNewAgendaTopic(e.target.value)}
              placeholder="Contoh: Pembahasan Papan Slogan RT"
              className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
              id="input-agenda-topic"
              required
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Narasumber / PIC</label>
            <input
              type="text"
              value={newAgendaSpeaker}
              onChange={(e) => setNewAgendaSpeaker(e.target.value)}
              placeholder="Contoh: Pak RT 01"
              className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
              id="input-agenda-speaker"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Estimasi</label>
            <select
              value={newAgendaDuration}
              onChange={(e) => setNewAgendaDuration(e.target.value)}
              className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none font-sans cursor-pointer"
              id="select-agenda-dur"
            >
              <option value="15 Menit">15 Menit</option>
              <option value="30 Menit">30 Menit</option>
              <option value="45 Menit">45 Menit</option>
              <option value="60 Menit">60 Menit</option>
              <option value="90 Menit">90 Menit</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-[#0b57d0] hover:bg-[#0049b8] text-white text-xs py-2 rounded-full font-bold font-display shadow-sm transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
              id="btn-agenda-submit"
            >
              <Plus size={15} className="stroke-[2.5]" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
      </form>

    </div>
  );
}
