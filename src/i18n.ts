import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      session: "Rapat",
      active: "Aktif",
      completed: "Selesai",
      close_meeting: "Selesaikan Rapat",
      activate_session: "Aktifkan Kembali",
      document_result: "Cetak Berita Acara",
      date: "TANGGAL",
      time: "WAKTU",
      location: "TEMPAT",
      connected_session: "Status Koneksi",
      digital_hybrid_local: "Lokal (Digital & Hybrid)",
      nik_validation_notice: "NIK warga divalidasi secara instan melalui sistem verifikasi tanda tangan digital.",
      gov_version: "Sinar Raya E-Gov v2.4",
      gateway_title: "Selamat Datang di E-Musyawarah",
      gateway_description: "Aplikasi pencatatan rapat dan hasil mufakat desa yang praktis, aman, dan dilengkapi tanda tangan digital. Silakan pilih rapat di menu kiri atau buat rapat baru.",
      register_new_meeting: "BUAT RAPAT BARU",
      footer_philosophy: "Musyawarah jujur, mufakat adil, demi kemajuan desa kita bersama."
    }
  },
  en: {
    translation: {
      session: "Session",
      active: "Active",
      completed: "Completed",
      close_meeting: "Close Meeting",
      activate_session: "Activate Session",
      document_result: "Print Minutes",
      date: "DATE",
      time: "TIME",
      location: "LOCATION",
      connected_session: "Connection Status",
      digital_hybrid_local: "Local (Digital & Hybrid)",
      nik_validation_notice: "Citizen NIK validated instantly via digital signature verification system.",
      gov_version: "Sinar Raya E-Gov v2.4",
      gateway_title: "Welcome to E-Musyawarah",
      gateway_description: "A practical, secure, and digital signature-equipped village consensus and meeting recording application. Please select a meeting on the left or create a new one.",
      register_new_meeting: "CREATE NEW MEETING",
      footer_philosophy: "Honest discussion, fair consensus, for the progress of our village together."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
