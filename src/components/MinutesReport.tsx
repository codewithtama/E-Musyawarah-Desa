import React from 'react';
import { MusyawarahSession, AgendaItem, AttendanceRecord, MinutesRecord, DecisionRecord } from '../types';
import { Printer, Landmark, CheckCircle, FileText, FileDown } from 'lucide-react';

interface MinutesReportProps {
  session: MusyawarahSession;
  agendas: AgendaItem[];
  attendees: AttendanceRecord[];
  minutes?: MinutesRecord;
  decisions: DecisionRecord[];
  onClose: () => void;
  villageName: string;
  subdistrictName: string;
  regencyName: string;
  govAddress: string;
  govEmail: string;
  govWebsite: string;
}

const formatIndonesianDate = (dateStr: string) => {
  if (!dateStr) return { day: '-', date: '-' };
  try {
    // Parse using local time to prevent timezone/UTC shifts
    const parts = dateStr.split('-');
    let date: Date;
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-based
      const day = parseInt(parts[2], 10);
      date = new Date(year, month, day);
    } else {
      date = new Date(dateStr);
    }

    if (isNaN(date.getTime())) return { day: '-', date: dateStr };
    
    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();

    let dayName = '-';
    switch (dayIndex) {
      case 0: dayName = 'Minggu'; break;
      case 1: dayName = 'Senin'; break;
      case 2: dayName = 'Selasa'; break;
      case 3: dayName = 'Rabu'; break;
      case 4: dayName = 'Kamis'; break;
      case 5: dayName = 'Jumat'; break;
      case 6: dayName = 'Sabtu'; break;
    }

    let monthName = '-';
    switch (monthIndex) {
      case 0: monthName = 'Januari'; break;
      case 1: monthName = 'Februari'; break;
      case 2: monthName = 'Maret'; break;
      case 3: monthName = 'April'; break;
      case 4: monthName = 'Mei'; break;
      case 5: monthName = 'Juni'; break;
      case 6: monthName = 'Juli'; break;
      case 7: monthName = 'Agustus'; break;
      case 8: monthName = 'September'; break;
      case 9: monthName = 'Oktober'; break;
      case 10: monthName = 'November'; break;
      case 11: monthName = 'Desember'; break;
    }
    
    return {
      day: dayName,
      date: `${date.getDate()} ${monthName} ${date.getFullYear()}`
    };
  } catch (e) {
    return { day: '-', date: dateStr };
  }
};

