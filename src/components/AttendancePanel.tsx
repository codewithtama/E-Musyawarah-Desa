import React from 'react';
import { Users, PenTool, Trash2 } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';
import { AttendanceRecord } from '../types';

interface AttendancePanelProps {
  activeAttendance: AttendanceRecord[];
  newAttendeeName: string;
  setNewAttendeeName: (name: string) => void;
  newAttendeeNik: string;
  setNewAttendeeNik: (nik: string) => void;
  newAttendeeRole: string;
  setNewAttendeeRole: (role: string) => void;
  newAttendeePhone: string;
  setNewAttendeePhone: (phone: string) => void;
  newAttendeeSignature: string;
  setNewAttendeeSignature: (sig: string) => void;
  handleAddAttendance: (e: React.FormEvent) => void;
  handleDeleteAttendance: (id: string) => void;
  sigKey: number;
}

export default function AttendancePanel({
  activeAttendance,
  newAttendeeName,
  setNewAttendeeName,
  newAttendeeNik,
  setNewAttendeeNik,
  newAttendeeRole,
  setNewAttendeeRole,
  newAttendeePhone,
  setNewAttendeePhone,
  newAttendeeSignature,
  setNewAttendeeSignature,
  handleAddAttendance,
  handleDeleteAttendance,
  sigKey
}: AttendancePanelProps) {
  return (
    <div className="space-y-6" id="panel-attendance-workspace">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Kredensial Kehadiran & E-Signature</h3>
          <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Delegasi mengabsen mandiri dengan membubuhkan tanda tangan elektronik.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-sans bg-green-50 text-green-800 border border-green-200 px-3 py-1 rounded-full font-bold uppercase tracking-wide">
            {activeAttendance.length} HADIR
          </span>
        </div>
      </div>

      {/* Seamless Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:divide-x lg:divide-slate-200">
        
        {/* Left Side: Form (Span 5) */}
        <div className="lg:col-span-5 space-y-4" id="attendance-block-form-container">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 font-display">
            Formulir Kehadiran Digital
          </h4>
          
          <form onSubmit={handleAddAttendance} className="space-y-4" id="form-attendance-pad">
            <div>
              <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={newAttendeeName}
                onChange={(e) => setNewAttendeeName(e.target.value)}
                placeholder="Contoh: Sudjatmiko, S.E."
                className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
                required
                id="input-attendee-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">16-Digit NIK</label>
                <input
                  type="text"
                  maxLength={16}
                  value={newAttendeeNik}
                  onChange={(e) => setNewAttendeeNik(e.target.value.replace(/\D/g, ''))}
                  placeholder="NIK Warga"
                  className="w-full bg-white text-slate-850 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
                  required
                  id="input-attendee-nik"
                />
                {newAttendeeNik.length > 0 && (
                  <div className="mt-1 font-sans text-[9.5px]" id="nik-validator-feedback">
                    {newAttendeeNik.length === 16 ? (
                      <span className="text-emerald-650 font-bold flex items-center gap-0.5 select-none">
                        <span className="text-emerald-600 font-extrabold text-[11px]">✓</span> Format NIK Valid (16 Digit)
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold flex items-center gap-0.5 select-none">
                        <span className="text-amber-500 text-[11px]">⚠</span> NIK belum lengkap ({newAttendeeNik.length}/16 digit)
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Jabatan / Utusan</label>
                <select
                  value={newAttendeeRole}
                  onChange={(e) => setNewAttendeeRole(e.target.value)}
                  className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none cursor-pointer font-sans"
                  id="select-attendee-role"
                >
                  <option value="Warga Dusun I">Warga Dusun I</option>
                  <option value="Warga Dusun II">Warga Dusun II</option>
                  <option value="Warga Dusun III">Warga Dusun III</option>
                  <option value="Lembaga Pemberdayaan Masyarakat (LPM)">Lembaga LPM</option>
                  <option value="Kader PKK / Posyandu">Ibu PKK / Posyandu</option>
                  <option value="Badan Permusyawaratan Desa (BPD)">Utusan BPD</option>
                  <option value="Kepala Dusun / Perangkat">Kepala Dusun / RT / RW</option>
                  <option value="Pamong Desa Utama">Pamong Desa Utama</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 font-bold">Nomor WA / HP (Opsional)</label>
              <input
                type="text"
                value={newAttendeePhone}
                onChange={(e) => setNewAttendeePhone(e.target.value)}
                placeholder="081********"
                className="w-full bg-white text-slate-800 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] focus:outline-none placeholder-slate-400 font-sans"
                id="input-attendee-phone"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1 flex items-center justify-between font-bold">
                <span>Bubuhkan Tanda Tangan Basah</span>
                <span className="text-[9px] text-amber-600 font-bold">*Wajib digores jelas</span>
              </label>
              
              <SignatureCanvas
                key={sigKey}
                onSave={(data) => setNewAttendeeSignature(data)}
                placeholder="Goreskan tanda tangan menggunakan mouse atau layar sentuh"
                onClear={() => setNewAttendeeSignature('')}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b57d0] hover:bg-[#0049b8] text-white rounded-full py-2.5 text-xs font-bold font-display shadow-sm transition duration-150 focus:outline-none mt-2 cursor-pointer"
              id="btn-attendance-submit"
            >
              <PenTool size={15} className="stroke-[2.5] inline-block mr-1.5" />
              <span>Kirim Absensi Sekarang</span>
            </button>
          </form>
        </div>

        {/* Right Side: verified attendees (Span 7) */}
        <div className="lg:col-span-7 lg:pl-8 space-y-4 flex flex-col" id="attendance-block-list-container">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 flex items-center justify-between font-display">
            <span>Daftar Hadir Terverifikasi</span>
            <span className="text-[10px] text-[#0b57d0] bg-blue-50 px-2 py-0.5 rounded-full font-bold">TAMPIL: {activeAttendance.length} ORANG</span>
          </h4>

          <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1 flex-1" id="attendees-scroll-list">
            {activeAttendance.map((at) => (
              <div key={at.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 group hover:bg-slate-50 hover:border-slate-300 transition duration-150">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                    {at.signature.startsWith('data:image') ? (
                      <img src={at.signature} alt="Sign" className="max-h-full max-w-full object-contain filter contrast-125" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-[8px] font-mono uppercase font-extrabold text-slate-700 text-center truncate leading-none">
                        {at.name[0]} E-Tt
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate" title={at.name}>
                      {at.name}
                    </h5>
                    <p className="text-[10px] text-[#0b57d0] font-sans font-bold mt-0.5">{at.role}</p>
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 font-sans mt-1">
                      <span>NIK: {at.nik.substring(0, 6)}******</span>
                      <span>•</span>
                      <span>{new Date(at.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteAttendance(at.id)}
                  className="p-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer"
                  title="Keluarkan absensi"
                  id={`btn-del-attendee-${at.id}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {activeAttendance.length === 0 && (
              <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center h-full" id="empty-attendee-art">
                <Users size={28} className="mb-2 text-slate-350" />
                <p className="text-xs">Belum ada warga yang mengabsensi.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
