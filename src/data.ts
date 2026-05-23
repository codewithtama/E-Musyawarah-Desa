import { MusyawarahSession, AgendaItem, AttendanceRecord, MinutesRecord, DecisionRecord } from './types';

export const INITIAL_SESSIONS: MusyawarahSession[] = [
  {
    id: 'session-1',
    title: 'Musrenbangdes (Musyawarah Perencanaan Pembangunan Desa) 2026',
    date: '2026-05-23',
    time: '13:00 - 16:00 WIB',
    location: 'Balai Pertemuan Desa Makmur Jaya',
    status: 'active',
    category: 'Pembangunan Infrastruktur',
    leader: 'H. Sudirman, S.IP. (Kepala Desa)',
    secretary: 'Sri Wahyuni, A.Md. (Sekretaris Desa)',
  },
  {
    id: 'session-2',
    title: 'Musyawarah Desa Khusus: Validasi & Penerimaan BLT Dana Desa Triwulan II',
    date: '2026-05-10',
    time: '09:00 - 12:00 WIB',
    location: 'Balai Pertemuan Desa Makmur Jaya',
    status: 'finished',
    category: 'Pemberdayaan & Sosial',
    leader: 'H. Sudirman, S.IP. (Kepala Desa)',
    secretary: 'Sri Wahyuni, A.Md. (Sekretaris Desa)',
  },
  {
    id: 'session-3',
    title: 'Rapat Kerja Regulasi Desa dan Pos Siskamling Dusun III',
    date: '2026-06-01',
    time: '19:30 - 21:00 WIB',
    location: 'Pendopo Kantor Desa (Dusun III)',
    status: 'draft',
    category: 'Keamanan & Ketertiban',
    leader: 'Budi Santoso (Ketua BPD)',
    secretary: 'Rian Priambodo (Kaur Umum)',
  }
];

export const INITIAL_AGENDAS: AgendaItem[] = [
  // Session 1 Agendas
  {
    id: 'agenda-1-1',
    sessionId: 'session-1',
    topic: 'Pembukaan & Laporan Realisasi Program Desa Tahun Anggaran 2025',
    duration: '30 Menit',
    speaker: 'H. Sudirman, S.IP. (Kades)',
    status: 'completed',
  },
  {
    id: 'agenda-1-2',
    sessionId: 'session-1',
    topic: 'Prioritas Usulan Pengaspalan Jalan Penghubung RT 04 ke RT 08 Dusun II',
    duration: '45 Menit',
    speaker: 'Supardi (Kepala Dusun II)',
    status: 'ongoing',
  },
  {
    id: 'agenda-1-3',
    sessionId: 'session-1',
    topic: 'Rencana Renovasi Puskesmas Pembantu & Pembelian Ambulance Desa',
    duration: '45 Menit',
    speaker: 'dr. Endah Lestari (Kepala Pustu)',
    status: 'pending',
  },
  {
    id: 'agenda-1-4',
    sessionId: 'session-1',
    topic: 'Tanya Jawab & Pengesahan Usulan Prioritas Dusun',
    duration: '60 Menit',
    speaker: 'Budi Santoso (Ketua BPD)',
    status: 'pending',
  },

  // Session 2 Agendas
  {
    id: 'agenda-2-1',
    sessionId: 'session-2',
    topic: 'Pemaparan Regulasi & Kuota Maksimal Penerima BLT Kemiskinan Ekstrem 2026',
    duration: '30 Menit',
    speaker: 'H. Sudirman, S.IP.',
    status: 'completed',
  },
  {
    id: 'agenda-2-2',
    sessionId: 'session-2',
    topic: 'Validasi dan Verifikasi Ulang Data Calon KPM (Keluarga Penerima Manfaat)',
    duration: '60 Menit',
    speaker: 'Ibu Ratna (Pendamping Desa)',
    status: 'completed',
  },
  {
    id: 'agenda-2-3',
    sessionId: 'session-2',
    topic: 'Pengambilan Keputusan Bersama Kelayakan 15 KPM Tambahan',
    duration: '30 Menit',
    speaker: 'Budi Santoso (BPD)',
    status: 'completed',
  }
];

