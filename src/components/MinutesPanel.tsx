import React from 'react';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';
import { MinutesRecord } from '../types';

interface MinutesPanelProps {
  selectedSessionId: string;
  activeMinutes: MinutesRecord;
  newActionTask: string;
  setNewActionTask: (task: string) => void;
  newActionPic: string;
  setNewActionPic: (pic: string) => void;
  newActionDeadline: string;
  setNewActionDeadline: (deadline: string) => void;
  newDiscussionPoint: string;
  setNewDiscussionPoint: (point: string) => void;
  handleSaveSummaryDescription: (sum: string) => void;
  handleAddDiscussionPoint: (e: React.FormEvent) => void;
  handleRemoveDiscussionPoint: (idx: number) => void;
  handleAddActionItem: (e: React.FormEvent) => void;
  handleDeleteActionItem: (id: string) => void;
  handleLoadTemplate: (type: 'pembangunan' | 'sosial' | 'anggaran') => void;
}

export default function MinutesPanel({
  activeMinutes,
  newActionTask,
  setNewActionTask,
  newActionPic,
  setNewActionPic,
  newActionDeadline,
  setNewActionDeadline,
  newDiscussionPoint,
  setNewDiscussionPoint,
  handleSaveSummaryDescription,
  handleAddDiscussionPoint,
  handleRemoveDiscussionPoint,
  handleAddActionItem,
  handleDeleteActionItem,
  handleLoadTemplate
}: MinutesPanelProps) {
  return (
    <div className="space-y-6" id="panel-minutes-workspace">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100" id="minutes-dashboard-banner">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Notulen Digital & Berita Acara Rapat</h3>
          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-sans">
            <CheckCircle size={14} className="text-[#0b57d0]" />
            <span>Sinkronisasi naskah berita acara berlangsung live & otomatis.</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[10px] text-slate-500 font-sans uppercase tracking-wider font-bold">Gunakan Templat:</span>
          <div className="inline-flex gap-1.5 bg-slate-50 p-1 border border-slate-200 rounded-full">
            <button
              onClick={() => handleLoadTemplate('pembangunan')}
              className="bg-white hover:bg-slate-100 border border-slate-250 hover:border-slate-350 text-slate-700 hover:text-[#0b57d0] text-[10px] px-3 py-1 rounded-full font-bold transition cursor-pointer focus:outline-none"
              id="btn-tem-pemb"
            >
              Infra
            </button>
            <button
              onClick={() => handleLoadTemplate('sosial')}
              className="bg-white hover:bg-slate-100 border border-slate-250 hover:border-slate-350 text-slate-700 hover:text-[#0b57d0] text-[10px] px-3 py-1 rounded-full font-bold transition cursor-pointer focus:outline-none"
              id="btn-tem-sos"
            >
              Sosial
            </button>
            <button
              onClick={() => handleLoadTemplate('anggaran')}
              className="bg-white hover:bg-slate-100 border border-slate-250 hover:border-slate-350 text-slate-700 hover:text-[#0b57d0] text-[10px] px-3 py-1 rounded-full font-bold transition cursor-pointer focus:outline-none"
              id="btn-tem-ang"
            >
              Audit
            </button>
          </div>
        </div>
      </div>

      {/* Grid Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:divide-x lg:divide-slate-200">
        
        {/* Left column (General summary & action draft form) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 font-display">
              Rangkuman Umum Sidang
            </h4>
            <textarea
              value={activeMinutes.summary}
              onChange={(e) => handleSaveSummaryDescription(e.target.value)}
              rows={4}
              placeholder="Tuliskan latar belakang, esensi utama, atau jalannya musyawarah secara menyeluruh di sini..."
              className="w-full bg-white text-xs text-slate-800 border border-slate-300 rounded-lg p-3 focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 leading-relaxed font-sans"
              id="textarea-minutes-summary"
            />
            <p className="text-[9.5px] text-slate-400 font-sans text-right italic">*Perubahan teks akan langsung tersimpan</p>
          </div>

          <form onSubmit={handleAddActionItem} className="border-t border-slate-100 pt-5 space-y-3.5" id="form-action-step">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
              Tambah Tindak Lanjut
            </h4>
            
            <div>
              <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Tugas / Rencana Kerja</label>
              <input
                type="text"
                value={newActionTask}
                onChange={(e) => setNewActionTask(e.target.value)}
                placeholder="Contoh: Mengurus pencairan dana tahap I"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                id="input-action-task"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Mandat (PIC)</label>
                <input
                  type="text"
                  value={newActionPic}
                  onChange={(e) => setNewActionPic(e.target.value)}
                  placeholder="Contoh: Bendahara Desa"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                  id="input-action-pic"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Tenggat Waktu</label>
                <input
                  type="date"
                  value={newActionDeadline}
                  onChange={(e) => setNewActionDeadline(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] font-sans cursor-pointer"
                  id="input-action-deadline"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b57d0] hover:bg-[#0049b8] text-white font-bold py-2.5 px-3 rounded-full text-xs transition duration-150 flex items-center justify-center gap-1.5 font-display shadow-sm cursor-pointer focus:outline-none"
              id="btn-action-submit"
            >
              <Plus size={15} className="stroke-[2.5]" />
              <span>Simpan Pekerjaan</span>
            </button>
          </form>
        </div>

        {/* Right column (discussion points & table list) */}
        <div className="lg:col-span-7 lg:pl-8 space-y-6 flex flex-col justify-start">
          
          {/* Discussion Points */}
          <div className="space-y-3">
            <form onSubmit={handleAddDiscussionPoint} className="flex flex-wrap items-center justify-between gap-3 mb-1" id="form-discussion">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
                Bahan Musyawarah & Pointer Sidang
              </h4>
              <div className="flex gap-2 max-w-sm w-full sm:w-2/3 shrink-0">
                <input
                  type="text"
                  value={newDiscussionPoint}
                  onChange={(e) => setNewDiscussionPoint(e.target.value)}
                  placeholder="Tambah butir pokok bahasan..."
                  className="bg-white flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                  id="input-discussion"
                />
                <button
                  type="submit"
                  className="bg-[#0b57d0] hover:bg-[#0049b8] text-white rounded-full px-4 py-1.5 font-bold text-xs transition font-display cursor-pointer focus:outline-none"
                  id="btn-discussion-add"
                >
                  Tambah
                </button>
              </div>
            </form>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-[22vh] overflow-y-auto">
              {activeMinutes.discussionPoints && activeMinutes.discussionPoints.length > 0 ? (
                activeMinutes.discussionPoints.map((point, index) => (
                  <div key={index} className="flex items-start justify-between gap-2.5 py-1.5 border-b border-slate-200 last:border-0 group">
                    <p className="text-xs text-slate-800 leading-relaxed pl-2.5 border-l-2 border-[#0b57d0] font-sans">
                      {point}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveDiscussionPoint(index)}
                      className="p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition shrink-0 cursor-pointer"
                      title="Hapus baris catatan"
                      id={`btn-del-point-${index}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center py-5 text-xs text-slate-450 italic font-sans">- Belum ada butir bahasan terekam -</p>
              )}
            </div>
          </div>

          {/* Action checklist table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-display">
              Daftar Rencana Kerja Tindak Lanjut
            </h4>
            
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-650 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] text-slate-500 font-sans uppercase bg-slate-50 font-bold tracking-wide">
                    <th className="py-3 px-4">Butir Pekerjaan</th>
                    <th className="py-3 px-4">Mandat (PIC)</th>
                    <th className="py-3 px-3 text-center">Tenggat</th>
                    <th className="py-3 px-3 text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {activeMinutes.actionItems && activeMinutes.actionItems.length > 0 ? (
                    activeMinutes.actionItems.map((act) => (
                      <tr key={act.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-slate-800 font-medium leading-relaxed max-w-xs">{act.task}</td>
                        <td className="py-3 px-4 text-[#0b57d0] font-sans font-bold uppercase tracking-wide">{act.pic}</td>
                        <td className="py-3 px-3 text-center text-slate-500 font-sans">{act.deadline}</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteActionItem(act.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer"
                            title="Hapus rencana kerja"
                            id={`btn-del-action-${act.id}`}
                          >
                            <Trash2 size={11} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-xs text-slate-450 italic font-sans">- Belum ada rencana kerja tindak lanjut terekam -</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
