import React from 'react';
import { Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MusyawarahCategory } from '../types';

interface CreateSessionModalProps {
  showCreateSession: boolean;
  setShowCreateSession: (show: boolean) => void;
  newSessionTitle: string;
  setNewSessionTitle: (title: string) => void;
  newSessionCategory: MusyawarahCategory;
  setNewSessionCategory: (cat: MusyawarahCategory) => void;
  newSessionLocation: string;
  setNewSessionLocation: (loc: string) => void;
  newSessionDate: string;
  setNewSessionDate: (date: string) => void;
  newSessionTime: string;
  setNewSessionTime: (time: string) => void;
  newSessionLeader: string;
  setNewSessionLeader: (leader: string) => void;
  newSessionSecretary: string;
  setNewSessionSecretary: (sec: string) => void;
  handleCreateSession: (e: React.FormEvent) => void;
}

export default function CreateSessionModal({
  showCreateSession,
  setShowCreateSession,
  newSessionTitle,
  setNewSessionTitle,
  newSessionCategory,
  setNewSessionCategory,
  newSessionLocation,
  setNewSessionLocation,
  newSessionDate,
  setNewSessionDate,
  newSessionTime,
  setNewSessionTime,
  newSessionLeader,
  setNewSessionLeader,
  newSessionSecretary,
  setNewSessionSecretary,
  handleCreateSession
}: CreateSessionModalProps) {
  return (
    <AnimatePresence>
      {showCreateSession && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="modal-create-session-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="bg-white border border-slate-200 p-7 rounded-2xl max-w-lg w-full shadow-[0_24px_64px_rgba(60,64,67,0.15),_0_4px_16px_rgba(60,64,67,0.05)] relative"
            id="modal-create-session-card"
          >
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-5 flex items-center gap-2 font-display">
              <Landmark size={20} className="text-[#0b57d0]" />
              <span>Daftarkan Musyawarah Desa Baru</span>
            </h3>

            <form onSubmit={handleCreateSession} className="space-y-4.5 text-xs text-slate-650" id="form-create-session">
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Agenda Utama / Nama Sidang</label>
                <input
                  type="text"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="Contoh: Pembahasan Anggaran Posyandu Terpadu RT 04"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                  required
                  id="input-new-session-title"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Kategori Bidang</label>
                  <select
                    value={newSessionCategory}
                    onChange={(e) => setNewSessionCategory(e.target.value as MusyawarahCategory)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-[#0b57d0] font-bold focus:outline-none focus:border-[#0b57d0] cursor-pointer"
                    id="select-new-category"
                  >
                    <option value="Pembangunan Infrastruktur">Infrastruktur & Fisik</option>
                    <option value="Pemberdayaan & Sosial">Pemberdayaan & Sosial</option>
                    <option value="Alokasi Dana Desa (ADD)">Anggaran & ADD</option>
                    <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                    <option value="Keadaan Darurat & Bencana">Darurat & Kebencanaan</option>
                    <option value="Regulasi & Hukum Desa">Regulasi / Hukum Desa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Tempat Pelaksanaan</label>
                  <input
                    type="text"
                    value={newSessionLocation}
                    onChange={(e) => setNewSessionLocation(e.target.value)}
                    placeholder="Aula Rapat Desa"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                    id="input-new-location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Tanggal Sidang</label>
                  <input
                    type="date"
                    value={newSessionDate}
                    onChange={(e) => setNewSessionDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans cursor-pointer"
                    id="input-new-date"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Jam Mulai (WIB)</label>
                  <input
                    type="text"
                    value={newSessionTime}
                    onChange={(e) => setNewSessionTime(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans"
                    id="input-new-time"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Pimpinan Sidang (Ketua)</label>
                  <input
                    type="text"
                    value={newSessionLeader}
                    onChange={(e) => setNewSessionLeader(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans"
                    id="input-new-leader"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Notulis / Sekretaris</label>
                  <input
                    type="text"
                    value={newSessionSecretary}
                    onChange={(e) => setNewSessionSecretary(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans"
                    id="input-new-secretary"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateSession(false)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-full text-xs font-bold font-display transition cursor-pointer focus:outline-none"
                  id="btn-new-session-cancel"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0b57d0] hover:bg-[#0049b8] text-white font-bold rounded-full text-xs font-display shadow-sm transition cursor-pointer focus:outline-none"
                  id="btn-new-session-submit"
                >
                  Sahkan Agenda
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
