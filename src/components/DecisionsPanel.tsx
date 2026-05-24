import React from 'react';
import { CheckCircle, Award, Trash2, Wallet, Plus } from 'lucide-react';
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
  
  selectedSessionId: string;
  paguDict: Record<string, number>;
  budgetItems: { id: string; sessionId: string; name: string; cost: number }[];
  handleUpdatePagu: (amount: number) => void;
  handleAddBudgetItem: (name: string, cost: number) => void;
  handleDeleteBudgetItem: (id: string) => void;
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
  handleDeleteDecision,
  
  selectedSessionId,
  paguDict,
  budgetItems,
  handleUpdatePagu,
  handleAddBudgetItem,
  handleDeleteBudgetItem
}: DecisionsPanelProps) {
  const [localItemName, setLocalItemName] = React.useState('');
  const [localItemCost, setLocalItemCost] = React.useState<number>(0);
  return (
    <div className="space-y-6" id="panel-decisions-workspace">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-zinc-850" id="decisions-banner">
        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-sans">Ketetapan Sidang Musyawarah</h3>
          <p className="text-[11px] text-slate-400 dark:text-zinc-450 mt-0.5 font-sans">Formulasi konsensus musyawarah mufakat atau rekapitulasi perolehan suara voting.</p>
        </div>

        <span className="text-[10px] text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 px-3 py-1.5 rounded font-semibold uppercase tracking-wide shrink-0">
          SAH: {activeDecisions.length} KEPUTUSAN
        </span>
      </div>

      {/* Grid Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:divide-x lg:divide-slate-200 dark:lg:divide-zinc-800">
        
        {/* Left Side: Decision Formulation (Span 5) */}
        <form onSubmit={handleAddDecision} className="lg:col-span-5 space-y-4.5" id="form-add-decision">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 pb-1">
            Formulasi Ketetapan Baru
          </h4>

          <div>
            <label className="block text-[10px] text-slate-500 dark:text-zinc-450 uppercase tracking-wider mb-1.5 font-bold">Judul Keputusan (SK)</label>
            <input
              type="text"
              value={newDecisionTitle}
              onChange={(e) => setNewDecisionTitle(e.target.value)}
              placeholder="Contoh: Pengesahan Anggaran Gapura Dusun 2"
              className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-slate-850 dark:text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder-slate-450 font-sans"
              required
              id="input-decision-title"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 dark:text-zinc-450 uppercase tracking-wider mb-1.5 font-bold">Butir Ketentuan / Amanat</label>
            <textarea
              value={newDecisionDescription}
              onChange={(e) => setNewDecisionDescription(e.target.value)}
              rows={3}
              placeholder="Contoh: Menyetujui porsi swadaya 15% dari total anggaran dengan pengerjaan awal Maret..."
              className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg p-2.5 text-xs text-slate-850 dark:text-zinc-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder-slate-450 font-sans leading-relaxed"
              required
              id="textarea-decision-desc"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 dark:text-zinc-450 uppercase tracking-wider mb-1.5 font-bold">Sistem Pengambilan Keputusan</label>
            <select
              value={newDecisionMethod}
              onChange={(e) => setNewDecisionMethod(e.target.value as any)}
              className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-2 text-xs text-indigo-650 dark:text-indigo-400 font-semibold focus:border-indigo-500 focus:outline-none font-sans cursor-pointer"
              id="select-decision-method"
            >
              <option value="Mufakat">Mufakat Bulat (Aklamasi)</option>
              <option value="Voting">Voting (Pemungutan Suara)</option>
            </select>
          </div>

          {newDecisionMethod === 'Voting' && (
            <div className="bg-slate-50 dark:bg-zinc-800/30 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-3.5" id="voting-count-subblock">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                <span className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide font-sans">Rekapitulasi Suara</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] text-slate-500 dark:text-zinc-400 font-sans mb-1 text-center font-bold">SETUJU (YA)</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesAgree}
                    onChange={(e) => setNewDecisionVotesAgree(parseInt(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-center text-green-700 dark:text-green-400 font-bold font-sans focus:border-green-500"
                    id="input-votes-agree"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 dark:text-zinc-400 font-sans mb-1 text-center font-bold">TOLAK (TDK)</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesDisagree}
                    onChange={(e) => setNewDecisionVotesDisagree(parseInt(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-center text-red-700 dark:text-red-400 font-bold font-sans focus:border-red-500"
                    id="input-votes-disagree"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 dark:text-zinc-400 font-sans mb-1 text-center font-bold">ABSTAIN</label>
                  <input
                    type="number"
                    min={0}
                    value={newDecisionVotesAbstain}
                    onChange={(e) => setNewDecisionVotesAbstain(parseInt(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-center text-slate-650 dark:text-zinc-300 font-bold font-sans focus:border-slate-500"
                    id="input-votes-abstain"
                  />
                </div>
              </div>
              
              <p className="text-[9px] text-slate-500 dark:text-zinc-450 leading-relaxed font-sans">
                *Saran: Jumlah seluruh suara disarankan selaras dengan jumlah daftar hadir terdaftar ({activeAttendance.length} warga).
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-650 hover:bg-indigo-750 text-white rounded-lg py-2.5 text-xs font-semibold shadow-sm transition duration-150 focus:outline-none cursor-pointer"
            id="btn-decision-submit"
          >
            <CheckCircle size={14} className="stroke-[2.5] inline-block mr-1.5" />
            <span>Sahkan & Sebarluaskan Ketetapan</span>
          </button>
        </form>

        {/* Right Side: Decision Gallery (Span 7) */}
        <div className="lg:col-span-7 lg:pl-8 space-y-4 flex flex-col" id="decisions-gallery-block">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-200 pb-1">
            Lembar Ketetapan Resmi Desa (SAH)
          </h4>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 flex-1">
            {activeDecisions.map((dec, idx) => (
              <div key={dec.id} className="p-4 bg-slate-50 dark:bg-zinc-900/40 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition duration-150 flex flex-col justify-between">
                
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0" />
                      <h5 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 tracking-tight">
                        {idx + 1}. {dec.title}
                      </h5>
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-zinc-500 font-sans tracking-wide uppercase">REGISTER: {dec.id.toUpperCase()}</p>
                  </div>

                  <span className="text-[9.5px] font-sans font-semibold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-750 dark:text-indigo-400 border border-indigo-150/40 dark:border-indigo-900/30 shrink-0 uppercase tracking-wide">
                    {dec.method}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-sans mt-3.5 pl-3 border-l-2 border-indigo-600">
                  {dec.description}
                </p>


                {dec.method === 'Voting' && dec.votes && (() => {
                  const agree = dec.votes.agree || 0;
                  const disagree = dec.votes.disagree || 0;
                  const abstain = dec.votes.abstain || 0;
                  const total = agree + disagree + abstain;
                  
                  if (total === 0) return null;
                  
                  const pctA = (agree / total) * 100;
                  const pctD = (disagree / total) * 100;
                  const pctS = (abstain / total) * 100;
                  
                  return (
                    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-5">
                      {/* SVG Donut Chart */}
                      <div className="relative w-20 h-20 shrink-0">
                        <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                          {/* Track */}
                          <circle
                            cx="21"
                            cy="21"
                            r="15.915"
                            fill="transparent"
                            stroke="#e2e8f0"
                            className="dark:stroke-zinc-800"
                            strokeWidth="4.2"
                          />
                          
                          {/* Setuju Segment */}
                          {agree > 0 && (
                            <circle
                              cx="21"
                              cy="21"
                              r="15.915"
                              fill="transparent"
                              stroke="#34d399" // emerald
                              strokeWidth="4.2"
                              strokeDasharray={`${pctA} ${100 - pctA}`}
                              strokeDashoffset="25"
                            />
                          )}
                          
                          {/* Tolak Segment */}
                          {disagree > 0 && (
                            <circle
                              cx="21"
                              cy="21"
                              r="15.915"
                              fill="transparent"
                              stroke="#ef4444" // red
                              strokeWidth="4.2"
                              strokeDasharray={`${pctD} ${100 - pctD}`}
                              strokeDashoffset={25 - pctA}
                            />
                          )}
                          
                          {/* Abstain Segment */}
                          {abstain > 0 && (
                            <circle
                              cx="21"
                              cy="21"
                              r="15.915"
                              fill="transparent"
                              stroke="#94a3b8" // slate-400
                              strokeWidth="4.2"
                              strokeDasharray={`${pctS} ${100 - pctS}`}
                              strokeDashoffset={25 - pctA - pctD}
                            />
                          )}
                        </svg>
                        
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[13px] font-bold text-slate-800 dark:text-zinc-150 leading-none">{total}</span>
                          <span className="text-[7px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Suara</span>
                        </div>
                      </div>
                      
                      {/* Legends */}
                      <div className="flex-1 grid grid-cols-3 sm:grid-cols-1 gap-1.5 w-full text-[9.5px] font-sans">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded text-emerald-800 dark:text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                          <span>Setuju: {agree} ({pctA.toFixed(0)}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/20 border border-red-100/50 dark:border-red-900/30 rounded text-red-800 dark:text-red-400 font-semibold">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                          <span>Tolak: {disagree} ({pctD.toFixed(0)}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded text-slate-650 dark:text-zinc-350 font-semibold">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                          <span>Abstain: {abstain} ({pctS.toFixed(0)}%)</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-4 flex items-center justify-between text-[9px] text-slate-500 dark:text-zinc-500 font-sans pt-3 border-t border-slate-200 dark:border-zinc-800">
                  <span className="uppercase tracking-wide">Ketetapan Hukum: SAH / MENGIKAT SELURUH DELEGASI</span>
                  <button
                    onClick={() => handleDeleteDecision(dec.id)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-zinc-800 transition cursor-pointer"
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

      {/* Premium Budget Planning Section */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800" id="budget-planning-section">
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-255 dark:border-slate-800 pb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2 font-display">
                <Wallet size={18} className="text-[#0b57d0] dark:text-blue-450" />
                <span>Pagu Anggaran Dana Desa (ADD) & Kalkulator Realisasi</span>
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                Atur pagu anggaran rapat musyawarah ini dan kalkulasikan rencana belanja program secara real-time.
              </p>
            </div>
            
            <div className="w-full sm:w-auto flex items-center gap-3 shrink-0">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-sans uppercase tracking-wider font-bold">Pagu ADD:</label>
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-405">Rp</span>
                <input
                  type="number"
                  min={0}
                  value={paguDict[selectedSessionId] || ''}
                  onChange={(e) => handleUpdatePagu(parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full sm:w-44 bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs font-bold focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none font-sans"
                  id="input-session-pagu"
                />
              </div>
            </div>
          </div>

          {/* Sub-Layout: Add Item Form & Items Ledger Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Input Item (Span 4) */}
            <div className="lg:col-span-4 space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display">
                Tambah Usulan Program
              </h5>
              
              <div className="space-y-3" id="form-budget-item">
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-sans uppercase tracking-wider mb-1 font-bold">Nama Program / Belanja</label>
                  <input
                    type="text"
                    value={localItemName}
                    onChange={(e) => setLocalItemName(e.target.value)}
                    placeholder="Contoh: Perbaikan Saluran Irigasi RT 02"
                    className="w-full bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
                    id="input-budget-item-name"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-sans uppercase tracking-wider mb-1 font-bold">Estimasi Biaya (Rupiah)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">Rp</span>
                    <input
                      type="number"
                      min={0}
                      value={localItemCost || ''}
                      onChange={(e) => setLocalItemCost(parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none font-sans"
                      id="input-budget-item-cost"
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    handleAddBudgetItem(localItemName, localItemCost);
                    setLocalItemName('');
                    setLocalItemCost(0);
                  }}
                  className="w-full bg-[#0b57d0] hover:bg-[#0049b8] dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full py-2 text-xs font-bold font-display shadow-sm transition duration-150 focus:outline-none cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-add-budget-item"
                >
                  <Plus size={14} className="stroke-[2.5]" />
                  <span>Tambahkan Anggaran</span>
                </button>
              </div>
            </div>

            {/* Table & Ledger of Items (Span 8) */}
            <div className="lg:col-span-8 space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display">
                Rincian Alokasi Rencana Belanja Rapat
              </h5>
              
              <div className="border border-slate-250 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/30 overflow-hidden" id="budget-items-table-container">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Nama Program / Belanja</th>
                      <th className="py-2.5 px-3 text-right">Alokasi Biaya</th>
                      <th className="py-2.5 px-3 text-center w-12">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {budgetItems.filter(item => item.sessionId === selectedSessionId).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800 dark:text-slate-200">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }).format(item.cost)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteBudgetItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition cursor-pointer"
                            title="Hapus anggaran program"
                            id={`btn-del-budget-${item.id}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {budgetItems.filter(item => item.sessionId === selectedSessionId).length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-slate-400 font-sans text-xs">
                          Belum ada usulan anggaran belanja program untuk rapat ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Progress Summary and Bar */}
              {(() => {
                const currentBudgetItems = budgetItems.filter(item => item.sessionId === selectedSessionId);
                const currentPagu = paguDict[selectedSessionId] || 0;
                const totalSpent = currentBudgetItems.reduce((acc, item) => acc + item.cost, 0);
                const remainingBalance = currentPagu - totalSpent;
                const spentPercentage = currentPagu > 0 ? Math.min((totalSpent / currentPagu) * 100, 100) : 0;
                
                const formatRupiah = (num: number) => {
                  return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(num);
                };

                return (
                  <div className="space-y-3.5 bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg">
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-sans font-bold">Total Belanja</span>
                        <strong className="block text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{formatRupiah(totalSpent)}</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg">
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-sans font-bold">Sisa Anggaran</span>
                        <strong className={`block text-xs font-bold mt-0.5 ${remainingBalance < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                          {formatRupiah(remainingBalance)}
                        </strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-lg">
                        <span className="block text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-sans font-bold">Penyerapan Pagu</span>
                        <strong className={`block text-xs font-bold mt-0.5 ${totalSpent > currentPagu && currentPagu > 0 ? 'text-red-600 dark:text-red-400' : 'text-[#0b57d0] dark:text-blue-450'}`}>
                          {spentPercentage.toFixed(1)}%
                        </strong>
                      </div>
                    </div>

                    {/* Elegant dynamic progress bar */}
                    <div className="space-y-1.5">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            remainingBalance < 0 ? 'bg-red-500' : spentPercentage > 85 ? 'bg-amber-500' : 'bg-blue-600 dark:bg-blue-500'
                          }`}
                          style={{ width: `${spentPercentage}%` }}
                        />
                      </div>
                      
                      {remainingBalance < 0 && (
                        <div className="flex items-center gap-1.5 text-[10px] text-red-650 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-200 dark:border-red-900/50 animate-none">
                          <span className="text-xs">⚠️</span>
                          <span>Peringatan: Total alokasi rencana belanja telah MELAMPAUI pagu anggaran desa yang ditetapkan!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
