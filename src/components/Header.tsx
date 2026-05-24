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
    <header className="border-b border-slate-200/80 bg-white sticky top-0 z-30 shadow-xs dark:bg-zinc-900 dark:border-zinc-800" id="main-app-header">
      <div className="w-full px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100/60 dark:border-indigo-900/50">
            <Landmark size={20} className="stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-zinc-100 font-sans uppercase">
                E-Musyawarah
              </h1>
              <span className="text-[9.5px] bg-slate-100 dark:bg-zinc-800 text-slate-650 dark:text-zinc-400 px-2 py-0.5 rounded font-sans font-medium tracking-wide">
                {villageName}
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500 dark:text-zinc-400 font-sans mt-0.5">Sistem Tata Kelola Administrasi & Presensi Digital Sidang Desa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800 transition rounded-lg focus:outline-none cursor-pointer"
            title={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            id="btn-header-dark-toggle"
          >
            {darkMode ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800 transition rounded-lg focus:outline-none cursor-pointer"
            title="Pengaturan Profil Daerah"
            id="btn-header-settings"
          >
            <Settings size={16} />
          </button>

          <div className="w-[1px] h-4 bg-slate-200 dark:bg-zinc-800 mx-1.5" />
          
          <button
            onClick={() => setShowCreateSession(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-750 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-tight shadow-sm hover:shadow transition focus:outline-none cursor-pointer"
            id="btn-header-open-session"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>Rapat Baru</span>
          </button>
          
          <button
            onClick={() => {
              if (activeSession) {
                setShowReport(true);
              } else {
                triggerNotification('Pilih atau daftarkan sidang desa terlebih dahulu.', 'error');
              }
            }}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 px-4 py-2 rounded-lg text-xs font-semibold tracking-tight shadow-sm transition focus:outline-none cursor-pointer"
            id="btn-header-view-report"
          >
            <FileText size={14} />
            <span>Berita Acara</span>
          </button>
        </div>
      </div>
    </header>
  );
}
