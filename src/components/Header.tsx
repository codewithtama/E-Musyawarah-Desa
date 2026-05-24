import React from 'react';
import { Landmark, Plus, FileText, Settings, Sun, Moon } from 'lucide-react';
import { MusyawarahSession } from '../types';

interface HeaderProps {
  activeSession: MusyawarahSession | undefined;
  setShowCreateSession: (show: boolean) => void;
  setShowReport: (show: boolean) => void;
  triggerNotification: (msg: string, type?: 'success' | 'info' | 'error') => void;
  villageName: string;
  setShowSettings: (show: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({
  activeSession,
  setShowCreateSession,
  setShowReport,
  triggerNotification,
  villageName,
  setShowSettings,
  darkMode,
  setDarkMode
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-[0_1px_3px_rgba(60,64,67,0.08)]" id="main-app-header">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-[#0b57d0] rounded-xl border border-blue-100">
            <Landmark size={22} className="stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-slate-800 font-display uppercase">
                E-Musyawarah
              </h1>
              <span className="text-[9px] bg-blue-50 text-[#0b57d0] border border-blue-100 px-2 py-0.5 rounded-full font-mono font-bold tracking-wide uppercase">{villageName}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans tracking-wide">Pencatatan Rapat Desa Praktis dengan Dukungan Tanda Tangan Digital Resmi</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 hover:text-[#0b57d0] hover:bg-slate-100 border border-slate-300 hover:border-[#0b57d0] transition duration-150 rounded-full focus:outline-none cursor-pointer"
            title={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            id="btn-header-dark-toggle"
          >
            {darkMode ? <Sun size={17} className="text-amber-500 animate-none" /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-slate-500 hover:text-[#0b57d0] hover:bg-slate-100 border border-slate-300 hover:border-[#0b57d0] transition duration-150 rounded-full focus:outline-none cursor-pointer"
            title="Pengaturan Daerah"
            id="btn-header-settings"
          >
            <Settings size={17} />
          </button>
          
          <button
            onClick={() => setShowCreateSession(true)}
            className="flex items-center gap-1.5 bg-[#0b57d0] hover:bg-[#0049b8] text-white px-5 py-2.5 rounded-full text-xs font-bold font-display shadow-[0_1px_2px_rgba(60,64,67,0.3),_0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_2px_6px_rgba(60,64,67,0.15),_0_4px_10px_4px_rgba(60,64,67,0.25)] transition duration-150 focus:outline-none cursor-pointer"
            id="btn-header-open-session"
          >
            <Plus size={15} className="stroke-[2.5] text-white" />
            <span>Buat Rapat Baru</span>
          </button>
          <button
            onClick={() => {
              if (activeSession) {
                setShowReport(true);
              } else {
                triggerNotification('Silakan buat atau pilih rapat terlebih dahulu.', 'error');
              }
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#0b57d0] text-[#0b57d0] px-5 py-2.5 rounded-full text-xs font-bold font-display shadow-sm transition duration-150 focus:outline-none cursor-pointer"
            id="btn-header-view-report"
          >
            <FileText size={15} />
            <span>Berita Acara</span>
          </button>
        </div>
      </div>
    </header>
  );
}
