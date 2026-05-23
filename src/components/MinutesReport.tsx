import React from 'react';
import { MusyawarahSession, AgendaItem, AttendanceRecord, MinutesRecord, DecisionRecord } from '../types';
import { Printer, Download, Landmark, Calendar, MapPin, Users, CheckCircle, FileText } from 'lucide-react';

interface MinutesReportProps {
  session: MusyawarahSession;
  agendas: AgendaItem[];
  attendees: AttendanceRecord[];
  minutes?: MinutesRecord;
  decisions: DecisionRecord[];
  onClose: () => void;
}

export default function MinutesReport({
  session,
  agendas,
  attendees,
  minutes,
  decisions,
  onClose
}: MinutesReportProps) {

  // Helper to handle browser native print
  const handlePrint = () => {
    window.print();
  };

  // Helper to generate a placeholder signature if it is a preloaded mockup status
  const renderSignatureImage = (sig: string, name: string) => {
    if (!sig) return <span className="text-xs text-slate-400 italic font-mono">- Belum tanda tangan -</span>;
    
    if (sig.startsWith('data:image')) {
      return <img src={sig} alt={`Ttd ${name}`} className="h-10 mx-auto object-contain max-w-[120px]" referrerPolicy="no-referrer" />;
    }
    
    // Fallback beautiful handwritten styling for mockup signatures
    return (
      <div className="h-10 flex items-center justify-center font-serif text-slate-700 italic border-b border-dotted border-slate-300 w-2/3 mx-auto relative select-none">
        <span className="text-xs opacity-30 absolute top-0 text-[9px] font-sans font-normal tracking-wider uppercase select-none">E-SIGNED</span>
        <span className="text-sm font-semibold tracking-wide rotate-[-3deg] text-indigo-900">{name.split(',')[0]}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 md:p-6 overflow-y-auto" id="minutes-report-overlay">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" id="minutes-report-container">
        
        {/* Controls Bar */}
        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-emerald-700" />
            <h3 className="font-semibold text-slate-800">Pratinjau Dokumen Berita Acara</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition duration-150"
              id="btn-report-print"
            >
              <Printer size={15} /> Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium transition duration-150"
              id="btn-report-close"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Printable Paper Document */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 print:p-0 bg-slate-50 print:bg-white" id="printable-area">
          <div className="bg-white p-8 md:p-12 border border-slate-200 rounded-lg shadow-xs max-w-3xl mx-auto print:border-0 print:shadow-none print:p-0">
            
            {/* KOP SURAT (Government Letterhead) */}
            <div className="text-center border-b-[3px] border-slate-900 pb-4 mb-6 relative">
              <div className="absolute left-0 top-1 text-slate-800 hidden md:block print:block">
                <Landmark size={50} className="stroke-[1.5]" />
              </div>
              <h4 className="text-sm font-bold tracking-tight uppercase leading-tight text-slate-800">Pemerintah Kabupaten Sinar Raya</h4>
              <h4 className="text-sm font-medium tracking-tight uppercase leading-tight text-slate-800">Kecamatan Sejahtera Makmur</h4>
              <h2 className="text-lg font-extrabold tracking-normal uppercase leading-snug text-slate-900">KANTOR KEPALA DESA MAKMUR JAYA</h2>
              <p className="text-[10px] text-slate-500 font-mono mt-1">
                Jl. Raya Praja No. 1, Kode Pos 40182 | Surel: pemdes@makmurjaya.desa.id | Web: www.makmurjaya.desa.id
              </p>
              
              {/* Double Line Border Decor */}
              <div className="border-t border-slate-900 mt-2 h-0.5" />
            </div>

            {/* Document Title */}
            <div className="text-center mb-6">
              <h1 className="text-base font-extrabold tracking-wide uppercase text-slate-900 border-b border-slate-200 inline-block pb-0.5">
                BERITA ACARA & NOTULEN MUSYAWARAH DESA (E-MUSRENBANG)
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-1">Nomor Registrasi Digital: {session.id.toUpperCase()}-2026/MD-MJ</p>
            </div>

            {/* Paragraph Description */}
            <div className="text-xs leading-relaxed text-slate-700 space-y-3 mb-6">
              <p>
                Pada hari ini, <strong className="text-slate-904">Sabtu</strong> tanggal <strong className="text-slate-904">23 Mei 2026</strong> bertempat di <strong className="text-slate-904">{session.location}</strong>, telah diselenggarakan Musyawarah Desa yang dihadiri oleh Badan Permusyawaratan Desa (BPD), Perangkat Desa, Lembaga Kemasyarakatan Desa, Tokoh Masyarakat, Dusun, serta Warga Desa Makmur Jaya guna membahas rencana strategis perihal pembagian kerja dan pagu prioritas.
              </p>
            </div>

            {/* Form Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs mb-6 print:bg-white print:p-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Nama Kegiatan</span>
                  <span className="font-semibold text-slate-800">: {session.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Kategori</span>
                  <span className="font-semibold text-slate-800">: {session.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Waktu Pelaksanaan</span>
                  <span className="text-slate-700">: {session.date} | {session.time}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Pimpinan Sidang</span>
                  <span className="text-slate-700">: {session.leader}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Sekretaris / Notulis</span>
                  <span className="text-slate-700">: {session.secretary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-slate-500">Jumlah Hadir</span>
                  <span className="font-mono text-slate-700 font-bold">: {attendees.length} Jiwa Terdaftar</span>
                </div>
              </div>
            </div>

            {/* I. Agendas Section */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-sm inline-block mb-3">
                I. Agenda Musyawarah
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 pl-1">
                {agendas.map((ag, idx) => (
                  <li key={ag.id} className="leading-relaxed">
                    <span className="font-medium text-slate-800">{ag.topic}</span>
                    <span className="text-[10px] text-slate-500 ml-2">({ag.duration} oleh {ag.speaker})</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* II. Minutes/Discussions Section */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-sm inline-block mb-3">
                II. Pokok Bahasan & Ringkasan Diskusi Digital
              </h3>
              <div className="space-y-2 text-xs text-slate-700 pl-1">
                {minutes?.summary && (
                  <p className="italic bg-slate-50/50 p-2.5 rounded-md border-l-2 border-emerald-500 text-slate-600 leading-relaxed mb-3">
                    &ldquo;{minutes.summary}&rdquo;
                  </p>
                )}
                {minutes?.discussionPoints && minutes.discussionPoints.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                    {minutes.discussionPoints.map((point, index) => (
                      <li key={index} className="text-slate-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 italic font-mono">- Belum diisi ringkasan diskusi -</p>
                )}
              </div>
            </div>

            {/* III. Decisions Section */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-sm inline-block mb-3">
                III. Keputusan Musyawarah (Sah & Mengikat)
              </h3>
              {decisions.length > 0 ? (
                <div className="space-y-3.5 pl-1">
                  {decisions.map((dec, i) => (
                    <div key={dec.id} className="border border-slate-200 rounded-md p-3 bg-white shadow-3xs">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle size={14} className="text-emerald-600 select-none" />
                          {i + 1}. {dec.title}
                        </h4>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-800 uppercase">
                          {dec.method}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{dec.description}</p>
                      {dec.method === 'Voting' && dec.votes && (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                          <span>Setuju: <strong className="text-slate-800">{dec.votes.agree}</strong></span>
                          <span>Beda Pendapat: <strong className="text-slate-800">{dec.votes.disagree}</strong></span>
                          <span>Abstain: <strong className="text-slate-800">{dec.votes.abstain}</strong></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-xs pl-1">- Belum ada keputusan final -</p>
              )}
            </div>

            {/* IV. Action Items */}
            {minutes?.actionItems && minutes.actionItems.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-sm inline-block mb-3">
                  IV. Rencana Tindak Lanjut (PIC & Tenggat Waktu)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-300 text-slate-500">
                        <th className="py-1 px-2 font-semibold">Tugas / Rencana</th>
                        <th className="py-1 px-2 font-semibold">Penanggung Jawab (PIC)</th>
                        <th className="py-1 px-2 font-semibold text-right">Tenggat Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {minutes.actionItems.map((act) => (
                        <tr key={act.id}>
                          <td className="py-1.5 px-2 text-slate-800 font-medium">{act.task}</td>
                          <td className="py-1.5 px-2 text-slate-600">{act.pic}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500 font-mono">{act.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* V. Signature Grid */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-sm inline-block mb-4">
                V. Tanda Tangan Elektronik Peserta Musyawarah
              </h3>
              
              {attendees.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-[10px] mt-2">
                  {attendees.map((at) => (
                    <div key={at.id} className="border border-slate-150 p-2.5 rounded bg-slate-50/50 flex flex-col justify-between h-28 print:border-slate-200 print:bg-white p-2">
                      <div className="mb-1">
                        <p className="font-bold text-slate-900 truncate" title={at.name}>{at.name}</p>
                        <p className="text-[9px] text-slate-500 translate-y-[-1px] font-mono">{at.role}</p>
                      </div>
                      
                      <div className="my-1.5">
                        {renderSignatureImage(at.signature, at.name)}
                      </div>
                      
                      <div className="text-[8px] text-slate-400 font-mono flex flex-col">
                        <span>NIK: {at.nik.substring(0, 6)}******{at.nik.substring(at.nik.length - 4)}</span>
                        <span>{new Date(at.timestamp).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-xs pl-1">- Belum ada warga yang mengabsen & mengisi tanda tangan -</p>
              )}
            </div>

            {/* Signature of Leaders Footer */}
            <div className="mt-12 flex justify-between gap-12 text-center text-xs text-slate-800 px-4">
              <div>
                <p className="mb-12 text-slate-500">Pimpinan Musyawarah,</p>
                <p className="font-bold text-slate-900 border-b border-slate-800 pb-0.5 inline-block">{session.leader}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Kepala Desa / BPD</p>
              </div>
              <div>
                <p className="mb-12 text-slate-500">Sekretaris / Notulis,</p>
                <p className="font-bold text-slate-900 border-b border-slate-800 pb-0.5 inline-block">{session.secretary}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Sekretaris Desa</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
