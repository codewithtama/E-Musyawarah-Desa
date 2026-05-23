import React, { useState, useEffect } from 'react';
import {
  Landmark,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  UserCheck,
  CheckSquare,
  Award,
  Vote,
  Plus,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  LogOut,
  PenTool,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Initial Data
import { MusyawarahSession, AgendaItem, AttendanceRecord, MinutesRecord, DecisionRecord, MusyawarahCategory } from './types';
import {
  INITIAL_SESSIONS,
  INITIAL_AGENDAS,
  INITIAL_ATTENDANCE,
  INITIAL_MINUTES,
  INITIAL_DECISIONS,
  DEFAULT_SIGNATURE_PAGES
} from './data';

// Components
import SignatureCanvas from './components/SignatureCanvas';
import MinutesReport from './components/MinutesReport';

export default function App() {
  // --- STATE ---
  const [sessions, setSessions] = useState<MusyawarahSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [minutes, setMinutes] = useState<MinutesRecord[]>([]);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);

  // Workspace controls
  const [activeTab, setActiveTab] = useState<'agenda' | 'attendance' | 'minutes' | 'decisions'>('agenda');
  const [showReport, setShowReport] = useState<boolean>(false);
  const [showCreateSession, setShowCreateSession] = useState<boolean>(false);

  // New Session Form State
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionCategory, setNewSessionCategory] = useState<MusyawarahCategory>('Pembangunan Infrastruktur');
  const [newSessionLocation, setNewSessionLocation] = useState('Balai Desa Makmur Jaya');
  const [newSessionDate, setNewSessionDate] = useState('');
  const [newSessionTime, setNewSessionTime] = useState('09:00 - 12:00 WIB');
  const [newSessionLeader, setNewSessionLeader] = useState('H. Sudirman, S.IP. (Kepala Desa)');
  const [newSessionSecretary, setNewSessionSecretary] = useState('Sri Wahyuni, A.Md. (Sekretaris Desa)');

  // New Agenda Form State
  const [newAgendaTopic, setNewAgendaTopic] = useState('');
  const [newAgendaSpeaker, setNewAgendaSpeaker] = useState('');
  const [newAgendaDuration, setNewAgendaDuration] = useState('30 Menit');

  // New Attendance Form State
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeNik, setNewAttendeeNik] = useState('');
  const [newAttendeeRole, setNewAttendeeRole] = useState('Warga Dusun I');
  const [newAttendeePhone, setNewAttendeePhone] = useState('');
  const [newAttendeeSignature, setNewAttendeeSignature] = useState('');

  // New Decision Form State
  const [newDecisionTitle, setNewDecisionTitle] = useState('');
  const [newDecisionDescription, setNewDecisionDescription] = useState('');
  const [newDecisionMethod, setNewDecisionMethod] = useState<'Mufakat' | 'Voting'>('Mufakat');
  const [newDecisionVotesAgree, setNewDecisionVotesAgree] = useState<number>(0);
  const [newDecisionVotesDisagree, setNewDecisionVotesDisagree] = useState<number>(0);
  const [newDecisionVotesAbstain, setNewDecisionVotesAbstain] = useState<number>(0);

  // New Action Item state in Minutes tab
  const [newActionTask, setNewActionTask] = useState('');
  const [newActionPic, setNewActionPic] = useState('');
  const [newActionDeadline, setNewActionDeadline] = useState('');

  // New Discussion Point state in Minutes tab
  const [newDiscussionPoint, setNewDiscussionPoint] = useState('');

  // General Notification Banner
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Simulated live voting status
  const [isVotingSimulating, setIsVotingSimulating] = useState(false);

  // --- INITIAL LOAD & PERSISTENCE ---
  useEffect(() => {
    // Load Sessions
    const savedSessions = localStorage.getItem('musyawarah_sessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed);
      if (parsed.length > 0) setSelectedSessionId(parsed[0].id);
    } else {
      setSessions(INITIAL_SESSIONS);
      setSelectedSessionId(INITIAL_SESSIONS[0].id);
      localStorage.setItem('musyawarah_sessions', JSON.stringify(INITIAL_SESSIONS));
    }

    // Load Agendas
    const savedAgendas = localStorage.getItem('musyawarah_agendas');
    if (savedAgendas) {
      setAgendas(JSON.parse(savedAgendas));
    } else {
      setAgendas(INITIAL_AGENDAS);
      localStorage.setItem('musyawarah_agendas', JSON.stringify(INITIAL_AGENDAS));
    }

    // Load Attendance
    const savedAttendance = localStorage.getItem('musyawarah_attendance');
    if (savedAttendance) {
      setAttendance(JSON.parse(savedAttendance));
    } else {
      setAttendance(INITIAL_ATTENDANCE);
      localStorage.setItem('musyawarah_attendance', JSON.stringify(INITIAL_ATTENDANCE));
    }

    // Load Minutes
    const savedMinutes = localStorage.getItem('musyawarah_minutes');
    if (savedMinutes) {
      setMinutes(JSON.parse(savedMinutes));
    } else {
      setMinutes(INITIAL_MINUTES);
      localStorage.setItem('musyawarah_minutes', JSON.stringify(INITIAL_MINUTES));
    }

    // Load Decisions
    const savedDecisions = localStorage.getItem('musyawarah_decisions');
    if (savedDecisions) {
      setDecisions(JSON.parse(savedDecisions));
    } else {
      setDecisions(INITIAL_DECISIONS);
      localStorage.setItem('musyawarah_decisions', JSON.stringify(INITIAL_DECISIONS));
    }
  }, []);

  // Helper sync back to local storage
  const syncLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Trigger brief alert notification
  const triggerNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // --- OPERATIONS ---

  // Create New Session
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionTitle.trim()) {
      triggerNotification('Nama agenda rapat wajib diisi', 'error');
      return;
    }

    const uniqueId = `session-${Date.now()}`;
    const dateStr = newSessionDate || new Date().toISOString().split('T')[0];

    const newSession: MusyawarahSession = {
      id: uniqueId,
      title: newSessionTitle,
      category: newSessionCategory,
      location: newSessionLocation,
      date: dateStr,
      time: newSessionTime,
      status: 'active', // active immediately on creation
      leader: newSessionLeader,
      secretary: newSessionSecretary,
    };

    const updated = [newSession, ...sessions];
    setSessions(updated);
    setSelectedSessionId(uniqueId);
    syncLocalStorage('musyawarah_sessions', updated);

    // Bootstrap an empty Minutes template for this session
    const emptyMinutes: MinutesRecord = {
      sessionId: uniqueId,
      summary: `Hasil rapat musyawarah perihal pembahasan ${newSessionTitle}.`,
      discussionPoints: [
        'Musyawarah diresmikan oleh pimpinan rapat.',
        'Warga desa dipersilakan mengabsen secara kolektif dengan tanda tangan elektronik.'
      ],
      actionItems: [],
    };
    const updatedMinutes = [emptyMinutes, ...minutes];
    setMinutes(updatedMinutes);
    syncLocalStorage('musyawarah_minutes', updatedMinutes);

    // Bootstrap basic agenda outline for testing
    const defaultAgenda1: AgendaItem = {
      id: `agenda-${Date.now()}-1`,
      sessionId: uniqueId,
      topic: 'Pembukaan & Absensi Elektronik Peserta Rapat',
      duration: '15 Menit',
      speaker: newSessionLeader,
      status: 'ongoing'
    };
    const defaultAgenda2: AgendaItem = {
      id: `agenda-${Date.now()}-2`,
      sessionId: uniqueId,
      topic: 'Pemaparan Point Utama Musyawarah',
      duration: '45 Menit',
      speaker: newSessionLeader,
      status: 'pending'
    };
    const updatedAgendas = [...agendas, defaultAgenda1, defaultAgenda2];
    setAgendas(updatedAgendas);
    syncLocalStorage('musyawarah_agendas', updatedAgendas);

    // Reset Form
    setNewSessionTitle('');
    setNewSessionDate('');
    setShowCreateSession(false);
    triggerNotification('Musyawarah Desa Baru Berhasil Dibuat!', 'success');
  };

  // Delete Session
  const handleDeleteSession = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus arsip musyawarah ini? Seluruh data absensi, notulen dan keputusan yang berkaitan juga akan terhapus.')) {
      const remainingSessions = sessions.filter(s => s.id !== id);
      setSessions(remainingSessions);
      syncLocalStorage('musyawarah_sessions', remainingSessions);

      // Clean other collections
      const cleanAg = agendas.filter(a => a.sessionId !== id);
      setAgendas(cleanAg);
      syncLocalStorage('musyawarah_agendas', cleanAg);

      const cleanAt = attendance.filter(a => a.sessionId !== id);
      setAttendance(cleanAt);
      syncLocalStorage('musyawarah_attendance', cleanAt);

      const cleanMin = minutes.filter(m => m.sessionId !== id);
      setMinutes(cleanMin);
      syncLocalStorage('musyawarah_minutes', cleanMin);

      const cleanDec = decisions.filter(d => d.sessionId !== id);
      setDecisions(cleanDec);
      syncLocalStorage('musyawarah_decisions', cleanDec);

      if (selectedSessionId === id && remainingSessions.length > 0) {
        setSelectedSessionId(remainingSessions[0].id);
      }
      triggerNotification('Arsip musyawarah telah dihapus', 'info');
    }
  };

  // Close Session (Finish Meeting)
  const handleCompleteSession = (id: string) => {
    const updated = sessions.map(s => {
      if (s.id === id) {
        return { ...s, status: 'finished' as const };
      }
      return s;
    });
    setSessions(updated);
    syncLocalStorage('musyawarah_sessions', updated);
    triggerNotification('Musyawarah Desa selesai dan ditutup secara resmi!', 'success');
  };

  // Reopen Session (Draft)
  const handleReopenSession = (id: string) => {
    const updated = sessions.map(s => {
      if (s.id === id) {
        return { ...s, status: 'active' as const };
      }
      return s;
    });
    setSessions(updated);
    syncLocalStorage('musyawarah_sessions', updated);
    triggerNotification('Status musyawarah dikembalikan menjadi aktif', 'info');
  };

  // Find Active Session Metadata
  const activeSession = sessions.find(s => s.id === selectedSessionId);

  // Sub-data filters for active session
  const activeAgendas = agendas.filter(a => a.sessionId === selectedSessionId);
  const activeAttendance = attendance.filter(a => a.sessionId === selectedSessionId);
  const activeMinutes = minutes.find(m => m.sessionId === selectedSessionId) || {
    sessionId: selectedSessionId,
    summary: '',
    discussionPoints: [],
    actionItems: []
  };
  const activeDecisions = decisions.filter(d => d.sessionId === selectedSessionId);

  // Add Agenda Item
  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgendaTopic.trim() || !newAgendaSpeaker.trim()) {
      triggerNotification('Topik dan narasumber wajib diisi', 'error');
      return;
    }
    const newAg: AgendaItem = {
      id: `agenda-${Date.now()}`,
      sessionId: selectedSessionId,
      topic: newAgendaTopic,
      duration: newAgendaDuration,
      speaker: newAgendaSpeaker,
      status: 'pending'
    };
    const updated = [...agendas, newAg];
    setAgendas(updated);
    syncLocalStorage('musyawarah_agendas', updated);
    setNewAgendaTopic('');
    setNewAgendaSpeaker('');
    triggerNotification('Topic agenda ditambahkan', 'success');
  };

  // Update Agenda Status Toggle
  const handleUpdateAgendaStatus = (id: string, status: 'pending' | 'ongoing' | 'completed') => {
    const updated = agendas.map(a => {
      if (a.id === id) return { ...a, status };
      return a;
    });
    setAgendas(updated);
    syncLocalStorage('musyawarah_agendas', updated);
    triggerNotification(`Agenda status diperbarui`, 'info');
  };

  // Delete Agenda Item
  const handleDeleteAgenda = (id: string) => {
    const updated = agendas.filter(a => a.id !== id);
    setAgendas(updated);
    syncLocalStorage('musyawarah_agendas', updated);
  };

  // Add Attendance Citizen e-Sign Check-In
  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttendeeName.trim()) {
      triggerNotification('Nama warga wajib diisi', 'error');
      return;
    }
    if (!newAttendeeNik.trim() || newAttendeeNik.length < 10) {
      triggerNotification('NIK minimal 10 digit angka', 'error');
      return;
    }
    if (!newAttendeeSignature) {
      triggerNotification('Wajib menggoreskan tanda tangan elektronik Anda pada pad di bawah', 'error');
      return;
    }

    const duplicateSessionCheck = activeAttendance.find(a => a.nik === newAttendeeNik);
    if (duplicateSessionCheck) {
      triggerNotification('NIK ini sudah melakukan absensi di rapat ini', 'error');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `attendance-${Date.now()}`,
      sessionId: selectedSessionId,
      name: newAttendeeName,
      nik: newAttendeeNik,
      role: newAttendeeRole,
      phone: newAttendeePhone,
      timestamp: new Date().toISOString(),
      signature: newAttendeeSignature,
    };

    const updated = [...attendance, newRecord];
    setAttendance(updated);
    syncLocalStorage('musyawarah_attendance', updated);

    // Reset Fields
    setNewAttendeeName('');
    setNewAttendeeNik('');
    setNewAttendeePhone('');
    setNewAttendeeSignature('');
    triggerNotification(`Absensi atas nama ${newAttendeeName} berhasil tercatat!`, 'success');
  };

  // Quick Simulation Auto-Filler (Citizen Seeders)
  const handleSimulateAttendance = () => {
    const simulationPool = [
      { name: 'Dr. Ahmad Royan', role: 'Tokoh Pendidikan', phone: '085311223456', signature: DEFAULT_SIGNATURE_PAGES.sudirman },
      { name: 'Ibu Ratnasari', role: 'Ketua Penggerak PKK', phone: '081223405900', signature: DEFAULT_SIGNATURE_PAGES.sri },
      { name: 'Eko Sulistyo', role: 'Ketua RT 02 / RW 04', phone: '085799881122', signature: DEFAULT_SIGNATURE_PAGES.wiryawan },
      { name: 'Siti Aminah', role: 'Kader Posyandu', phone: '081977755333', signature: DEFAULT_SIGNATURE_PAGES.sri }
    ];

    let countFilled = 0;
    const recordsToAdd: AttendanceRecord[] = [];

    simulationPool.forEach((sim, idx) => {
      const mockNik = `3204121510${80 + idx}000${idx + 2}`;
      // Verify duplicate
      if (!activeAttendance.find(at => at.nik === mockNik)) {
        recordsToAdd.push({
          id: `attendance-sim-${Date.now()}-${idx}`,
          sessionId: selectedSessionId,
          name: sim.name,
          nik: mockNik,
          role: sim.role,
          phone: sim.phone,
          timestamp: new Date(Date.now() - (idx * 300000)).toISOString(),
          signature: sim.signature
        });
        countFilled++;
      }
    });

    if (countFilled === 0) {
      triggerNotification('Semua tokoh simulasi sudah terdaftar dalam absensi.', 'info');
      return;
    }

    const updated = [...attendance, ...recordsToAdd];
    setAttendance(updated);
    syncLocalStorage('musyawarah_attendance', updated);
    triggerNotification(`Berhasil mensimulasikan ${countFilled} kehadiran warga secara instan`, 'success');
  };

  // Delete Attendance Record
  const handleDeleteAttendance = (id: string) => {
    const updated = attendance.filter(a => a.id !== id);
    setAttendance(updated);
    syncLocalStorage('musyawarah_attendance', updated);
  };

  // --- MINUTES EDITING FUNCTIONS ---

  // Save General Notulen Summary Description
  const handleSaveSummaryDescription = (sum: string) => {
    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    let updated = [...minutes];

    if (sessionMinIndex >= 0) {
      updated[sessionMinIndex] = { ...updated[sessionMinIndex], summary: sum };
    } else {
      updated.push({
        sessionId: selectedSessionId,
        summary: sum,
        discussionPoints: [],
        actionItems: []
      });
    }
    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
    triggerNotification('Ringkasan jalannya rapat disimpan', 'success');
  };

  // Add Discussion Point Bullet
  const handleAddDiscussionPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionPoint.trim()) return;

    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    let updated = [...minutes];

    if (sessionMinIndex >= 0) {
      const currentPoints = updated[sessionMinIndex].discussionPoints || [];
      updated[sessionMinIndex] = {
        ...updated[sessionMinIndex],
        discussionPoints: [...currentPoints, newDiscussionPoint.trim()]
      };
    } else {
      updated.push({
        sessionId: selectedSessionId,
        summary: 'Hasil rapat musyawarah.',
        discussionPoints: [newDiscussionPoint.trim()],
        actionItems: []
      });
    }

    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
    setNewDiscussionPoint('');
    triggerNotification('Catatan diskusi ditambahkan', 'success');
  };

  // Remove Discussion Point Bullet
  const handleRemoveDiscussionPoint = (indexToRemove: number) => {
    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    if (sessionMinIndex === -1) return;

    let updated = [...minutes];
    const currentPoints = updated[sessionMinIndex].discussionPoints || [];
    updated[sessionMinIndex] = {
      ...updated[sessionMinIndex],
      discussionPoints: currentPoints.filter((_, idx) => idx !== indexToRemove)
    };

    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
  };

  // Add Action Item Row
  const handleAddActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTask.trim() || !newActionPic.trim()) {
      triggerNotification('Tugas dan PIC tidak boleh kosong', 'error');
      return;
    }

    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    let updated = [...minutes];

    const newItem = {
      id: `act-${Date.now()}`,
      task: newActionTask,
      pic: newActionPic,
      deadline: newActionDeadline || 'Sesuai Arahan Kades'
    };

    if (sessionMinIndex >= 0) {
      const currentActions = updated[sessionMinIndex].actionItems || [];
      updated[sessionMinIndex] = {
        ...updated[sessionMinIndex],
        actionItems: [...currentActions, newItem]
      };
    } else {
      updated.push({
        sessionId: selectedSessionId,
        summary: 'Hasil rapat',
        discussionPoints: [],
        actionItems: [newItem]
      });
    }

    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
    setNewActionTask('');
    setNewActionPic('');
    setNewActionDeadline('');
    triggerNotification('Rencana tindak lanjut berhasil ditambahkan', 'success');
  };

  // Delete Action Item
  const handleDeleteActionItem = (itemId: string) => {
    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    if (sessionMinIndex === -1) return;

    let updated = [...minutes];
    const currentActions = updated[sessionMinIndex].actionItems || [];
    updated[sessionMinIndex] = {
      ...updated[sessionMinIndex],
      actionItems: currentActions.filter(act => act.id !== itemId)
    };

    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
  };

  // Load Presets templates based on meeting types
  const handleLoadTemplate = (templateType: 'pembangunan' | 'sosial' | 'anggaran') => {
    const sessionMinIndex = minutes.findIndex(m => m.sessionId === selectedSessionId);
    let updated = [...minutes];

    let summaryText = '';
    let points: string[] = [];
    let actions: any[] = [];

    if (templateType === 'pembangunan') {
      summaryText = 'Fokus musyawarah membahas pengerjaan drainase, rencana pengaspalan jalan raya dan rehab sarana rukun tetangga.';
      points = [
        'Mendengar aspirasi ketua rukun tetangga atas keluhan saluran drainase mampet yang sering banjir.',
        'Warga menyepakati pemberian ganti rugi tanah sekedarnya bagi proyek pelebaran jalan utama.',
        'Memasukkan alokasi sewa mesin paving jalan sebagai swadaya mandiri warga bergotong royong.'
      ];
      actions = [
        { id: `act-temp-1`, task: 'Koordinasikan dengan Dinas PU Kabupaten untuk survei aspal', pic: 'Kaur Pembangunan', deadline: '2026-06-15' },
        { id: `act-temp-2`, task: 'Rapat RT internal untuk kesiapan tenaga kerja swadaya', pic: 'Seluruh Ketua RT Dusun II', deadline: '2026-06-03' }
      ];
    } else if (templateType === 'sosial') {
      summaryText = 'Sosialisasi pengumpulan zakat, pembagian beras subsidi bulanan, serta kepedulian bupati jaminan kesehatan warga miskin.';
      points = [
        'Penyampaian kriteria jaminan BPJS PBI gratis dari kas program kabupaten.',
        'Warga memohon pengawasan ketat aparat desa pada pembagian beras Bulog agar tidak salah sasaran.',
        'Pembentukan panitia peduli lansia terlantar didanai patungan khas warga sukarela.'
      ];
      actions = [
        { id: `act-temp-3`, task: 'Kirim revisi daftar penerima jaminan sosial warga ke Dinsos', pic: 'Sekdes & Staf Kesejahteraan', deadline: '2026-06-10' }
      ];
    } else {
      summaryText = 'Laporan audit kas pembangunan dari bendahara desa perihal evaluasi triwulan dan transparansi penggunaan dana bagi hasil.';
      points = [
        'Bendahara membacakan rincian sisa lebih pembiayaan anggaran desa yang belum terpakai.',
        'Pemberian masukan pemanfaatan modal Badan Usaha Milik Desa (BUMDes) di bidang pembibitan mangga klonal.',
        'Konsolidasi proposal dari BPD mengenai evaluasi efektivitas pelatihan komputer pamong desa.'
      ];
      actions = [
        { id: `act-temp-4`, task: 'Publikasi infografis realisasi dana di baliho balai desa', pic: 'Kaur Keuangan & operator IT', deadline: '2026-06-05' }
      ];
    }

    const loadedRecord = {
      sessionId: selectedSessionId,
      summary: summaryText,
      discussionPoints: points,
      actionItems: actions
    };

    if (sessionMinIndex >= 0) {
      updated[sessionMinIndex] = loadedRecord;
    } else {
      updated.push(loadedRecord);
    }

    setMinutes(updated);
    syncLocalStorage('musyawarah_minutes', updated);
    triggerNotification('Templat Notulen khas Desa berhasil dimuat!', 'success');
  };

  // --- DECISIONS OPERATIONS ---

  // Add Decision
  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecisionTitle.trim() || !newDecisionDescription.trim()) {
      triggerNotification('Judul dan rincian keputusan wajib diisi', 'error');
      return;
    }

    const isVoteMethod = newDecisionMethod === 'Voting';
    const totalVotes = newDecisionVotesAgree + newDecisionVotesDisagree + newDecisionVotesAbstain;

    if (isVoteMethod && totalVotes === 0) {
      triggerNotification('Untuk metode Voting, mohon isi hasil suara peserta rapat', 'error');
      return;
    }

    const newDec: DecisionRecord = {
      id: `decision-${Date.now()}`,
      sessionId: selectedSessionId,
      title: newDecisionTitle,
      description: newDecisionDescription,
      method: newDecisionMethod,
      votes: isVoteMethod ? {
        agree: newDecisionVotesAgree,
        disagree: newDecisionVotesDisagree,
        abstain: newDecisionVotesAbstain
      } : undefined,
      status: 'Disahkan'
    };

    const updated = [...decisions, newDec];
    setDecisions(updated);
    syncLocalStorage('musyawarah_decisions', updated);

    // Reset Fields
    setNewDecisionTitle('');
    setNewDecisionDescription('');
    setNewDecisionVotesAgree(0);
    setNewDecisionVotesDisagree(0);
    setNewDecisionVotesAbstain(0);
    triggerNotification('Keputusan baru telah disahkan dalam forum', 'success');
  };

  // Simulate Instant Democractic Voting Roll
  const handleSimulateVoting = () => {
    if (activeAttendance.length < 2) {
      triggerNotification('Harap isi absensi minimal dengan 2 warga (atau tekan "Isi Warga Instan") untuk simulasi voting!', 'error');
      return;
    }
    setIsVotingSimulating(true);
    triggerNotification('Menghitung suara kolektif warga...', 'info');

    setTimeout(() => {
      const attendeesCount = activeAttendance.length;
      // Distribute votes randomly across attendees
      const agree = Math.floor(Math.random() * (attendeesCount - 1)) + 1;
      const disagree = Math.floor(Math.random() * (attendeesCount - agree));
      const abstain = attendeesCount - agree - disagree;

      setNewDecisionVotesAgree(agree);
      setNewDecisionVotesDisagree(disagree);
      setNewDecisionVotesAbstain(abstain);
      setIsVotingSimulating(false);
      triggerNotification('Suara digital terkalkulasi!', 'success');
    }, 1200);
  };

  const handleDeleteDecision = (id: string) => {
    const updated = decisions.filter(d => d.id !== id);
    setDecisions(updated);
    syncLocalStorage('musyawarah_decisions', updated);
    triggerNotification('Butir keputusan dihapus', 'info');
  };


  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-emerald-700 selection:text-white antialiased" id="main-applet-root">
      
      {/* Background Decor (Geometric subtle grid lines/mesh instead of fuzzy glows) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* --- NOTIFICATION FLOATER --- */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg px-4 py-3 shadow-neo flex items-center gap-2.5 max-w-sm w-full border ${
              notification.type === 'success'
                ? 'bg-emerald-950 text-emerald-300 border-2 border-emerald-500'
                : notification.type === 'error'
                ? 'bg-red-955 text-red-350 border-2 border-red-500'
                : 'bg-slate-900 text-sky-300 border-2 border-slate-700'
            }`}
            id="notification-floater"
          >
            <div className={`w-2 h-2 rounded-none shrink-0 ${notification.type === 'success' ? 'bg-emerald-400' : notification.type === 'error' ? 'bg-red-500' : 'bg-sky-400'}`} />
            <span className="text-xs font-semibold tracking-tight">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- APP BAR --- */}
      <header className="border-b-2 border-slate-900 bg-[#0c1220] sticky top-0 z-30 shadow-sm" id="main-app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg border-2 border-slate-800">
              <Landmark size={20} className="stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-display uppercase">
                  E-Musyawarah
                </h1>
                <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-wide uppercase">DESA MAKMUR JAYA</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans tracking-wide">Sistem Portabilitas Musyawarah Desa Mutakhir & Tanda Tangan Elektronik Sah</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowCreateSession(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-md text-xs font-bold font-display shadow-neo-emerald border border-slate-900 transition-all duration-150 active:translate-y-1 active:shadow-none"
              id="btn-header-open-session"
            >
              <Plus size={14} className="stroke-[2.5]" /> Musyawarah Baru
            </button>
            <button
              onClick={() => {
                if (activeSession) {
                  setShowReport(true);
                } else {
                  triggerNotification('Harap buat atau pilih musyawarah terlebih dahulu', 'error');
                }
              }}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 hover:border-emerald-500 text-emerald-400 px-3.5 py-1.5 rounded-md text-xs font-bold font-display transition duration-150"
              id="btn-header-view-report"
            >
              <FileText size={14} /> Berita Acara
            </button>
          </div>
        </div>
      </header>

      {/* --- CORE WORKSPACE LAYOUT --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6" id="main-workspace-grid">
        
        {/* LEFT COLUMN: SESSIONS LIST (PILIH RAPAT) */}
        <section className="lg:col-span-4 space-y-5" id="section-sessions-lobby">
          <div className="bg-[#0b101d] border-2 border-slate-900 rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-900">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-display">
                <FolderOpen size={13} className="text-emerald-500" />
                Daftar Musyawarah
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 px-2.5 py-0.5 border border-slate-800 rounded font-bold">
                {sessions.length} Sidang
              </span>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1" id="sessions-scroll-list">
              {sessions.map((s) => {
                const isSelected = s.id === selectedSessionId;
                const isActive = s.status === 'active';
                const isFinished = s.status === 'finished';

                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSessionId(s.id);
                      setActiveTab('agenda');
                    }}
                    className={`p-4 rounded-md border-2 text-left cursor-pointer transition duration-150 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-neo-slate'
                        : 'bg-slate-950/40 border-slate-900 hover:bg-slate-900 hover:border-slate-800'
                    }`}
                    id={`session-card-${s.id}`}
                  >
                    {/* Visual left bar selection indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition ${isSelected ? 'bg-emerald-500' : 'bg-transparent'}`} />

                    <div className="flex items-start justify-between gap-1.5">
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded leading-none ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800 animate-pulse'
                          : isFinished
                          ? 'bg-slate-900 text-slate-400 border border-slate-850'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-805'
                      }`}>
                        {s.status === 'active' ? '● Aktif' : s.status === 'finished' ? 'Selesai' : 'Konsep'}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono tracking-wider bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850" title="Kategori Rapat">
                        {s.category.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="font-bold text-xs font-display text-white mt-3 group-hover:text-emerald-400 transition leading-snug">
                      {s.title}
                    </h3>

                    <div className="mt-4 space-y-1.5 text-[10px] text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar size={11} className="text-slate-500 shrink-0" />
                        <span>{s.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={11} className="text-slate-500 shrink-0" />
                        <span className="truncate">{s.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={11} className="text-slate-500 shrink-0" />
                        <span className="font-semibold text-emerald-400">
                          {attendance.filter(at => at.sessionId === s.id).length} Warga Terabsen
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                      <p className="text-[9px] text-slate-500 font-mono italic truncate max-w-[150px]">
                        Pimpinan: {s.leader.split(',')[0]}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(s.id);
                        }}
                        className="p-1 text-slate-600 hover:text-red-400 hover:bg-slate-900 rounded border border-transparent hover:border-slate-800 transition"
                        title="Hapus musyawarah"
                        id={`btn-del-session-${s.id}`}
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {sessions.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-slate-900 rounded-md bg-slate-950/20" id="empty-lobby-graphic">
                  <Landmark size={24} className="mx-auto text-slate-600 mb-2" />
                  <p className="text-xs text-slate-500 font-mono">Belum ada agenda terdaftar.</p>
                  <button
                    onClick={() => setShowCreateSession(true)}
                    className="mt-4 inline-flex items-center gap-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] px-3 py-1.5 rounded border border-emerald-500/20"
                  >
                    Tambah Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* QUICK TUTORIAL BLOCK */}
          <div className="bg-[#0b101d] border-2 border-slate-900 rounded-lg p-5 text-xs space-y-3">
            <h4 className="font-bold text-slate-300 flex items-center gap-1.5 font-display uppercase tracking-wider text-xs border-b border-slate-900 pb-2">
              <HelpCircle size={13.5} className="text-emerald-500" /> Regulasi Alur Kerja:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-400 text-[11px] font-mono leading-relaxed pl-0.5">
              <li>Pilih/Buat forum <strong className="text-slate-300">Musyawarah Baru</strong>.</li>
              <li>Statuskan urutan topik di tab <strong className="text-slate-350">Agenda</strong>.</li>
              <li>Sediakan pad penandatanganan di <strong className="text-slate-350">Absensi</strong>.</li>
              <li>Isi poin perundingan & tugas pada <strong className="text-slate-335">Notulen</strong>.</li>
              <li>Formula mufakat/voting pada <strong className="text-slate-335">Keputusan</strong>.</li>
              <li>Unduh berkas mufakat di <strong className="text-slate-335">Berita Acara</strong> resmi.</li>
            </ol>
          </div>
        </section>

        {/* RIGHT COLUMN: DETAILED SESSION ACTIVE WORKSPACE */}
        <section className="lg:col-span-8 flex flex-col" id="section-session-detail-workspace">
          {activeSession ? (
            <div className="bg-[#0b101d] border-2 border-slate-900 rounded-lg overflow-hidden flex-1 flex flex-col shadow-sm">
              
              {/* Active Workshop Banner */}
              <div className="bg-slate-950/40 border-b-2 border-slate-900 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 font-mono">
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded uppercase font-bold tracking-wider">
                        Sesi {activeSession.status === 'active' ? 'Aktif' : 'Selesai'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold tracking-wider">
                        {activeSession.category}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-white font-display uppercase tracking-tight">
                      {activeSession.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeSession.status === 'active' ? (
                      <button
                        onClick={() => handleCompleteSession(activeSession.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white border border-slate-900 px-3.5 py-1.5 rounded-md text-xs font-bold font-display shadow-neo-emerald transition-all duration-150 active:translate-y-0.5 active:shadow-none"
                        id="btn-workspace-finish-session"
                      >
                        Tutup Rapat
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopenSession(activeSession.id)}
                        className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-md text-xs font-semibold font-display transition"
                        id="btn-workspace-reopen-session"
                      >
                        Aktifkan Sesi
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowReport(true)}
                      className="bg-slate-900 hover:bg-slate-800 border-2 border-slate-805 text-emerald-400 px-3 py-1.5 rounded-md text-xs font-semibold font-display transition"
                      id="btn-workspace-quick-report"
                    >
                      Hasil Dokumen
                    </button>
                  </div>
                </div>

                {/* Sub Metadata Info strip */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[10px] text-slate-450 mt-4.5 pt-3.5 border-t border-slate-900 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-slate-600" />
                    <span>TANGGAL: {activeSession.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-600" />
                    <span>WAKTU: {activeSession.time}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <MapPin size={13} className="text-slate-600 translate-y-[0.5px]" />
                    <span className="truncate">LOKASI: {activeSession.location}</span>
                  </div>
                </div>
              </div>

              {/* Workspace Navigation Tabs (Sharp rectangle block border with nice alignment) */}
              <div className="border-b-2 border-slate-900 bg-slate-950/60 flex px-1 overflow-x-auto gap-1" id="workspace-tabs-bar">
                {[
                  { id: 'agenda', label: 'AGENDA KERJA', count: activeAgendas.length, icon: CheckSquare },
                  { id: 'attendance', label: 'ABSENSI WARGA', count: activeAttendance.length, icon: UserCheck },
                  { id: 'minutes', label: 'NOTULEN DIGITAL', count: activeMinutes.discussionPoints?.length || 0, icon: FileText },
                  { id: 'decisions', label: 'KEPUTUSAN', count: activeDecisions.length, icon: Vote }
                ].map((tb) => {
                  const Icon = tb.icon;
                  const isCur = activeTab === tb.id;
                  return (
                    <button
                      key={tb.id}
                      onClick={() => setActiveTab(tb.id as any)}
                      className={`py-3.5 px-4 text-xs font-bold font-display border-b-2 flex items-center gap-2 whitespace-nowrap transition duration-150 ${
                        isCur
                          ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
                          : 'border-transparent text-slate-550 hover:text-slate-300 hover:bg-slate-900/10'
                      }`}
                      id={`tab-button-${tb.id}`}
                    >
                      <Icon size={14} className={isCur ? 'text-emerald-400' : 'text-slate-600'} />
                      <span>{tb.label}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${isCur ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-500 border border-slate-850'}`}>
                        {tb.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Workspace Active Panels */}
              <div className="p-5 flex-1 bg-slate-950/10" id="workspace-viewports">
                               {/* --- PANELS 1: AGENDA --- */}
                {activeTab === 'agenda' && (
                  <div className="space-y-6" id="panel-agenda-workspace">
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight font-display">Agenda Sidang & Lini Waktu</h3>
                        <p className="text-[11px] text-slate-450 mt-0.5">Kelola transisi status pembahasan setiap pokok acara secara berkala.</p>
                      </div>
                      
                      <span className="text-[10px] text-emerald-400 font-mono bg-slate-950/80 border border-slate-900 px-3 py-1 rounded font-bold">
                        TOTAL: {activeAgendas.length} TOPIK
                      </span>
                    </div>

                    {/* Timeline lists */}
                    <div className="space-y-3">
                      {activeAgendas.map((ag) => (
                        <div
                          key={ag.id}
                          className={`p-4 rounded-lg border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-155 ${
                            ag.status === 'ongoing'
                              ? 'bg-slate-950 border-emerald-500 shadow-neo-emerald'
                              : ag.status === 'completed'
                              ? 'bg-slate-950/20 border-slate-950 opacity-60 border-dashed'
                              : 'bg-slate-950/40 border-slate-900'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded shrink-0 uppercase font-bold tracking-wider leading-none mt-0.5 ${
                              ag.status === 'ongoing'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : ag.status === 'completed'
                                ? 'bg-slate-900 text-slate-500 border border-slate-850'
                                : 'bg-slate-900 text-slate-400 border border-slate-850 animate-pulse'
                            }`}>
                              {ag.status === 'ongoing' ? '● BERLANGSUNG' : ag.status === 'completed' ? 'SELESAI' : 'PENDING'}
                            </span>

                            <div>
                              <p className="text-xs font-bold text-white leading-snug">{ag.topic}</p>
                              <div className="flex items-center gap-3.5 text-[10px] text-slate-450 font-mono mt-1.5">
                                <span>MODERATOR: <strong className="text-slate-300">{ag.speaker}</strong></span>
                                <span>•</span>
                                <span>ALOKASI DURASI: <strong className="text-emerald-450">{ag.duration}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                            {/* Toggle buttons to switch statuses */}
                            <select
                              value={ag.status}
                              onChange={(e) => handleUpdateAgendaStatus(ag.id, e.target.value as any)}
                              className="bg-slate-900 text-[11px] text-slate-300 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                              id={`select-status-agenda-${ag.id}`}
                            >
                              <option value="pending">Tertunda</option>
                              <option value="ongoing">Sedang Dibahas</option>
                              <option value="completed">Selesai Dibahas</option>
                            </select>

                            <button
                              onClick={() => handleDeleteAgenda(ag.id)}
                              className="p-2 text-slate-500 hover:text-red-400 bg-slate-900 border border-slate-800 hover:border-red-950 rounded transition"
                              title="Hapus topik agenda"
                              id={`btn-del-agenda-${ag.id}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {activeAgendas.length === 0 && (
                        <div className="text-center py-12 bg-slate-950/20 rounded-lg border-2 border-dashed border-slate-900">
                          <CheckSquare size={32} className="mx-auto text-slate-700 mb-2.5" />
                          <p className="text-xs text-slate-500 font-mono">Belum ada pokok agenda rapat yang ditambahkan.</p>
                        </div>
                      )}
                    </div>

                    {/* Quick Add Agenda Form */}
                    <form onSubmit={handleAddAgenda} className="bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg space-y-4" id="form-add-agenda">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display border-b border-slate-900 pb-2">
                        Tambah Topik Bahasan Baru
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Nama Topik Rapat</label>
                          <input
                            type="text"
                            value={newAgendaTopic}
                            onChange={(e) => setNewAgendaTopic(e.target.value)}
                            placeholder="Contoh: Pembasahan Papan Slogan RT"
                            className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-600 font-medium"
                            id="input-agenda-topic"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Narasumber / PIC</label>
                          <input
                            type="text"
                            value={newAgendaSpeaker}
                            onChange={(e) => setNewAgendaSpeaker(e.target.value)}
                            placeholder="Contoh: Pak RT 01"
                            className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-600 font-medium"
                            id="input-agenda-speaker"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Estimasi</label>
                          <select
                            value={newAgendaDuration}
                            onChange={(e) => setNewAgendaDuration(e.target.value)}
                            className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-2.5 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none font-mono cursor-pointer"
                            id="select-agenda-dur"
                          >
                            <option value="15 Menit">15 Menit</option>
                            <option value="30 Menit">30 Menit</option>
                            <option value="45 Menit">45 Menit</option>
                            <option value="60 Menit">60 Menit</option>
                            <option value="90 Menit">90 Menit</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 flex items-end">
                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 border-2 border-slate-800 hover:border-emerald-500/50 text-slate-300 text-xs py-2 rounded font-bold font-display transition duration-150 flex items-center justify-center gap-1.5"
                            id="btn-agenda-submit"
                          >
                            <Plus size={14} className="stroke-[2.5]" /> TAMBAH
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* --- PANELS 2: ATTENDANCE & ELECTRONIC SIGNATURES --- */}
                {activeTab === 'attendance' && (
                  <div className="space-y-6" id="panel-attendance-workspace">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#0b101d] p-4.5 border-2 border-slate-900 rounded-lg">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight font-display">Mesin Absensi Mandiri & Tanda Tangan Warga</h3>
                        <p className="text-[11px] text-slate-450 mt-0.5">Masyarakat, pamong desa, dan delegasi dapat mengkonfirmasi kehadiran dengan tanda tangan digital resmi.</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={handleSimulateAttendance}
                          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-amber-400 px-3 py-1.5 rounded-md text-xs font-bold font-display transition duration-155"
                          id="btn-fill-attendees-quick"
                        >
                          <Sparkles size={13} className="text-amber-400" /> Isi Warga Instan
                        </button>
                        <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-900 px-3 py-1.5 rounded font-bold uppercase tracking-wider">
                          {activeAttendance.length} HADIR
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Input Form with Pad */}
                      <div className="lg:col-span-5 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg" id="attendance-block-form-container">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 border-b border-slate-900 pb-2.5 font-display">
                          Formulir Kehadiran Digital
                        </h4>
                        
                        <form onSubmit={handleAddAttendance} className="space-y-4" id="form-attendance-pad">
                          <div>
                            <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Nama Lengkap & Gelar</label>
                            <input
                              type="text"
                              value={newAttendeeName}
                              onChange={(e) => setNewAttendeeName(e.target.value)}
                              placeholder="Contoh: Sudjatmiko, S.E."
                              className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-650"
                              required
                              id="input-attendee-name"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[10px] text-slate-455 font-mono uppercase tracking-wider mb-1.5 font-semibold">16-Digit NIK</label>
                              <input
                                type="text"
                                maxLength={16}
                                value={newAttendeeNik}
                                onChange={(e) => setNewAttendeeNik(e.target.value.replace(/\D/g, ''))}
                                placeholder="NIK Warga"
                                className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-650 font-mono"
                                required
                                id="input-attendee-nik"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-455 font-mono uppercase tracking-wider mb-1.5 font-semibold">Jabatan / Utusan</label>
                              <select
                                value={newAttendeeRole}
                                onChange={(e) => setNewAttendeeRole(e.target.value)}
                                className="w-full bg-slate-900 text-slate-300 border border-slate-800 rounded px-2.5 py-1.8 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none cursor-pointer font-sans"
                                id="select-attendee-role"
                              >
                                <option value="Warga Dusun I">Warga Dusun I</option>
                                <option value="Warga Dusun II">Warga Dusun II</option>
                                <option value="Warga Dusun III">Warga Dusun III</option>
                                <option value="Lembaga Pemberdayaan Masyarakat (LPM)">Lembaga LPM</option>
                                <option value="Kader PKK / Posyandu">Ibu PKK / Posyandu</option>
                                <option value="Badan Permusyawaratan Desa (BPD)">Utusan BPD</option>
                                <option value="Kepala Dusun / Perangkat">Kepala Dusun / RT / RW</option>
                                <option value="Pamong Desa Utama font-bold">Pamong Desa Utama</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-455 font-mono uppercase tracking-wider mb-1.5 font-semibold">Nomor WA / HP (Opsional)</label>
                            <input
                              type="text"
                              value={newAttendeePhone}
                              onChange={(e) => setNewAttendeePhone(e.target.value)}
                              placeholder="081********"
                              className="w-full bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-650 font-mono"
                              id="input-attendee-phone"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 flex items-center justify-between font-semibold">
                              <span>Bubuhkan Tanda Tangan Basah</span>
                              <span className="text-[9px] text-amber-500 font-bold">*Wajib digores jelas</span>
                            </label>
                            
                            <SignatureCanvas
                              onSave={(data) => setNewAttendeeSignature(data)}
                              placeholder="Goreskan tanda tangan menggunakan mouse atau layar sentuh"
                              onClear={() => setNewAttendeeSignature('')}
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2.5 text-xs font-bold font-display shadow-neo-emerald border border-slate-900 tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-none mt-2"
                            id="btn-attendance-submit"
                          >
                            <PenTool size={14} className="stroke-[2.5]" /> KIRIM ABSENSI SEKARANG
                          </button>
                        </form>
                      </div>

                      {/* Right: Live List of Participants */}
                      <div className="lg:col-span-7 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg flex flex-col" id="attendance-block-list-container">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center justify-between border-b border-slate-900 pb-2.5 font-display">
                          <span>Daftar Hadir Terverifikasi</span>
                          <span className="text-[10px] text-slate-550 font-mono">TAMPIL: {activeAttendance.length} ORANG</span>
                        </h4>

                        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 flex-1" id="attendees-scroll-list">
                          {activeAttendance.map((at) => (
                            <div key={at.id} className="p-3 bg-slate-950/40 rounded-md border border-slate-900 flex items-center justify-between gap-3 group hover:border-slate-800 transition">
                              <div className="flex items-center gap-3.5 min-w-0">
                                {/* Signature display circle */}
                                <div className="w-12 h-12 bg-white rounded border border-slate-900 flex items-center justify-center p-1 overflow-hidden shrink-0">
                                  {at.signature.startsWith('data:image') ? (
                                    <img src={at.signature} alt="Sign" className="max-h-full max-w-full object-contain filter contrast-125" referrerPolicy="no-referrer" />
                                  ) : (
                                    <span className="text-[8px] font-mono uppercase font-extrabold text-slate-800 text-center truncate leading-none">
                                      {at.name[0]} E-Tt
                                    </span>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <h5 className="text-xs font-bold text-white truncate" title={at.name}>
                                    {at.name}
                                  </h5>
                                  <p className="text-[10px] text-emerald-400 font-mono tracking-wide mt-0.5">{at.role}</p>
                                  <div className="flex items-center gap-2 text-[9px] text-slate-550 font-mono mt-1">
                                    <span>NIK: {at.nik.substring(0, 6)}******</span>
                                    <span>•</span>
                                    <span>{new Date(at.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteAttendance(at.id)}
                                className="p-1.8 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 border border-transparent hover:border-slate-850 hover:bg-slate-950 rounded transition"
                                title="Keluarkan absensi"
                                id={`btn-del-attendee-${at.id}`}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}

                          {activeAttendance.length === 0 && (
                            <div className="text-center py-16 text-slate-500 flex flex-col items-center justify-center h-full" id="empty-attendee-art">
                              <Users size={32} className="mb-2 text-slate-700" />
                              <p className="text-xs font-mono">Belum ada warga yang mengabsensi.</p>
                              <p className="text-[10px] text-slate-655 mt-1.5 max-w-xs leading-relaxed font-sans">Delegasi rapat dipersilakan untuk memasukkan kredensial dan menandatangani daftar hadir digital.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- PANELS 3: MINUTES OF MEETINGS --- */}
                {activeTab === 'minutes' && (
                  <div className="space-y-6" id="panel-minutes-workspace">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0b101d] p-4.5 border-2 border-slate-900 rounded-lg" id="minutes-dashboard-banner">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight font-display">Notulen Digital & Berita Acara Rapat</h3>
                        <p className="text-[11px] text-slate-450 mt-0.5 flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-emerald-500" /> Sinkronisasi naskah berita acara berlangsung live & otomatis.
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {/* Auto template picker templates */}
                        <span className="text-[10px] text-slate-450 font-mono uppercase tracking-wider font-semibold">Gunakan Templat:</span>
                        <div className="inline-flex gap-1 bg-slate-900 p-0.5 border border-slate-800 rounded">
                          <button
                            onClick={() => handleLoadTemplate('pembangunan')}
                            className="bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-emerald-300 text-[10px] px-2.5 py-1 rounded border border-transparent font-medium transition cursor-pointer"
                            id="btn-tem-pemb"
                          >
                            Infra
                          </button>
                          <button
                            onClick={() => handleLoadTemplate('sosial')}
                            className="bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-emerald-300 text-[10px] px-2.5 py-1 rounded border border-transparent font-medium transition cursor-pointer"
                            id="btn-tem-sos"
                          >
                            Sosial
                          </button>
                          <button
                            onClick={() => handleLoadTemplate('anggaran')}
                            className="bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-emerald-300 text-[10px] px-2.5 py-1 rounded border border-transparent font-medium transition cursor-pointer"
                            id="btn-tem-ang"
                          >
                            Audit
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: General Summary Formulation */}
                      <div className="lg:col-span-5 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 border-b border-slate-900 pb-2 font-display">
                            Rangkuman Umum Sidang
                          </h4>
                          <textarea
                            value={activeMinutes.summary}
                            onChange={(e) => handleSaveSummaryDescription(e.target.value)}
                            rows={4}
                            placeholder="Tuliskan latar belakang, esensi utama, atau jalannya musyawarah secara menyeluruh di sini..."
                            className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded p-3 focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-slate-650 leading-relaxed font-sans"
                            id="textarea-minutes-summary"
                          />
                          <p className="text-[9px] text-slate-550 font-mono text-right mt-1.5">*Perubahan teks akan langsung tersimpan</p>
                        </div>

                        {/* Form Agenda Tindak Lanjut (Action Items) */}
                        <form onSubmit={handleAddActionItem} className="border-t border-slate-900 pt-4 space-y-3.5" id="form-action-step">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 border-b border-slate-900 pb-2 inline-block font-display">
                            Tambah Tindak Lanjut (Action Item)
                          </h4>
                          
                          <div>
                            <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1 font-semibold">Tugas / Butir Pekerjaan</label>
                            <input
                              type="text"
                              value={newActionTask}
                              onChange={(e) => setNewActionTask(e.target.value)}
                              placeholder="Contoh: Mengurus pencairan dana tahap I"
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.8 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650"
                              id="input-action-task"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-35">
                            <div>
                              <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1 font-semibold">Penanggung Jawab (PIC)</label>
                              <input
                                type="text"
                                value={newActionPic}
                                onChange={(e) => setNewActionPic(e.target.value)}
                                placeholder="Contoh: Bendahara Desa"
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.8 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650"
                                id="input-action-pic"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1 font-semibold">Tenggat Waktu</label>
                              <input
                                type="date"
                                value={newActionDeadline}
                                onChange={(e) => setNewActionDeadline(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.8 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                id="input-action-deadline"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-855 hover:text-emerald-400 border-2 border-slate-800 hover:border-emerald-500 text-slate-350 font-bold py-2 px-3 rounded text-xs transition duration-155 flex items-center justify-center gap-1.5 font-display"
                            id="btn-action-submit"
                          >
                            <Plus size={14} className="stroke-[2.5]" /> SIMPAN PEKERJAAN
                          </button>
                        </form>
                      </div>

                      {/* Right: Live List of Discussion Points & Action Tables */}
                      <div className="lg:col-span-7 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg space-y-6 flex flex-col justify-start">
                        
                        {/* Discussion Points Section */}
                        <div className="space-y-3">
                          <form onSubmit={handleAddDiscussionPoint} className="flex flex-wrap items-center justify-between gap-3 mb-1" id="form-discussion">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                              Bahan Musyawarah & Pointer Sidang
                            </h4>
                            <div className="flex gap-2 max-w-sm w-full sm:w-2/3 shrink-0">
                              <input
                                type="text"
                                value={newDiscussionPoint}
                                onChange={(e) => setNewDiscussionPoint(e.target.value)}
                                placeholder="Tambah butir pokok bahasan..."
                                className="bg-slate-900 flex-1 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650"
                                id="input-discussion"
                              />
                              <button
                                type="submit"
                                className="bg-slate-900 hover:bg-slate-800 hover:text-emerald-400 border-2 border-slate-800 hover:border-emerald-500 text-slate-300 rounded px-3 py-1 font-bold text-xs transition font-display"
                                id="btn-discussion-add"
                              >
                                Tambah
                              </button>
                            </div>
                          </form>

                          {/* List of Discussion Points */}
                          <div className="space-y-2 bg-slate-950/40 p-4 rounded-md border border-slate-900 max-h-[22vh] overflow-y-auto">
                            {activeMinutes.discussionPoints && activeMinutes.discussionPoints.length > 0 ? (
                              activeMinutes.discussionPoints.map((point, index) => (
                                <div key={index} className="flex items-start justify-between gap-2.5 py-2 border-b border-slate-900 last:border-0 group">
                                  <p className="text-xs text-slate-300 leading-relaxed pl-2 border-l-2 border-emerald-500 font-sans">
                                    {point}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveDiscussionPoint(index)}
                                    className="p-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 bg-slate-950 border border-transparent hover:border-slate-850 rounded transition shrink-0"
                                    title="Hapus baris catatan"
                                    id={`btn-del-point-${index}`}
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-center py-5 text-xs font-mono text-slate-550 italic">- Belum ada butir bahasan terekam -</p>
                            )}
                          </div>
                        </div>

                        {/* Action items checklist table */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                            Daftar Tugas & Rencana Kerja Tindak Lanjut
                          </h4>
                          <div className="overflow-x-auto border border-slate-900 rounded-md">
                            <table className="w-full text-left text-xs text-slate-400 border-collapse">
                              <thead>
                                <tr className="border-b border-slate-900 text-[10px] text-slate-450 font-mono uppercase bg-slate-950/60 font-semibold tracking-wider">
                                  <th className="py-3 px-4">Butir Pekerjaan</th>
                                  <th className="py-3 px-4">Penerima Mandat (PIC)</th>
                                  <th className="py-3 px-3 text-center">Tenggat</th>
                                  <th className="py-3 px-3 text-center">Tindakan</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activeMinutes.actionItems && activeMinutes.actionItems.length > 0 ? (
                                  activeMinutes.actionItems.map((act) => (
                                    <tr key={act.id} className="border-b border-slate-900/60 last:border-0 hover:bg-slate-950/20">
                                      <td className="py-3 px-4 text-slate-200 font-medium leading-relaxed max-w-xs">{act.task}</td>
                                      <td className="py-3 px-4 font-mono text-emerald-400 text-[11px] font-bold uppercase tracking-wide">{act.pic}</td>
                                      <td className="py-3 px-3 text-center text-slate-450 font-mono text-[10px]">{act.deadline}</td>
                                      <td className="py-3 px-3 text-center">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteActionItem(act.id)}
                                          className="p-1.5 text-slate-600 hover:text-red-400 rounded transition"
                                          title="Hapus tindak lanjut"
                                          id={`btn-del-action-${act.id}`}
                                        >
                                          <Trash2 size={11.5} />
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4} className="text-center py-8 text-xs text-slate-550 italic font-mono">- Belum ada rencana kerja tindak lanjut terekam -</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- PANELS 4: DECISIONS & VOTING --- */}
                {activeTab === 'decisions' && (
                  <div className="space-y-6" id="panel-decisions-workspace">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#0b101d] p-4.5 border-2 border-slate-900 rounded-lg" id="decisions-banner">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight font-display font-bold">Surat Keputusan (SK) & Rekapitulasi Suara</h3>
                        <p className="text-[11px] text-slate-450 mt-0.5">Sahkan hasil akhir musyawarah mufakat atau voting suara bulat guna meresmikan keputusan sosial kemasyarakatan.</p>
                      </div>

                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-900 px-3 py-1.5 rounded font-bold uppercase tracking-wider shrink-0">
                        SAH: {activeDecisions.length} KEPUTUSAN
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Decision Draft Form */}
                      <form onSubmit={handleAddDecision} className="lg:col-span-5 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg space-y-4" id="form-add-decision">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 border-b border-slate-900 pb-2.5 font-display">
                          Formulasi Ketetapan Baru
                        </h4>

                        <div>
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Judul Keputusan (SK)</label>
                          <input
                            type="text"
                            value={newDecisionTitle}
                            onChange={(e) => setNewDecisionTitle(e.target.value)}
                            placeholder="Contoh: Pengesahan Anggaran Gapura Dusun 2"
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.8 text-xs text-slate-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650"
                            required
                            id="input-decision-title"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Butir Ketentuan / Amanat</label>
                          <textarea
                            value={newDecisionDescription}
                            onChange={(e) => setNewDecisionDescription(e.target.value)}
                            rows={3}
                            placeholder="Contoh: Menyetujui porsi swadaya 15% dari total anggaran dengan pengerjaan awal Maret..."
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650 font-sans"
                            required
                            id="textarea-decision-desc"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Sistem Pengambilan Keputusan</label>
                          <select
                            value={newDecisionMethod}
                            onChange={(e) => setNewDecisionMethod(e.target.value as any)}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.8 text-xs text-emerald-400 font-bold focus:outline-none font-mono cursor-pointer"
                            id="select-decision-method"
                          >
                            <option value="Mufakat">Mufakat Bulat (Aklamasi)</option>
                            <option value="Voting">Voting (Pemungutan Suara)</option>
                          </select>
                        </div>

                        {newDecisionMethod === 'Voting' && (
                          <div className="bg-slate-950/50 p-4 rounded border border-slate-900 space-y-3.5" id="voting-count-subblock">
                            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide font-display">Rekapitulasi Suara</span>
                              
                              <button
                                type="button"
                                onClick={handleSimulateVoting}
                                disabled={isVotingSimulating}
                                className="bg-slate-900 hover:bg-slate-850 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/50 text-amber-400 text-[10px] px-2.5 py-1 rounded font-bold font-display transition duration-155 disabled:opacity-50 cursor-pointer"
                                id="btn-roll-decision-votes"
                              >
                                {isVotingSimulating ? 'Memvalidasi...' : 'Pindai Suara Warga'}
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-[9px] text-slate-450 font-mono mb-1 text-center font-semibold">SETUJU (YA)</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={newDecisionVotesAgree}
                                  onChange={(e) => setNewDecisionVotesAgree(parseInt(e.target.value) || 0)}
                                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-center text-emerald-450 font-bold font-mono"
                                  id="input-votes-agree"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] text-slate-450 font-mono mb-1 text-center font-semibold">TOLAK (TDK)</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={newDecisionVotesDisagree}
                                  onChange={(e) => setNewDecisionVotesDisagree(parseInt(e.target.value) || 0)}
                                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-center text-red-450 font-bold font-mono"
                                  id="input-votes-disagree"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] text-slate-450 font-mono mb-1 text-center font-semibold">ABSTAIN</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={newDecisionVotesAbstain}
                                  onChange={(e) => setNewDecisionVotesAbstain(parseInt(e.target.value) || 0)}
                                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-center text-slate-400 font-bold font-mono"
                                  id="input-votes-abstain"
                                />
                              </div>
                            </div>
                            
                            <p className="text-[9px] text-slate-550 leading-relaxed font-sans">
                              *Saran: Jumlah seluruh suara disarankan selaras dengan jumlah daftar hadir terdaftar ({activeAttendance.length} warga).
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-2.5 text-xs font-bold font-display shadow-neo-emerald border border-slate-900 tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-none"
                          id="btn-decision-submit"
                        >
                          <CheckCircle size={14} className="stroke-[2.5]" /> SAHKAN & SEBARLUASKAN KETETAPAN
                        </button>
                      </form>

                      {/* Right: Confirmed Decisions Gallery */}
                      <div className="lg:col-span-7 bg-[#0b101d] p-5 border-2 border-slate-900 rounded-lg space-y-4 flex flex-col" id="decisions-gallery-block">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-330 border-b border-slate-900 pb-2.5 font-display">
                          Lembar Ketetapan Resmi Desa (SAH)
                        </h4>

                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 flex-1">
                          {activeDecisions.map((dec, idx) => (
                            <div key={dec.id} className="p-4 bg-slate-950/40 rounded border border-slate-900 hover:border-slate-800 transition flex flex-col justify-between">
                              
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                    <h5 className="text-xs font-bold text-white uppercase tracking-tight font-display">
                                      {idx + 1}. {dec.title}
                                    </h5>
                                  </div>
                                  <p className="text-[9px] text-slate-550 font-mono tracking-wider uppercase">REGISTER: {dec.id.toUpperCase()}</p>
                                </div>

                                <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded shrink-0 uppercase tracking-wider ${
                                  dec.method === 'Mufakat' ? 'bg-[#0a0f1d] text-emerald-400 border border-slate-850' : 'bg-slate-900/40 text-amber-400 border border-slate-850'
                                }`}>
                                  {dec.method}
                                </span>
                              </div>

                              <p className="text-xs text-slate-350 leading-relaxed font-sans mt-3.5 pl-3 border-l-2 border-emerald-500">
                                {dec.description}
                              </p>

                              {dec.method === 'Voting' && dec.votes && (
                                <div className="mt-4 pt-3.5 border-t border-slate-900/80 grid grid-cols-3 gap-2.5 text-center text-[10px] font-mono tracking-wide">
                                  <div className="p-1.5 px-3 rounded bg-emerald-950/20 border border-emerald-900/30 text-emerald-450 font-bold uppercase">
                                    Setuju: {dec.votes.agree}
                                  </div>
                                  <div className="p-1.5 px-3 rounded bg-red-950/20 border border-red-900/30 text-red-450 font-bold uppercase">
                                    Tolak: {dec.votes.disagree}
                                  </div>
                                  <div className="p-1.5 px-3 rounded bg-slate-900 border border-slate-850 text-slate-450 font-bold uppercase">
                                    Abstain: {dec.votes.abstain}
                                  </div>
                                </div>
                              )}

                              <div className="mt-4 flex items-center justify-between text-[9px] text-slate-550 font-mono pt-3 border-t border-slate-900">
                                <span className="uppercase tracking-wider">Ketetapan Hukum: SAH / MENGIKAT SELURUH DELEGASI</span>
                                <button
                                  onClick={() => handleDeleteDecision(dec.id)}
                                  className="text-slate-550 hover:text-red-400 p-1 border border-transparent hover:border-slate-850 hover:bg-slate-950 rounded transition"
                                  title="Batalkan ketetapan"
                                  id={`btn-del-dec-${dec.id}`}
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>

                            </div>
                          ))}

                          {activeDecisions.length === 0 && (
                            <div className="text-center py-16 text-slate-500 flex flex-col items-center justify-center h-full" id="empty-decisions-art">
                              <Award size={32} className="mb-2 text-slate-700 animate-pulse" />
                              <p className="text-xs font-mono">Belum ada keputusan tertulis yang disahkan.</p>
                              <p className="text-[10px] text-slate-655 mt-1.5 max-w-xs leading-relaxed font-sans">Gunakan formulir disamping untuk merumuskan persetujuan mufakat atau menginput perolehan suara.</p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Console status footer */}
              <div className="bg-[#0b101d] border-t-2 border-slate-900 px-5 py-4 text-[10px] text-slate-450 font-mono flex flex-col md:flex-row items-center justify-between gap-3 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Sidang Terkoneksi: <strong className="text-emerald-400 font-bold">DIGITAL HYBRID LOKAL</strong>
                </span>
                <span>NIK warga divalidasi lokal melalui Algoritma Integritas Tanda Tangan Elektronik</span>
                <span>Sinar Raya E-Gov v2.4</span>
              </div>

            </div>
          ) : (
            <div className="bg-[#0b101d] border-2 border-slate-900 border-dashed rounded-lg flex-1 flex flex-col items-center justify-center text-center p-12 min-h-[55vh]" id="empty-selected-session">
              <Landmark size={48} className="text-slate-750 mb-4 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display font-bold">Gerbang Sistem E-Musyawarah</h3>
              <p className="text-xs text-slate-450 mt-2 max-w-sm leading-relaxed">
                Platform administrasi mufakat desa yang transparan, aman, dan bersertifikat tanda tangan elektronik mandiri. Silakan pilih sidang aktif di panel sebelah kiri atau daftarkan agenda rapat baru.
              </p>
              <button
                onClick={() => setShowCreateSession(true)}
                className="mt-5 bg-[#0b101d] hover:bg-slate-900 hover:text-emerald-400 text-slate-300 font-bold font-display text-xs border-2 border-slate-800 hover:border-emerald-500 px-5 py-2.5 rounded shadow-neo-slate tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 active:shadow-none"
                id="btn-workspace-bootstrap-first"
              >
                DAFTARKAN MUSYAWARAH BARU
              </button>
            </div>
          )}
        </section>

      </main>

      {/* --- FOOTER BANNER --- */}
      <footer className="bg-slate-950 py-7 text-center text-[10px] text-slate-550 border-t border-slate-900 mt-12 print:hidden" id="app-general-footer">
        <p className="uppercase tracking-wider font-medium font-display">&copy; 2026 Pemerintah Kabupaten Sinar Raya | E-Musyawarah Desa Makmur Jaya Seksi Pemerintahan.</p>
        <p className="mt-1.5 font-mono text-slate-650">Integritas Terbuka, Permufakatan Adil, Terbuka & Tanda Tangan Elektronik Resmi Pamong Desa.</p>
      </footer>

      {/* --- MODAL 1: NEW SESSION FORM (BUAT RAPAT) --- */}
      <AnimatePresence>
        {showCreateSession && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-[2px] flex items-center justify-center z-50 p-4" id="modal-create-session-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-[#0b101d] border-2 border-slate-900 p-6.5 rounded-lg max-w-lg w-full shadow-2xl relative"
              id="modal-create-session-card"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-4.5 flex items-center gap-2 font-display">
                <Landmark size={18} className="text-emerald-500" />
                Daftarkan Musyawarah Desa Baru
              </h3>

              <form onSubmit={handleCreateSession} className="space-y-4 text-xs text-slate-350" id="form-create-session">
                <div>
                  <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Agenda Utama / Nama Sidang</label>
                  <input
                    type="text"
                    value={newSessionTitle}
                    onChange={(e) => setNewSessionTitle(e.target.value)}
                    placeholder="Contoh: Pembasahan Anggaran Posyandu Terpadu RT 04"
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-650 font-sans"
                    required
                    id="input-new-session-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Kategori Bidang</label>
                    <select
                      value={newSessionCategory}
                      onChange={(e) => setNewSessionCategory(e.target.value as MusyawarahCategory)}
                      className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.8 text-xs text-emerald-400 font-bold focus:outline-none cursor-pointer"
                      id="select-new-category"
                    >
                      <option value="Pembangunan Infrastruktur">Infrastruktur & Fisik</option>
                      <option value="Pemberdayaan & Sosial">Pemberdayaan & Sosial</option>
                      <option value="Alokasi Dana Desa (ADD)">Anggaran & ADD</option>
                      <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                      <option value="Keadaan Darurat & Bencana">Darurat & Kebencanaan</option>
                      <option value="Regulasi & Hukum Desa">Regulasi / Hukum Desa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Tempat Pelaksanaan</label>
                    <input
                      type="text"
                      value={newSessionLocation}
                      onChange={(e) => setNewSessionLocation(e.target.value)}
                      placeholder="Aula Rapat Desa"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      id="input-new-location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-455 font-mono uppercase tracking-wider mb-1.5 font-semibold">Tanggal Sidang</label>
                    <input
                      type="date"
                      value={newSessionDate}
                      onChange={(e) => setNewSessionDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono cursor-pointer"
                      id="input-new-date"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-455 font-mono uppercase tracking-wider mb-1.5 font-semibold">Jam Mulai (WIB)</label>
                    <input
                      type="text"
                      value={newSessionTime}
                      onChange={(e) => setNewSessionTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                      id="input-new-time"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Pimpinan Sidang (Ketua)</label>
                    <input
                      type="text"
                      value={newSessionLeader}
                      onChange={(e) => setNewSessionLeader(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-250 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      id="input-new-leader"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-450 font-mono uppercase tracking-wider mb-1.5 font-semibold">Notulis / Sekretaris</label>
                    <input
                      type="text"
                      value={newSessionSecretary}
                      onChange={(e) => setNewSessionSecretary(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-250 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      id="input-new-secretary"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateSession(false)}
                    className="px-4.5 py-2.2 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-850 text-slate-400 rounded text-xs font-bold font-display transition cursor-pointer"
                    id="btn-new-session-cancel"
                  >
                    BATAL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.2 bg-emerald-600 hover:bg-emerald-505 text-white font-bold rounded text-xs font-display shadow-neo-emerald transition border border-slate-900"
                    id="btn-new-session-submit"
                  >
                    SAHKAN AGENDA
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: OFFICIAL REPORT MODAL --- */}
      {showReport && activeSession && (
        <MinutesReport
          session={activeSession}
          agendas={activeAgendas}
          attendees={activeAttendance}
          minutes={activeMinutes}
          decisions={activeDecisions}
          onClose={() => setShowReport(false)}
        />
      )}

    </div>
  );
}
