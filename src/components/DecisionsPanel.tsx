import React from 'react';
import { CheckCircle, Award, Trash2 } from 'lucide-react';
import { DecisionRecord, AttendanceRecord } from '../types';

interface DecisionsPanelProps {
  activeAttendance: AttendanceRecord[];
  activeDecisions: DecisionRecord[];
  newDecisionTitle: string;
  setNewDecisionTitle: (title: string) => void;
  newDecisionDescription: string;
  setNewDecisionDescription: (desc: string) => void;
  newDecisionMethod: 'Mufakat' | 'Voting';
  setNewDecisionMethod: (method: 'Mufakat' | 'Voting') => void;
  newDecisionVotesAgree: number;
  setNewDecisionVotesAgree: (v: number) => void;
  newDecisionVotesDisagree: number;
  setNewDecisionVotesDisagree: (v: number) => void;
  newDecisionVotesAbstain: number;
  setNewDecisionVotesAbstain: (v: number) => void;
  handleAddDecision: (e: React.FormEvent) => void;
  handleDeleteDecision: (id: string) => void;
}

export default function DecisionsPanel({
  activeAttendance,
  activeDecisions,
  newDecisionTitle,
  setNewDecisionTitle,
  newDecisionDescription,
  setNewDecisionDescription,
  newDecisionMethod,
  setNewDecisionMethod,
  newDecisionVotesAgree,
  setNewDecisionVotesAgree,
  newDecisionVotesDisagree,
  setNewDecisionVotesDisagree,
  newDecisionVotesAbstain,
  setNewDecisionVotesAbstain,
  handleAddDecision,
  handleDeleteDecision
}: DecisionsPanelProps) {
  return (
    <div className="space-y-6" id="panel-decisions-workspace">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-100" id="decisions-banner">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Ketetapan Keputusan Musyawarah</h3>
          <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Formulasi konsensus musyawarah mufakat atau penghitungan perolehan suara voting.</p>
        </div>

        <span className="text-[10px] font-sans bg-blue-50 text-[#0b57d0] border border-blue-100 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wide shrink-0">
          SAH: {activeDecisions.length} KEPUTUSAN
        </span>
      </div>

      {/* Grid Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:divide-x lg:divide-slate-200">
        
        {/* Left Side: Decision Formulation (Span 5) */}
        <form onSubmit={handleAddDecision} className="lg:col-span-5 space-y-4" id="form-add-decision">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 font-display">
            Formulasi Ketetapan Baru
          </h4>

          <div>
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Judul Keputusan (SK)</label>
            <input
              type="text"
              value={newDecisionTitle}
              onChange={(e) => setNewDecisionTitle(e.target.value)}
              placeholder="Contoh: Pengesahan Anggaran Gapura Dusun 2"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-850 focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
              required
              id="input-decision-title"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Butir Ketentuan / Amanat</label>
            <textarea
              value={newDecisionDescription}
              onChange={(e) => setNewDecisionDescription(e.target.value)}
              rows={3}
              placeholder="Contoh: Menyetujui porsi swadaya 15% dari total anggaran dengan pengerjaan awal Maret..."
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-850 focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans leading-relaxed"
              required
              id="textarea-decision-desc"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Sistem Pengambilan Keputusan</label>
            <select
              value={newDecisionMethod}
              onChange={(e) => setNewDecisionMethod(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-[#0b57d0] font-bold focus:border-[#0b57d0] focus:outline-none font-sans cursor-pointer"
              id="select-decision-method"
            >
              <option value="Mufakat">Mufakat Bulat (Aklamasi)</option>
              <option value="Voting">Voting (Pemungutan Suara)</option>
            </select>
          </div>

          {newDecisionMethod === 'Voting' && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5" id="voting-count-subblock">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide font-display">Rekapitulasi Suara</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] text-slate-500 font-sans mb-1 text-center font-bold">SETUJU (YA)</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesAgree}
                    onChange={(e) => setNewDecisionVotesAgree(parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-center text-green-700 font-bold font-sans focus:border-green-500"
                    id="input-votes-agree"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 font-sans mb-1 text-center font-bold">TOLAK (TDK)</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesDisagree}
                    onChange={(e) => setNewDecisionVotesDisagree(parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-center text-red-700 font-bold font-sans focus:border-red-500"
                    id="input-votes-disagree"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 font-sans mb-1 text-center font-bold">ABSTAIN</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesAbstain}
                    onChange={(e) => setNewDecisionVotesAbstain(parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-center text-slate-650 font-bold font-sans focus:border-slate-500"
                    id="input-votes-abstain"
                  />
                </div>
              </div>
              
              <p className="text-[9px] text-slate-500 leading-relaxed font-sans">
                *Saran: Jumlah seluruh suara disarankan selaras dengan jumlah daftar hadir terdaftar ({activeAttendance.length} warga).
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0b57d0] hover:bg-[#0049b8] text-white rounded-full py-2.5 text-xs font-bold font-display shadow-sm transition duration-150 focus:outline-none cursor-pointer"
            id="btn-decision-submit"
          >
            <CheckCircle size={15} className="stroke-[2.5] inline-block mr-1.5" />
            <span>Sahkan & Sebarluaskan Ketetapan</span>
          </button>
        </form>

        {/* Right Side: Decision Gallery (Span 7) */}
        <div className="lg:col-span-7 lg:pl-8 space-y-4 flex flex-col" id="decisions-gallery-block">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 font-display">
            Lembar Ketetapan Resmi Desa (SAH)
          </h4>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 flex-1">
            {activeDecisions.map((dec, idx) => (
              <div key={dec.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition duration-150 flex flex-col justify-between">
                
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0b57d0] rounded-full shrink-0" />
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-tight font-display">
                        {idx + 1}. {dec.title}
                      </h5>
                    </div>
                    <p className="text-[9px] text-slate-400 font-sans tracking-wide uppercase">REGISTER: {dec.id.toUpperCase()}</p>
                  </div>

                  <span className="text-[9px] font-sans font-bold px-3 py-1 rounded-full shrink-0 uppercase tracking-wide bg-blue-100 text-blue-800 border border-blue-200">
                    {dec.method}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans mt-3.5 pl-3 border-l-2 border-[#0b57d0]">
                  {dec.description}
                </p>

                {dec.method === 'Voting' && dec.votes && (
                  <div className="mt-4 pt-3.5 border-t border-slate-200 grid grid-cols-3 gap-2.5 text-center text-[10px] font-sans">
                    <div className="p-1.5 px-3 rounded-full bg-green-50 border border-green-200 text-green-800 font-bold uppercase">
                      Setuju: {dec.votes.agree}
                    </div>
                    <div className="p-1.5 px-3 rounded-full bg-red-50 border border-red-200 text-red-800 font-bold uppercase">
                      Tolak: {dec.votes.disagree}
                    </div>
                    <div className="p-1.5 px-3 rounded-full bg-slate-100 border border-slate-250 text-slate-650 font-bold uppercase">
                      Abstain: {dec.votes.abstain}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-[9px] text-slate-500 font-sans pt-3 border-t border-slate-200">
                  <span className="uppercase tracking-wide">Ketetapan Hukum: SAH / MENGIKAT SELURUH DELEGASI</span>
                  <button
                    onClick={() => handleDeleteDecision(dec.id)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition cursor-pointer"
                    title="Batalkan ketetapan"
                    id={`btn-del-dec-${dec.id}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

              </div>
            ))}

            {activeDecisions.length === 0 && (
              <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center h-full" id="empty-decisions-art">
                <Award size={32} className="mb-2 text-slate-350" />
                <p className="text-xs">Belum ada keputusan tertulis yang disahkan.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
