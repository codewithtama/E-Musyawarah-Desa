import React, { useState, useEffect } from 'react';
import { MusyawarahSession, AgendaItem, AttendanceRecord, MinutesRecord, DecisionRecord, MusyawarahCategory } from '../types';
import {
  INITIAL_SESSIONS,
  INITIAL_AGENDAS,
  INITIAL_ATTENDANCE,
  INITIAL_MINUTES,
  INITIAL_DECISIONS,
  DEFAULT_SIGNATURE_PAGES
} from '../data';

// Validation utility to reject hostile inputs containing dangerous symbols or HTML/Script tags
const validateSafeText = (text: string): boolean => {
  // Regex allows letters, numbers, spaces, and safe punctuation marks: . , ? ! ( ) - _ / " ' & : @ + =
  // Dangerous symbols like <, >, {, }, [, ], \, |, ^, %, *, $, #, ~ are strictly blocked
  const safeRegex = /^[a-zA-Z0-9\s.,?!()\-_\/"'&:@+=]*$/;
  return safeRegex.test(text);
};

export function useMusyawarah() {
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

  // Canvas remounting trigger state to clean draw pads automatically after submitting absensi
  const [sigKey, setSigKey] = useState(0);

  // Region Settings State
  const [villageName, setVillageName] = useState('Desa Makmur Jaya');
  const [subdistrictName, setSubdistrictName] = useState('Kecamatan Sejahtera Makmur');
  const [regencyName, setRegencyName] = useState('Pemerintah Kabupaten Sinar Raya');
  const [govAddress, setGovAddress] = useState('Jl. Raya Praja No. 1, Kode Pos 40182');
  const [govEmail, setGovEmail] = useState('pemdes@makmurjaya.desa.id');
  const [govWebsite, setGovWebsite] = useState('www.makmurjaya.desa.id');
  const [footerCopyright, setFooterCopyright] = useState('E-Musyawarah Desa Makmur Jaya | Seksi Pemerintahan');
  const [paguDict, setPaguDict] = useState<Record<string, number>>({});
  const [budgetItems, setBudgetItems] = useState<{ id: string; sessionId: string; name: string; cost: number }[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // --- INITIAL LOAD & PERSISTENCE ---
  useEffect(() => {
    // Load Region Settings
    const savedVillage = localStorage.getItem('gov_village_name');
    if (savedVillage) setVillageName(savedVillage);
    
    const savedSubdistrict = localStorage.getItem('gov_subdistrict_name');
    if (savedSubdistrict) setSubdistrictName(savedSubdistrict);
    
    const savedRegency = localStorage.getItem('gov_regency_name');
    if (savedRegency) setRegencyName(savedRegency);
    
    const savedAddress = localStorage.getItem('gov_address');
    if (savedAddress) setGovAddress(savedAddress);
    
    const savedEmail = localStorage.getItem('gov_email');
    if (savedEmail) setGovEmail(savedEmail);
    
    const savedWebsite = localStorage.getItem('gov_website');
    if (savedWebsite) setGovWebsite(savedWebsite);

    const savedFooter = localStorage.getItem('gov_footer_copyright');
    if (savedFooter) setFooterCopyright(savedFooter);

    const savedPagu = localStorage.getItem('musyawarah_pagu_dict');
    if (savedPagu) setPaguDict(JSON.parse(savedPagu));

    const savedBudgetItems = localStorage.getItem('musyawarah_budget_items');
    if (savedBudgetItems) setBudgetItems(JSON.parse(savedBudgetItems));

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
    if (newSessionTitle.trim().length < 5) {
      triggerNotification('Nama agenda rapat terlalu singkat (minimal 5 karakter)', 'error');
      return;
    }
    if (!newSessionLocation.trim() || newSessionLocation.trim().length < 3) {
      triggerNotification('Lokasi rapat wajib diisi dengan benar (minimal 3 karakter)', 'error');
      return;
    }
    if (!newSessionLeader.trim() || newSessionLeader.trim().length < 3) {
      triggerNotification('Nama pimpinan rapat wajib diisi dengan benar (minimal 3 karakter)', 'error');
      return;
    }
    if (!newSessionSecretary.trim() || newSessionSecretary.trim().length < 3) {
      triggerNotification('Nama sekretaris/notulis wajib diisi dengan benar (minimal 3 karakter)', 'error');
      return;
    }
    if (!validateSafeText(newSessionTitle) || !validateSafeText(newSessionLocation) || !validateSafeText(newSessionLeader) || !validateSafeText(newSessionSecretary)) {
      triggerNotification('Isian mengandung simbol khusus yang dilarang demi keamanan', 'error');
      return;
    }
    if (newSessionDate) {
      const parsedDate = Date.parse(newSessionDate);
      if (isNaN(parsedDate)) {
        triggerNotification('Format tanggal pelaksanaan rapat tidak valid', 'error');
        return;
      }
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
      status: 'active',
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
      discussionPoints: [],
      actionItems: [],
    };
    const updatedMinutes = [emptyMinutes, ...minutes];
    setMinutes(updatedMinutes);
    syncLocalStorage('musyawarah_minutes', updatedMinutes);

    // Bootstrap empty agenda outline (clean slate)
    const updatedAgendas = [...agendas];
    setAgendas(updatedAgendas);
    syncLocalStorage('musyawarah_agendas', updatedAgendas);

    // Reset Form to default values
    setNewSessionTitle('');
    setNewSessionCategory('Pembangunan Infrastruktur');
    setNewSessionLocation('Balai ' + villageName);
    setNewSessionDate('');
    setNewSessionTime('09:00 - 12:00 WIB');
    setNewSessionLeader('H. Sudirman, S.IP. (Kepala Desa)');
    setNewSessionSecretary('Sri Wahyuni, A.Md. (Sekretaris Desa)');
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

      if (selectedSessionId === id) {
        if (remainingSessions.length > 0) {
          setSelectedSessionId(remainingSessions[0].id);
        } else {
          setSelectedSessionId('');
        }
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
    if (!newAgendaTopic.trim() || newAgendaTopic.trim().length < 5) {
      triggerNotification('Topik pembahasan terlalu singkat (minimal 5 karakter)', 'error');
      return;
    }
    if (!newAgendaSpeaker.trim() || newAgendaSpeaker.trim().length < 3) {
      triggerNotification('Nama narasumber wajib diisi dengan benar (minimal 3 karakter)', 'error');
      return;
    }
    if (!newAgendaDuration.trim()) {
      triggerNotification('Durasi pembahasan wajib diisi', 'error');
      return;
    }
    if (!validateSafeText(newAgendaTopic) || !validateSafeText(newAgendaSpeaker) || !validateSafeText(newAgendaDuration)) {
      triggerNotification('Isian mengandung simbol khusus yang dilarang demi keamanan', 'error');
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
    triggerNotification('Topik agenda ditambahkan', 'success');
  };

  // Update Agenda Status Toggle
  const handleUpdateAgendaStatus = (id: string, status: 'pending' | 'ongoing' | 'completed') => {
    const updated = agendas.map(a => {
      if (a.id === id) return { ...a, status };
      return a;
    });
    setAgendas(updated);
    syncLocalStorage('musyawarah_agendas', updated);
    triggerNotification(`Status agenda diperbarui`, 'info');
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
    if (!newAttendeeName.trim() || newAttendeeName.trim().length < 3) {
      triggerNotification('Nama warga wajib diisi dengan benar (minimal 3 karakter)', 'error');
      return;
    }
    const nameRegex = /^[a-zA-Z\s.,'()]+$/;
    if (!nameRegex.test(newAttendeeName)) {
      triggerNotification('Nama hanya boleh terdiri dari huruf, spasi, dan gelar tanda baca', 'error');
      return;
    }
    if (!newAttendeeNik.trim() || newAttendeeNik.trim().length !== 16 || !/^\d{16}$/.test(newAttendeeNik)) {
      triggerNotification('NIK wajib terdiri dari persis 16 digit angka saja', 'error');
      return;
    }
    if (newAttendeePhone.trim()) {
      const phoneRegex = /^[+0-9]{9,15}$/;
      if (!phoneRegex.test(newAttendeePhone.trim())) {
        triggerNotification('Nomor WA / HP tidak valid (9-15 digit angka)', 'error');
        return;
      }
    }
    if (!validateSafeText(newAttendeeRole)) {
      triggerNotification('Isian utusan mengandung simbol khusus yang dilarang demi keamanan', 'error');
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

    // Reset Fields & Canvas Remount
    setNewAttendeeName('');
    setNewAttendeeNik('');
    setNewAttendeePhone('');
    setNewAttendeeSignature('');
    setSigKey(prev => prev + 1);
    triggerNotification(`Absensi atas nama ${newAttendeeName} berhasil tercatat!`, 'success');
  };



  // Delete Attendance Record
  const handleDeleteAttendance = (id: string) => {
    const updated = attendance.filter(a => a.id !== id);
    setAttendance(updated);
    syncLocalStorage('musyawarah_attendance', updated);
  };

  // Save General Notulen Summary Description
  const handleSaveSummaryDescription = (sum: string) => {
    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      const updated = [...prevMinutes];

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
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });
    // Notification removed to prevent keystroke spamming
  };

  // Add Discussion Point Bullet
  const handleAddDiscussionPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionPoint.trim() || newDiscussionPoint.trim().length < 5) {
      triggerNotification('Catatan pokok bahasan terlalu singkat (minimal 5 karakter)', 'error');
      return;
    }
    if (!validateSafeText(newDiscussionPoint)) {
      triggerNotification('Isian mengandung simbol khusus yang dilarang demi keamanan', 'error');
      return;
    }

    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      const updated = [...prevMinutes];

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
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });

    setNewDiscussionPoint('');
    triggerNotification('Catatan diskusi ditambahkan', 'success');
  };

  // Remove Discussion Point Bullet
  const handleRemoveDiscussionPoint = (indexToRemove: number) => {
    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      if (sessionMinIndex === -1) return prevMinutes;

      const updated = [...prevMinutes];
      const currentPoints = updated[sessionMinIndex].discussionPoints || [];
      updated[sessionMinIndex] = {
        ...updated[sessionMinIndex],
        discussionPoints: currentPoints.filter((_, idx) => idx !== indexToRemove)
      };
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });
  };

  // Add Action Item Row
  const handleAddActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTask.trim() || newActionTask.trim().length < 5) {
      triggerNotification('Tindak lanjut/tugas terlalu singkat (minimal 5 karakter)', 'error');
      return;
    }
    if (!newActionPic.trim() || newActionPic.trim().length < 3) {
      triggerNotification('Penanggung Jawab (PIC) terlalu singkat (minimal 3 karakter)', 'error');
      return;
    }
    if (!newActionDeadline.trim()) {
      triggerNotification('Tenggat waktu wajib diisi', 'error');
      return;
    }
    if (!validateSafeText(newActionTask) || !validateSafeText(newActionPic) || !validateSafeText(newActionDeadline)) {
      triggerNotification('Isian mengandung simbol khusus yang dilarang demi keamanan', 'error');
      return;
    }

    const newItem = {
      id: `act-${Date.now()}`,
      task: newActionTask,
      pic: newActionPic,
      deadline: newActionDeadline || 'Sesuai Arahan Kades'
    };

    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      const updated = [...prevMinutes];

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
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });

    setNewActionTask('');
    setNewActionPic('');
    setNewActionDeadline('');
    triggerNotification('Rencana tindak lanjut berhasil ditambahkan', 'success');
  };

  // Delete Action Item
  const handleDeleteActionItem = (itemId: string) => {
    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      if (sessionMinIndex === -1) return prevMinutes;

      const updated = [...prevMinutes];
      const currentActions = updated[sessionMinIndex].actionItems || [];
      updated[sessionMinIndex] = {
        ...updated[sessionMinIndex],
        actionItems: currentActions.filter(act => act.id !== itemId)
      };
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });
  };

  // Load Presets templates based on meeting types
  const handleLoadTemplate = (templateType: 'pembangunan' | 'sosial' | 'anggaran') => {
    let summaryText = '';
    let points: string[] = [];
    let actions: any[] = [];
    const timestamp = Date.now();

    if (templateType === 'pembangunan') {
      summaryText = 'Fokus musyawarah membahas pengerjaan drainase, rencana pengaspalan jalan raya dan rehab sarana rukun tetangga.';
      points = [
        'Mendengar aspirasi ketua rukun tetangga atas keluhan saluran drainase mampet yang sering banjir.',
        'Warga menyepakati pemberian ganti rugi tanah sekedarnya bagi proyek pelebaran jalan utama.',
        'Memasukkan alokasi sewa mesin paving jalan sebagai swadaya mandiri warga bergotong royong.'
      ];
      actions = [
        { id: `act-temp-1-${timestamp}`, task: 'Koordinasikan dengan Dinas PU Kabupaten untuk survei aspal', pic: 'Kaur Pembangunan', deadline: '2026-06-15' },
        { id: `act-temp-2-${timestamp}`, task: 'Rapat RT internal untuk kesiapan tenaga kerja swadaya', pic: 'Seluruh Ketua RT Dusun II', deadline: '2026-06-03' }
      ];
    } else if (templateType === 'sosial') {
      summaryText = 'Sosialisasi pengumpulan zakat, pembagian beras subsidi bulanan, serta kepedulian bupati jaminan kesehatan warga miskin.';
      points = [
        'Penyampaian kriteria jaminan BPJS PBI gratis dari kas program kabupaten.',
        'Warga memohon pengawasan ketat aparat desa pada pembagian beras Bulog agar tidak salah sasaran.',
        'Pembentukan panitia peduli lansia terlantar didanai patungan khas warga sukarela.'
      ];
      actions = [
        { id: `act-temp-3-${timestamp}`, task: 'Kirim revisi daftar penerima jaminan sosial warga ke Dinsos', pic: 'Sekdes & Staf Kesejahteraan', deadline: '2026-06-10' }
      ];
    } else {
      summaryText = 'Laporan audit kas pembangunan dari bendahara desa perihal evaluasi triwulan dan transparansi penggunaan dana bagi hasil.';
      points = [
        'Bendahara membacakan rincian sisa lebih pembiayaan anggaran desa yang belum terpakai.',
        'Pemberian masukan pemanfaatan modal Badan Usaha Lemak Desa (BUMDes) di bidang pembibitan mangga klonal.',
        'Konsolidasi proposal dari BPD mengenai evaluasi efektivitas pelatihan komputer pamong desa.'
      ];
      actions = [
        { id: `act-temp-4-${timestamp}`, task: 'Publikasi infografis realisasi dana di baliho balai desa', pic: 'Kaur Keuangan & operator IT', deadline: '2026-06-05' }
      ];
    }

    const loadedRecord = {
      sessionId: selectedSessionId,
      summary: summaryText,
      discussionPoints: points,
      actionItems: actions
    };

    setMinutes(prevMinutes => {
      const sessionMinIndex = prevMinutes.findIndex(m => m.sessionId === selectedSessionId);
      const updated = [...prevMinutes];

      if (sessionMinIndex >= 0) {
        updated[sessionMinIndex] = loadedRecord;
      } else {
        updated.push(loadedRecord);
      }
      syncLocalStorage('musyawarah_minutes', updated);
      return updated;
    });

    triggerNotification('Templat Notulen khas Desa berhasil dimuat!', 'success');
  };

  // --- DECISIONS OPERATIONS ---

  // Add Decision
  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecisionTitle.trim() || newDecisionTitle.trim().length < 5) {
      triggerNotification('Judul ketetapan keputusan terlalu singkat (minimal 5 karakter)', 'error');
      return;
    }
    if (!newDecisionDescription.trim() || newDecisionDescription.trim().length < 10) {
      triggerNotification('Rincian/butir ketentuan terlalu singkat (minimal 10 karakter)', 'error');
      return;
    }
    if (!validateSafeText(newDecisionTitle) || !validateSafeText(newDecisionDescription)) {
      triggerNotification('Isian ketetapan mengandung simbol khusus yang dilarang demi keamanan', 'error');
      return;
    }

    const isVoteMethod = newDecisionMethod === 'Voting';
    
    if (isVoteMethod) {
      if (newDecisionVotesAgree < 0 || newDecisionVotesDisagree < 0 || newDecisionVotesAbstain < 0) {
        triggerNotification('Jumlah perolehan suara tidak boleh bernilai negatif', 'error');
        return;
      }
      
      const totalVotes = newDecisionVotesAgree + newDecisionVotesDisagree + newDecisionVotesAbstain;
      if (totalVotes === 0) {
        triggerNotification('Untuk metode Voting, mohon isi hasil suara peserta rapat', 'error');
        return;
      }
      
      if (totalVotes > activeAttendance.length) {
        triggerNotification(`Jumlah total suara (${totalVotes}) tidak boleh melebihi jumlah warga yang hadir (${activeAttendance.length} jiwa)!`, 'error');
        return;
      }
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



  const handleDeleteDecision = (id: string) => {
    const updated = decisions.filter(d => d.id !== id);
    setDecisions(updated);
    syncLocalStorage('musyawarah_decisions', updated);
    triggerNotification('Butir keputusan dihapus', 'info');
  };

  const handleExportAttendanceCSV = () => {
    if (activeAttendance.length === 0) {
      triggerNotification('Daftar absensi masih kosong', 'error');
      return;
    }
    
    const headers = ['No', 'Nama Lengkap', 'NIK', 'Jabatan/Utusan', 'No WA/HP', 'Waktu Presensi'];
    const rows = activeAttendance.map((at, idx) => [
      idx + 1,
      `"${at.name.replace(/"/g, '""')}"`,
      `'${at.nik}`,
      `"${at.role.replace(/"/g, '""')}"`,
      `"${at.phone.replace(/"/g, '""')}"`,
      `"${new Date(at.timestamp).toLocaleString('id-ID')}"`
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `Daftar-Hadir-Rapat-${villageName.replace(/\s+/g, '-')}-${activeSession?.title.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    triggerNotification('Daftar absensi berhasil diekspor ke CSV!', 'success');
  };

  const handleUpdatePagu = (amount: number) => {
    if (amount < 0) {
      triggerNotification('Pagu anggaran tidak boleh negatif', 'error');
      return;
    }
    const updated = { ...paguDict, [selectedSessionId]: amount };
    setPaguDict(updated);
    localStorage.setItem('musyawarah_pagu_dict', JSON.stringify(updated));
    triggerNotification('Pagu anggaran desa berhasil diperbarui!', 'success');
  };

  const handleAddBudgetItem = (name: string, cost: number) => {
    if (!name.trim() || name.trim().length < 3) {
      triggerNotification('Nama program/belanja terlalu singkat (minimal 3 karakter)', 'error');
      return;
    }
    if (cost <= 0) {
      triggerNotification('Estimasi biaya program harus lebih besar dari 0', 'error');
      return;
    }
    if (!validateSafeText(name)) {
      triggerNotification('Input mengandung simbol khusus yang dilarang demi keamanan', 'error');
      return;
    }
    
    const newItem = {
      id: `budget-${Date.now()}`,
      sessionId: selectedSessionId,
      name: name.trim(),
      cost: cost
    };
    
    const updated = [...budgetItems, newItem];
    setBudgetItems(updated);
    localStorage.setItem('musyawarah_budget_items', JSON.stringify(updated));
    triggerNotification('Item alokasi belanja ditambahkan!', 'success');
  };

  const handleDeleteBudgetItem = (id: string) => {
    const updated = budgetItems.filter(item => item.id !== id);
    setBudgetItems(updated);
    localStorage.setItem('musyawarah_budget_items', JSON.stringify(updated));
    triggerNotification('Item alokasi belanja dihapus', 'info');
  };

  const handleSaveSettings = (data: {
    village: string;
    subdistrict: string;
    regency: string;
    address: string;
    email: string;
    website: string;
    footerCopyright: string;
  }) => {
    setVillageName(data.village);
    setSubdistrictName(data.subdistrict);
    setRegencyName(data.regency);
    setGovAddress(data.address);
    setGovEmail(data.email);
    setGovWebsite(data.website);
    setFooterCopyright(data.footerCopyright);

    localStorage.setItem('gov_village_name', data.village);
    localStorage.setItem('gov_subdistrict_name', data.subdistrict);
    localStorage.setItem('gov_regency_name', data.regency);
    localStorage.setItem('gov_address', data.address);
    localStorage.setItem('gov_email', data.email);
    localStorage.setItem('gov_website', data.website);
    localStorage.setItem('gov_footer_copyright', data.footerCopyright);

    triggerNotification('Pengaturan daerah berhasil diperbarui!', 'success');
    setShowSettings(false);
  };

  // Export all localStorage data to a JSON backup file
  const handleExportBackup = () => {
    try {
      const data = {
        sessions: localStorage.getItem('musyawarah_sessions'),
        agendas: localStorage.getItem('musyawarah_agendas'),
        attendance: localStorage.getItem('musyawarah_attendance'),
        minutes: localStorage.getItem('musyawarah_minutes'),
        decisions: localStorage.getItem('musyawarah_decisions'),
        villageName: localStorage.getItem('gov_village_name'),
        subdistrictName: localStorage.getItem('gov_subdistrict_name'),
        regencyName: localStorage.getItem('gov_regency_name'),
        govAddress: localStorage.getItem('gov_address'),
        govEmail: localStorage.getItem('gov_email'),
        govWebsite: localStorage.getItem('gov_website'),
        footerCopyright: localStorage.getItem('gov_footer_copyright'),
        paguDict: localStorage.getItem('musyawarah_pagu_dict'),
        budgetItems: localStorage.getItem('musyawarah_budget_items'),
      };
      
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `Database-Backup-Musyawarah-${villageName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      triggerNotification('Database berhasil diekspor!', 'success');
    } catch (e) {
      triggerNotification('Gagal mengekspor database', 'error');
    }
  };

  // Import JSON backup data and restore it to localStorage
  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        
        // Simple structure validation
        if (!parsed.sessions || !parsed.agendas || !parsed.attendance || !parsed.minutes || !parsed.decisions) {
          triggerNotification('Struktur berkas cadangan tidak valid!', 'error');
          return;
        }

        if (parsed.sessions) localStorage.setItem('musyawarah_sessions', parsed.sessions);
        if (parsed.agendas) localStorage.setItem('musyawarah_agendas', parsed.agendas);
        if (parsed.attendance) localStorage.setItem('musyawarah_attendance', parsed.attendance);
        if (parsed.minutes) localStorage.setItem('musyawarah_minutes', parsed.minutes);
        if (parsed.decisions) localStorage.setItem('musyawarah_decisions', parsed.decisions);
        
        if (parsed.villageName) localStorage.setItem('gov_village_name', parsed.villageName);
        if (parsed.subdistrictName) localStorage.setItem('gov_subdistrict_name', parsed.subdistrictName);
        if (parsed.regencyName) localStorage.setItem('gov_regency_name', parsed.regencyName);
        if (parsed.govAddress) localStorage.setItem('gov_address', parsed.govAddress);
        if (parsed.govEmail) localStorage.setItem('gov_email', parsed.govEmail);
        if (parsed.govWebsite) localStorage.setItem('gov_website', parsed.govWebsite);
        if (parsed.footerCopyright) localStorage.setItem('gov_footer_copyright', parsed.footerCopyright);
        if (parsed.paguDict) localStorage.setItem('musyawarah_pagu_dict', parsed.paguDict);
        if (parsed.budgetItems) localStorage.setItem('musyawarah_budget_items', parsed.budgetItems);

        triggerNotification('Database berhasil diimpor! Memuat ulang...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        triggerNotification('Gagal membaca berkas cadangan', 'error');
      }
    };
    reader.readAsText(file);
  };

  return {
    handleExportBackup,
    handleImportBackup,
    footerCopyright,
    setFooterCopyright,
    paguDict,
    budgetItems,
    handleExportAttendanceCSV,
    handleUpdatePagu,
    handleAddBudgetItem,
    handleDeleteBudgetItem,
    villageName,
    setVillageName,
    subdistrictName,
    setSubdistrictName,
    regencyName,
    setRegencyName,
    govAddress,
    setGovAddress,
    govEmail,
    setGovEmail,
    govWebsite,
    setGovWebsite,
    showSettings,
    setShowSettings,
    handleSaveSettings,
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    agendas,
    attendance,
    minutes,
    decisions,
    activeTab,
    setActiveTab,
    showReport,
    setShowReport,
    showCreateSession,
    setShowCreateSession,
    newSessionTitle,
    setNewSessionTitle,
    newSessionCategory,
    setNewSessionCategory,
    newSessionLocation,
    setNewSessionLocation,
    newSessionDate,
    setNewSessionDate,
    newSessionTime,
    setNewSessionTime,
    newSessionLeader,
    setNewSessionLeader,
    newSessionSecretary,
    setNewSessionSecretary,
    newAgendaTopic,
    setNewAgendaTopic,
    newAgendaSpeaker,
    setNewAgendaSpeaker,
    newAgendaDuration,
    setNewAgendaDuration,
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
    newActionTask,
    setNewActionTask,
    newActionPic,
    setNewActionPic,
    newActionDeadline,
    setNewActionDeadline,
    newDiscussionPoint,
    setNewDiscussionPoint,
    notification,
    triggerNotification,
    sigKey,
    activeSession,
    activeAgendas,
    activeAttendance,
    activeMinutes,
    activeDecisions,
    handleCreateSession,
    handleDeleteSession,
    handleCompleteSession,
    handleReopenSession,
    handleAddAgenda,
    handleUpdateAgendaStatus,
    handleDeleteAgenda,
    handleAddAttendance,
    handleDeleteAttendance,
    handleSaveSummaryDescription,
    handleAddDiscussionPoint,
    handleRemoveDiscussionPoint,
    handleAddActionItem,
    handleDeleteActionItem,
    handleLoadTemplate,
    handleAddDecision,
    handleDeleteDecision
  };
}