export default function MinutesReport({
  session,
  agendas,
  attendees,
  minutes,
  decisions,
  onClose,
  villageName,
  subdistrictName,
  regencyName,
  govAddress,
  govEmail,
  govWebsite
}: MinutesReportProps) {

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const content = document.getElementById('printable-area')?.innerHTML;
    if (!content) return;

    const styles = `
      <style>
        @page Section1 {
          size: 595.3pt 841.9pt; /* A4 */
          margin: 72.0pt 72.0pt 72.0pt 72.0pt;
          mso-header-margin: 35.4pt;
          mso-footer-margin: 35.4pt;
          mso-paper-source: 0;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Arial', 'Helvetica', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #333333;
        }
        h1 {
          font-size: 13pt;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          margin-top: 15px;
          margin-bottom: 5px;
        }
        h2 {
          font-size: 11pt;
          font-weight: bold;
          text-align: center;
          margin-top: 0;
          margin-bottom: 15px;
        }
        h3 {
          font-size: 10.5pt;
          font-weight: bold;
          color: #0b57d0;
          margin-top: 15px;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        h4 {
          font-size: 11pt;
          font-weight: bold;
          margin: 0;
          text-transform: uppercase;
        }
        p {
          margin: 0 0 8px 0;
          text-align: justify;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          margin-bottom: 15px;
        }
        th, td {
          border: 1px solid #cccccc;
          padding: 6px 8px;
          font-size: 9.5pt;
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        .indent-8 {
          text-indent: 30px;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        .font-bold {
          font-weight: bold;
        }
      </style>
    `;

    const htmlDoc = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Berita Acara Rapat - ${session.title}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          ${styles}
        </head>
        <body>
          <div class="Section1">
            ${content}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlDoc], {
      type: 'application/msword;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Berita-Acara-${session.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const { day, date } = formatIndonesianDate(session.date);

  const renderSignatureImage = (sig: string, name: string) => {
    if (!sig) return <span className="text-xs text-slate-400 italic font-sans">- Belum tanda tangan -</span>;
    
    if (sig.startsWith('data:image')) {
      return <img src={sig} alt={`Ttd ${name}`} className="h-10 mx-auto object-contain max-w-[120px] filter contrast-125" referrerPolicy="no-referrer" />;
    }
    
    return (
      <div className="h-10 flex items-center justify-center font-sans text-slate-700 italic border-b border-dotted border-slate-300 w-2/3 mx-auto relative select-none">
        <span className="text-xs opacity-30 absolute top-0 text-[9px] font-sans font-normal tracking-wider uppercase select-none">E-SIGNED</span>
        <span className="text-sm font-semibold tracking-wide rotate-[-3deg] text-blue-800">{name.split(',')[0]}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 md:p-6 overflow-y-auto" id="minutes-report-overlay">
      <div className="bg-[#f8f9fa] rounded-2xl shadow-[0_24px_64px_rgba(60,64,67,0.15)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" id="minutes-report-container">
        
        {/* Controls Bar */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#0b57d0]" />
            <h3 className="font-bold text-slate-800 font-display text-xs uppercase tracking-wide">Pratinjau Dokumen Berita Acara</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportWord}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold font-display shadow-sm transition duration-150 cursor-pointer focus:outline-none"
              id="btn-report-export-word"
            >
              <FileDown size={14} />
              <span>Unduh Word (.doc)</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0b57d0] hover:bg-[#0049b8] text-white rounded-full text-xs font-bold font-display shadow-sm transition duration-150 cursor-pointer focus:outline-none"
              id="btn-report-print"
            >
              <Printer size={14} />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-full text-xs font-bold font-display shadow-xs transition duration-150 cursor-pointer focus:outline-none"
              id="btn-report-close"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Printable Paper Document */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 print:p-0 bg-[#f8f9fa] print:bg-white" id="printable-area">
          <div className="bg-white p-8 md:p-12 border border-slate-200 rounded-2xl shadow-[0_4px_16px_rgba(60,64,67,0.06),_0_1px_3px_rgba(60,64,67,0.03)] max-w-3xl mx-auto print:border-0 print:shadow-none print:p-0">
            
            {/* KOP SURAT (Government Letterhead) */}
            <div className="text-center border-b-[3px] border-slate-800 pb-4 mb-6 relative">
              <div className="absolute left-0 top-1 text-slate-800 hidden md:block print:block">
                <Landmark size={52} className="stroke-[1.5] text-[#0b57d0]" />
              </div>
              <h4 className="text-xs font-bold tracking-tight uppercase leading-tight text-slate-850">{regencyName}</h4>
              <h4 className="text-xs font-medium tracking-tight uppercase leading-tight text-slate-600">{subdistrictName}</h4>
              <h2 className="text-base font-extrabold tracking-normal uppercase leading-snug text-slate-900 font-display">KANTOR KEPALA {villageName.toUpperCase()}</h2>
              <p className="text-[9px] text-slate-400 font-mono mt-1.5">
                {govAddress} | Surel: {govEmail} | Web: {govWebsite}
              </p>
              
              {/* Double Line Border Decor */}
              <div className="border-t border-slate-800 mt-2 h-0.5" />
            </div>

            {/* Document Title */}
            <div className="text-center mb-6">
              <h1 className="text-xs font-extrabold tracking-wide uppercase text-slate-900 border-b border-slate-200 inline-block pb-1 font-display">
                BERITA ACARA & NOTULEN MUSYAWARAH DESA
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Nomor Registrasi Digital: {session.id.toUpperCase()}-2026/MD-MJ</p>
            </div>

            {/* Paragraph Description */}
            <div className="text-xs leading-relaxed text-slate-700 space-y-3 mb-6">
              <p className="indent-8 text-justify">
                Pada hari ini, <strong className="font-semibold text-slate-900">{day}</strong> tanggal <strong className="font-semibold text-slate-900">{date}</strong> bertempat di <strong className="font-semibold text-slate-900">{session.location}</strong>, telah diselenggarakan Musyawarah Desa yang dihadiri oleh Badan Permusyawaratan Desa (BPD), Perangkat Desa, Lembaga Kemasyarakatan Desa, Tokoh Masyarakat, Dusun, serta Warga {villageName} guna membahas rencana strategis perihal pembagian kerja dan pagu prioritas.
              </p>
            </div>

            {/* Form Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl text-xs mb-6 print:bg-white print:p-2">
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
                  <span className="font-sans text-slate-700 font-bold">: {attendees.length} Jiwa Terdaftar</span>
                </div>
              </div>
            </div>

            {/* I. Agendas Section */}
            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#0b57d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3 font-display">
                I. Agenda Musyawarah
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 pl-1">
                {agendas.map((ag) => (
                  <li key={ag.id} className="leading-relaxed">
                    <span className="font-medium text-slate-800">{ag.topic}</span>
                    <span className="text-[10px] text-slate-500 ml-2">({ag.duration} oleh {ag.speaker})</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* II. Minutes/Discussions Section */}
            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#0b57d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3 font-display">
                II. Pokok Bahasan & Ringkasan Diskusi Digital
              </h3>
              <div className="space-y-2 text-xs text-slate-700 pl-1">
                {minutes?.summary && (
                  <p className="italic bg-slate-50/50 p-2.5 rounded-xl border-l-2 border-[#0b57d0] text-slate-650 leading-relaxed mb-3">
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
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#0b57d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3 font-display">
                III. Keputusan Musyawarah (Sah & Mengikat)
              </h3>
              {decisions.length > 0 ? (
                <div className="space-y-3.5 pl-1">
                  {decisions.map((dec, i) => (
                    <div key={dec.id} className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-xs">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle size={14} className="text-[#0b57d0] shrink-0 select-none" />
                          <span>{i + 1}. {dec.title}</span>
                        </h4>
                        <span className="text-[9px] font-sans px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-[#0b57d0] border border-blue-100 uppercase">
                          {dec.method}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{dec.description}</p>
                      {dec.method === 'Voting' && dec.votes && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-500 font-sans">
                          <span>Setuju: <strong className="text-green-700 font-bold">{dec.votes.agree}</strong></span>
                          <span>Tolak: <strong className="text-red-700 font-bold">{dec.votes.disagree}</strong></span>
                          <span>Abstain: <strong className="text-slate-600 font-bold">{dec.votes.abstain}</strong></span>
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
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#0b57d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-3 font-display">
                  IV. Rencana Tindak Lanjut (PIC & Tenggat Waktu)
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-[11px] border-collapse text-left font-sans">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                        <th className="py-2.5 px-3 font-bold uppercase">Tugas / Rencana</th>
                        <th className="py-2.5 px-3 font-bold uppercase">PIC</th>
                        <th className="py-2.5 px-3 font-bold uppercase text-right">Tenggat Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {minutes.actionItems.map((act) => (
                        <tr key={act.id} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 text-slate-800 font-medium">{act.task}</td>
                          <td className="py-2 px-3 text-[#0b57d0] font-bold">{act.pic}</td>
                          <td className="py-2 px-3 text-right text-slate-500 font-sans">{act.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* V. Signature Grid */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#0b57d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-4 font-display">
                V. Tanda Tangan Elektronik Peserta Musyawarah
              </h3>
              
              {attendees.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-[10px] mt-2">
                  {attendees.map((at) => (
                    <div key={at.id} className="border border-slate-200 p-3 rounded-xl bg-slate-50 flex flex-col justify-between h-28 print:border-slate-200 print:bg-white">
                      <div className="mb-1">
                        <p className="font-bold text-slate-800 truncate" title={at.name}>{at.name}</p>
                        <p className="text-[9px] text-[#0b57d0] font-sans font-bold">{at.role}</p>
                      </div>
                      
                      <div className="my-1.5">
                        {renderSignatureImage(at.signature, at.name)}
                      </div>
                      
                      <div className="text-[8px] text-slate-500 font-sans flex flex-col">
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
            <div className="mt-12 flex justify-between items-center gap-6 text-center text-xs text-slate-800 px-4">
              <div className="flex-1">
                <p className="mb-12 text-slate-500">Pimpinan Musyawarah,</p>
                <p className="font-bold text-slate-900 border-b border-slate-300 pb-0.5 inline-block">{session.leader}</p>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5">Kepala Desa / BPD</p>
              </div>

              {/* QR Code Verification for Document Integrity */}
              <div className="flex flex-col items-center justify-center p-2.5 bg-white border border-slate-200 rounded-xl select-none w-28 shrink-0">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    `https://verifikasi.desa.go.id/rapat?id=${session.id}&judul=${session.title}&hadir=${attendees.length}`
                  )}`}
                  alt="Verifikasi QR"
                  className="w-18 h-18 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[7.5px] font-mono text-slate-400 mt-1 uppercase tracking-wider font-bold select-none leading-none">Integritas Dokumen</span>
                <span className="text-[6.5px] font-mono text-slate-450 uppercase select-none mt-0.5">Pindai Verifikasi</span>
              </div>

              <div className="flex-1">
                <p className="mb-12 text-slate-500">Sekretaris / Notulis,</p>
                <p className="font-bold text-slate-900 border-b border-slate-300 pb-0.5 inline-block">{session.secretary}</p>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5">Sekretaris Desa</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
