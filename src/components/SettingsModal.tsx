import React, { useState, useEffect } from 'react';
import { Settings, Save, X, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  villageName: string;
  subdistrictName: string;
  regencyName: string;
  govAddress: string;
  govEmail: string;
  govWebsite: string;
  handleSaveSettings: (data: {
    village: string;
    subdistrict: string;
    regency: string;
    address: string;
    email: string;
    website: string;
  }) => void;
  handleExportBackup: () => void;
  handleImportBackup: (file: File) => void;
}

export default function SettingsModal({
  showSettings,
  setShowSettings,
  villageName,
  subdistrictName,
  regencyName,
  govAddress,
  govEmail,
  govWebsite,
  handleSaveSettings,
  handleExportBackup,
  handleImportBackup
}: SettingsModalProps) {
  // Local state for the form inputs
  const [village, setVillage] = useState(villageName);
  const [subdistrict, setSubdistrict] = useState(subdistrictName);
  const [regency, setRegency] = useState(regencyName);
  const [address, setAddress] = useState(govAddress);
  const [email, setEmail] = useState(govEmail);
  const [website, setWebsite] = useState(govWebsite);

  // Sync state with props when modal opens
  useEffect(() => {
    if (showSettings) {
      setVillage(villageName);
      setSubdistrict(subdistrictName);
      setRegency(regencyName);
      setAddress(govAddress);
      setEmail(govEmail);
      setWebsite(govWebsite);
    }
  }, [showSettings, villageName, subdistrictName, regencyName, govAddress, govEmail, govWebsite]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveSettings({
      village,
      subdistrict,
      regency,
      address,
      email,
      website
    });
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="modal-settings-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="bg-white border border-slate-200 p-7 rounded-2xl max-w-lg w-full shadow-[0_24px_64px_rgba(60,64,67,0.15),_0_4px_16px_rgba(60,64,67,0.05)] relative"
            id="modal-settings-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 font-display">
                <Settings size={20} className="text-[#0b57d0]" />
                <span>Pengaturan Profil Daerah</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-slate-450 hover:text-slate-700 hover:bg-slate-50 p-1.5 rounded-full transition"
                id="btn-settings-close-x"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-5 leading-relaxed font-sans">
              Sesuaikan identitas wilayah di bawah ini. Semua data pada lembar cetak Berita Acara, kop surat resmi, dan hak cipta footer akan berubah secara dinamis sesuai daerah kamu.
            </p>

            <form onSubmit={onSubmit} className="space-y-4.5 text-xs text-slate-650" id="form-settings-regions">
              {/* Regency / District */}
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Nama Pemerintah Kabupaten / Kota</label>
                <input
                  type="text"
                  value={regency}
                  onChange={(e) => setRegency(e.target.value)}
                  placeholder="Contoh: Pemerintah Kabupaten Sinar Raya"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                  required
                  id="input-set-regency"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Subdistrict */}
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Nama Kecamatan</label>
                  <input
                    type="text"
                    value={subdistrict}
                    onChange={(e) => setSubdistrict(e.target.value)}
                    placeholder="Contoh: Kecamatan Sejahtera Makmur"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                    required
                    id="input-set-subdistrict"
                  />
                </div>
                {/* Village */}
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Nama Desa / Kelurahan</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Contoh: Desa Makmur Jaya"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                    required
                    id="input-set-village"
                  />
                </div>
              </div>

              {/* Office Address */}
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Alamat Kantor Desa / Kelurahan</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Contoh: Jl. Raya Praja No. 1, Kode Pos 40182"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                  required
                  id="input-set-address"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Email */}
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Surel / Email Resmi</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: pemdes@makmurjaya.desa.id"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                    required
                    id="input-set-email"
                  />
                </div>
                {/* Website */}
                <div>
                  <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-1.5 font-bold">Website Resmi</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Contoh: www.makmurjaya.desa.id"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] placeholder-slate-400 font-sans"
                    required
                    id="input-set-website"
                  />
                </div>
              </div>

              {/* Divider for Backup & Restore */}
              <hr className="border-slate-100" />
              
              <div>
                <label className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider mb-2 font-bold">Cadangan & Pemulihan Database</label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-slate-400 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition cursor-pointer focus:outline-none"
                    id="btn-settings-export-backup"
                  >
                    <Download size={14} className="text-slate-500 animate-none" />
                    <span>Ekspor Database (.json)</span>
                  </button>
                  <label
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-slate-400 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition cursor-pointer text-center select-none"
                    id="btn-settings-import-backup-label"
                  >
                    <Upload size={14} className="text-slate-500 animate-none" />
                    <span>Impor Database (.json)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImportBackup(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <hr className="border-slate-100 animate-none" />

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-full text-xs font-bold font-display transition cursor-pointer focus:outline-none"
                  id="btn-settings-cancel"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0b57d0] hover:bg-[#0049b8] text-white font-bold rounded-full text-xs font-display shadow-sm transition cursor-pointer focus:outline-none flex items-center gap-1.5"
                  id="btn-settings-save"
                >
                  <Save size={14} />
                  <span>Simpan Profil</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