// Seeded real-looking public signatures (mocked canvas strokes represented as simple svg lines metadata or static base64)
export const DEFAULT_SIGNATURE_PAGES = {
  sudirman: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><path d="M10,25 Q30,5 50,25 T90,25" fill="none" stroke="black" stroke-width="2"/></svg>',
  wiryawan: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><path d="M15,35 C30,10 40,40 50,15 T85,30" fill="none" stroke="black" stroke-width="2"/></svg>',
  sri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><path d="M10,20 Q40,30  60,10 T90,40" fill="none" stroke="black" stroke-width="2"/></svg>',
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'attendance-1-1',
    sessionId: 'session-1',
    name: 'H. Sudirman, S.IP.',
    nik: '3204121203750001',
    role: 'Kepala Desa',
    phone: '081234567801',
    timestamp: '2026-05-23T13:02:11Z',
    signature: 'SUDIRMAN_SIGN_MOCK',
  },
  {
    id: 'attendance-1-2',
    sessionId: 'session-1',
    name: 'Sri Wahyuni, A.Md.',
    nik: '3204124408880004',
    role: 'Perangkat Desa (Sekretaris)',
    phone: '081234567802',
    timestamp: '2026-05-23T13:04:15Z',
    signature: 'SRI_SIGN_MOCK',
  },
  {
    id: 'attendance-1-3',
    sessionId: 'session-1',
    name: 'Budi Santoso',
    nik: '3204120911720002',
    role: 'Badan Permusyawaratan Desa (BPD)',
    phone: '085678901234',
    timestamp: '2026-05-23T13:08:22Z',
    signature: 'BUDI_SIGN_MOCK',
  },
  {
    id: 'attendance-1-4',
    sessionId: 'session-1',
    name: 'Supardi',
    nik: '3204121505680003',
    role: 'Kepala Dusun II',
    phone: '087812345678',
    timestamp: '2026-05-23T13:10:01Z',
    signature: 'SUPARDI_SIGN_MOCK',
  },
  {
    id: 'attendance-1-5',
    sessionId: 'session-1',
    name: 'Kusuma Wijaya',
    nik: '3204122104820005',
    role: 'Tokoh Masyarakat',
    phone: '081399887766',
    timestamp: '2026-05-23T13:12:44Z',
    signature: 'KUSUMA_SIGN_MOCK',
  },

  // Session 2 Attendance
  {
    id: 'attendance-2-1',
    sessionId: 'session-2',
    name: 'H. Sudirman, S.IP.',
    nik: '3204121203750001',
    role: 'Kepala Desa',
    phone: '081234567801',
    timestamp: '2026-05-10T08:55:00Z',
    signature: 'SUDIRMAN_SIGN_MOCK',
  },
  {
    id: 'attendance-2-2',
    sessionId: 'session-2',
    name: 'Sri Wahyuni, A.Md.',
    nik: '3204124408880004',
    role: 'Perangkat Desa (Sekretaris)',
    phone: '081234567802',
    timestamp: '2026-05-10T08:58:30Z',
    signature: 'SRI_SIGN_MOCK',
  },
  {
    id: 'attendance-2-3',
    sessionId: 'session-2',
    name: 'Supriyadi',
    nik: '3204121901760002',
    role: 'Perwakilan Warga RT 02 / RW 01',
    phone: '087612343212',
    timestamp: '2026-05-10T09:05:12Z',
    signature: 'SUPRIYADI_SIGN_MOCK',
  }
];

export const INITIAL_MINUTES: MinutesRecord[] = [
  {
    sessionId: 'session-1',
    summary: 'Rapat Musrenbangdes 2026 diawali dengan pembacaan laporan penyerapan anggaran tahun 2025 yang mencapai 94.2%. Fokus bahasan adalah menampung usulan pembangunan jalan Dusun II dan renovasi Pustu, serta permohonan ambulance desa.',
    discussionPoints: [
      'Penyampaian laporan realisasi pengerjaan drainase Dusun I sepanjang 450 meter selesai dikerjakan Januari kemarin.',
      'Sdr. Supardi selaku Kadus II menyampaikan tuntutan darurat warga RT 04 - RT 08 tentang aspal jalan yang sudah berlubang dalam dan sering menyebabkan genangan air saat hujan.',
      'Perkiraan biaya pengaspalan jalan Dusun II dengan jenis hotmix sepanjang 1.2 KM berkisar Rp 230 juta rupiah.',
      'dr. Endah menjelaskan pentingnya penambahan unit ambulance desa untuk mobilitas rujukan darurat ke RSUD daerah, didukung 4 RT Desa Makmur Jaya.',
      'BPD mengusulkan agar sisa anggaran tahun lalu dialokasikan untuk penambahan subsidi bibit pertanian bagi kelompok pemuda.'
    ],
    actionItems: [
      {
        id: 'act-1',
        task: 'Penyusunan Rencana Anggaran Biaya (RAB) pengaspalan Jalan Dusun II secara rigid/hotmix',
        pic: 'Supardi (Kadus II) & Kaur Pembangunan',
        deadline: '2026-06-01',
      },
      {
        id: 'act-2',
        task: 'Evaluasi status kepemilikan aset lahan Puskesmas Pembantu sebelum renovasi disetujui',
        pic: 'Sri Wahyuni (Sekdes)',
        deadline: '2026-05-30',
      }
    ],
  },
  {
    sessionId: 'session-2',
    summary: 'Musyawarah khusus menetapkan verifikasi ketat keluarga penerima manfaat (KPM) bantuan tunai langsung. Dari total 120 usulan awal, disetujui pemangkasan kuota menjadi 95 KPM sesuai amanat kemiskinan ekstrem nasional guna pemerataan dana kesejahteraan desa.',
    discussionPoints: [
      'Kepala desa memaparkan regulasi batasan anggaran alokasi BLT DD maksimal 25% dari pagu Dana Desa keseluruhan.',
      'Dilakukan pengecekan satu persatu dari 15 KPM tambahan yang diusulkan oleh ketua RT/RW setempat.',
      'Telah dikeluarkan 3 calon KPM karena diketahui memiliki aset kendaraan roda empat dan menerima bantuan PKH paralel.',
      'Disepakati sanksi pencabutan bagi penerima BLT yang terbukti menyalahgunakan dana bantuan untuk judi online atau pembelian komoditas non-pokok.'
    ],
    actionItems: [
      {
        id: 'act-3',
        task: 'Penyerahan SK Kepala Desa atas nama-nama 95 KPM BLT terbaru ke Kecamatan',
        pic: 'Sri Wahyuni, A.Md. (Sekdes)',
        deadline: '2026-05-15',
      },
      {
        id: 'act-4',
        task: 'Penyusunan jadwal penyaluran tunai BLT di Bank Desa/Kantor Pos terdekat',
        pic: 'Kaur Keuangan',
        deadline: '2026-05-20',
      }
    ]
  }
];

export const INITIAL_DECISIONS: DecisionRecord[] = [
  {
    id: 'dec-1-1',
    sessionId: 'session-1',
    title: 'Persetujuan Prioritas Pengaspalan Jalan Dusun II TA 2026',
    description: 'Menyetujui pengalokasian dana sebesar Rp 230.000.000,- (Dua Ratus Tiga Puluh Juta Rupiah) dari pagu Dana Desa tahun anggaran 2026 untuk pekerjaan pengaspalan/rehabilitasi hotmix jalan penghubung Dusun II sepanjang 1.2 KM.',
    method: 'Mufakat',
    status: 'Disahkan',
  },
  {
    id: 'dec-1-2',
    sessionId: 'session-1',
    title: 'Pengadaan Unit Ambulance Desa Siaga',
    description: 'Diusulkan dalam musrenbang untuk diajukan ke Anggaran Kabupaten (Hibah) atau Dana Bagi Hasil Pajak. Dana Desa mengcover asuransi dan operasional sopir sebesar 15 juta rupiah per tahun.',
    method: 'Voting',
    votes: {
      agree: 34,
      disagree: 5,
      abstain: 3,
    },
    status: 'Disahkan',
  },
  {
    id: 'dec-2-1',
    sessionId: 'session-2',
    title: 'Penetapan 95 Kepala Keluarga (KK) Penerima Manfaat BLT Dana Desa 2026',
    description: 'Menetapkan daftar valid 95 KK sebagai penerima sah program BLT Kemiskinan Ekstrem dengan besaran Rp 300.000 per bulan selama 12 bulan penuh di tahun berjalan.',
    method: 'Mufakat',
    status: 'Disahkan',
  }
];
