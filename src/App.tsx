import React from 'react';
import { Landmark, Calendar, Clock, MapPin, Users, CheckSquare, UserCheck, FileText, Vote, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Hooks & Sub-Components
import { useMusyawarah } from './hooks/useMusyawarah';
import Header from './components/Header';
import SessionList from './components/SessionList';
import CreateSessionModal from './components/CreateSessionModal';
import AgendaPanel from './components/AgendaPanel';
import AttendancePanel from './components/AttendancePanel';
import MinutesPanel from './components/MinutesPanel';
import DecisionsPanel from './components/DecisionsPanel';
import MinutesReport from './components/MinutesReport';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const {
    handleExportBackup,
    handleImportBackup,
    footerCopyright,
    paguDict,
    budgetItems,
    handleExportAttendanceCSV,
    handleUpdatePagu,
    handleAddBudgetItem,
    handleDeleteBudgetItem,
    villageName,
    subdistrictName,
    regencyName,
    govAddress,
    govEmail,
    govWebsite,
    showSettings,
    setShowSettings,
    handleSaveSettings,
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    attendance,
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
  } = useMusyawarah();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-zinc-200 flex flex-col font-sans selection:bg-indigo-650/20 selection:text-indigo-600 antialiased" id="main-applet-root">
      
      {/* --- NOTIFICATION FLOATER --- */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 left-6 z-50 rounded-lg px-5 py-3 shadow-md flex items-center gap-3 max-w-sm w-full border ${
              notification.type === 'success'
                ? 'bg-slate-900 dark:bg-zinc-800 text-white border-transparent'
                : notification.type === 'error'
                ? 'bg-red-650 text-white border-transparent'
                : 'bg-indigo-600 text-white border-transparent'
            }`}
            id="notification-floater"
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-emerald-400' : 'bg-white'}`} />
            <span className="text-xs font-semibold tracking-wide font-sans">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- APP BAR --- */}
      <Header
        activeSession={activeSession}
        setShowCreateSession={setShowCreateSession}
        setShowReport={setShowReport}
        triggerNotification={triggerNotification}
        villageName={villageName}
        setShowSettings={setShowSettings}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* --- CORE WORKSPACE LAYOUT --- */}
      <main className="flex-1 w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10" id="main-workspace-grid">
        
        {/* LEFT COLUMN: SESSIONS LIST */}
        <section className="lg:col-span-4 space-y-5" id="section-sessions-lobby">
          <SessionList
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            setSelectedSessionId={setSelectedSessionId}
            setActiveTab={setActiveTab}
            attendance={attendance}
            handleDeleteSession={handleDeleteSession}
            setShowCreateSession={setShowCreateSession}
          />
        </section>

        {/* RIGHT COLUMN: DETAILED SESSION ACTIVE WORKSPACE */}
        <section className="lg:col-span-8 flex flex-col" id="section-session-detail-workspace">
          {activeSession ? (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex-1 flex flex-col shadow-xs">
              
              {/* Active Workshop Banner */}
              <div className="bg-slate-50/70 dark:bg-zinc-900/40 border-b border-slate-200/60 dark:border-zinc-800 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 font-sans">
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider leading-none flex items-center gap-1 ${
                        activeSession.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-650 dark:text-zinc-400'
                      }`}>
                        {activeSession.status === 'active' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />}
                        {t('session')} {activeSession.status === 'active' ? 'Aktif' : 'Selesai'}
                      </span>
                      <span className="text-[9.5px] text-indigo-650 dark:text-indigo-400 font-semibold tracking-wide bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/30 px-2 py-0.5 rounded">
                        {activeSession.category}
                      </span>
                    </div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 tracking-tight font-sans">
                      {activeSession.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeSession.status === 'active' ? (
                      <button
                        onClick={() => handleCompleteSession(activeSession.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-tight shadow-sm transition duration-150 cursor-pointer focus:outline-none"
                        id="btn-workspace-finish-session"
                      >
                        Tutup Sidang
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopenSession(activeSession.id)}
                        className="bg-white hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 px-4 py-2 rounded-lg text-xs font-semibold tracking-tight shadow-sm transition duration-150 cursor-pointer focus:outline-none"
                        id="btn-workspace-reopen-session"
                      >
                        Aktifkan Sidang
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowReport(true)}
                      className="bg-white hover:bg-indigo-50/20 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-slate-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-900 text-indigo-650 dark:text-indigo-400 px-4 py-2 rounded-lg text-xs font-semibold tracking-tight shadow-sm transition duration-150 cursor-pointer focus:outline-none"
                      id="btn-workspace-quick-report"
                    >
                      Unduh Berita Acara
                    </button>
                  </div>
                </div>

                {/* Sub Metadata Info strip */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[10px] text-slate-500 mt-4.5 pt-3.5 border-t border-slate-100 dark:border-zinc-850 font-sans font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-slate-400 dark:text-zinc-550" />
                    <span>Tanggal: {activeSession.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-400 dark:text-zinc-550" />
                    <span>Waktu: {activeSession.time}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <MapPin size={13} className="text-slate-400 dark:text-zinc-550 translate-y-[0.5px]" />
                    <span className="truncate">Lokasi: {activeSession.location}</span>
                  </div>
                </div>
              </div>

              {/* Workspace Navigation Tabs */}
              <div className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/10 flex px-2 overflow-x-auto gap-1" id="workspace-tabs-bar">
                {[
                  { id: 'agenda', label: 'AGENDA', count: activeAgendas.length, icon: CheckSquare },
                  { id: 'attendance', label: 'DAFTAR HADIR', count: activeAttendance.length, icon: UserCheck },
                  { id: 'minutes', label: 'CATATAN RAPAT', count: activeMinutes.discussionPoints?.length || 0, icon: FileText },
                  { id: 'decisions', label: 'KEPUTUSAN', count: activeDecisions.length, icon: Vote }
                ].map((tb) => {
                  const Icon = tb.icon;
                  const isCur = activeTab === tb.id;
                  return (
                    <button
                      key={tb.id}
                      onClick={() => setActiveTab(tb.id as any)}
                      className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition duration-150 cursor-pointer ${
                        isCur
                          ? 'border-indigo-600 text-indigo-655 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/10'
                          : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-50/40 dark:hover:bg-zinc-800/10'
                      }`}
                      id={`tab-button-${tb.id}`}
                    >
                      <Icon size={14} className={isCur ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-450 dark:text-zinc-500'} />
                      <span>{tb.label}</span>
                      <span className={`text-[9px] font-sans px-2 py-0.5 rounded font-bold border ${isCur ? 'bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/30' : 'bg-slate-100 dark:bg-zinc-800 text-slate-550 dark:text-zinc-400 border-slate-200/60 dark:border-zinc-800'}`}>
                        {tb.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Workspace Active Panels */}
              <div className="p-6 flex-1 bg-white dark:bg-zinc-900" id="workspace-viewports">
                {activeTab === 'agenda' && (
                  <AgendaPanel
                    activeAgendas={activeAgendas}
                    newAgendaTopic={newAgendaTopic}
                    setNewAgendaTopic={setNewAgendaTopic}
                    newAgendaSpeaker={newAgendaSpeaker}
                    setNewAgendaSpeaker={setNewAgendaSpeaker}
                    newAgendaDuration={newAgendaDuration}
                    setNewAgendaDuration={setNewAgendaDuration}
                    handleAddAgenda={handleAddAgenda}
                    handleUpdateAgendaStatus={handleUpdateAgendaStatus}
                    handleDeleteAgenda={handleDeleteAgenda}
                  />
                )}

                {activeTab === 'attendance' && (
                  <AttendancePanel
                    activeAttendance={activeAttendance}
                    newAttendeeName={newAttendeeName}
                    setNewAttendeeName={setNewAttendeeName}
                    newAttendeeNik={newAttendeeNik}
                    setNewAttendeeNik={setNewAttendeeNik}
                    newAttendeeRole={newAttendeeRole}
                    setNewAttendeeRole={setNewAttendeeRole}
                    newAttendeePhone={newAttendeePhone}
                    setNewAttendeePhone={setNewAttendeePhone}
                    newAttendeeSignature={newAttendeeSignature}
                    setNewAttendeeSignature={setNewAttendeeSignature}
                    handleAddAttendance={handleAddAttendance}
                    handleDeleteAttendance={handleDeleteAttendance}
                    sigKey={sigKey}
                    handleExportAttendanceCSV={handleExportAttendanceCSV}
                  />
                )}

                {activeTab === 'minutes' && (
                  <MinutesPanel
                    selectedSessionId={selectedSessionId}
                    activeMinutes={activeMinutes}
                    newActionTask={newActionTask}
                    setNewActionTask={setNewActionTask}
                    newActionPic={newActionPic}
                    setNewActionPic={setNewActionPic}
                    newActionDeadline={newActionDeadline}
                    setNewActionDeadline={setNewActionDeadline}
                    newDiscussionPoint={newDiscussionPoint}
                    setNewDiscussionPoint={setNewDiscussionPoint}
                    handleSaveSummaryDescription={handleSaveSummaryDescription}
                    handleAddDiscussionPoint={handleAddDiscussionPoint}
                    handleRemoveDiscussionPoint={handleRemoveDiscussionPoint}
                    handleAddActionItem={handleAddActionItem}
                    handleDeleteActionItem={handleDeleteActionItem}
                    handleLoadTemplate={handleLoadTemplate}
                  />
                )}

                {activeTab === 'decisions' && (
                  <DecisionsPanel
                    activeAttendance={activeAttendance}
                    activeDecisions={activeDecisions}
                    newDecisionTitle={newDecisionTitle}
                    setNewDecisionTitle={setNewDecisionTitle}
                    newDecisionDescription={newDecisionDescription}
                    setNewDecisionDescription={setNewDecisionDescription}
                    newDecisionMethod={newDecisionMethod}
                    setNewDecisionMethod={setNewDecisionMethod}
                    newDecisionVotesAgree={newDecisionVotesAgree}
                    setNewDecisionVotesAgree={setNewDecisionVotesAgree}
                    newDecisionVotesDisagree={newDecisionVotesDisagree}
                    setNewDecisionVotesDisagree={setNewDecisionVotesDisagree}
                    newDecisionVotesAbstain={newDecisionVotesAbstain}
                    setNewDecisionVotesAbstain={setNewDecisionVotesAbstain}
                    handleAddDecision={handleAddDecision}
                    handleDeleteDecision={handleDeleteDecision}
                    selectedSessionId={selectedSessionId}
                    paguDict={paguDict}
                    budgetItems={budgetItems}
                    handleUpdatePagu={handleUpdatePagu}
                    handleAddBudgetItem={handleAddBudgetItem}
                    handleDeleteBudgetItem={handleDeleteBudgetItem}
                  />
                )}
              </div>

              {/* Console status footer */}
              <div className="bg-white border-t border-slate-200 px-5 py-4 text-[10px] text-slate-500 font-sans flex flex-col md:flex-row items-center justify-between gap-3 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                  <span>{t('connected_session')}: <strong className="text-[#0b57d0] font-bold">{t('digital_hybrid_local')}</strong></span>
                </span>
                <span>{t('nik_validation_notice')}</span>
                <span>{t('gov_version')}</span>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 border-dashed rounded-2xl flex-1 flex flex-col items-center justify-center text-center p-12 min-h-[55vh] shadow-[0_1px_2px_rgba(60,64,67,0.01)]" id="empty-selected-session">
              <Landmark size={48} className="text-slate-300 mb-4" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-display font-bold">{t('gateway_title')}</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
                {t('gateway_description')}
              </p>
              <button
                onClick={() => setShowCreateSession(true)}
                className="mt-5 bg-[#0b57d0] hover:bg-[#0049b8] text-white font-bold font-display text-xs border border-transparent px-5 py-2.5 rounded-full shadow-sm tracking-wide transition duration-150 cursor-pointer focus:outline-none"
                id="btn-workspace-bootstrap-first"
              >
                {t('register_new_meeting')}
              </button>
            </div>
          )}
        </section>

      </main>

      {/* --- FOOTER BANNER --- */}
      <footer className="bg-white py-6 text-center text-[10px] text-slate-400 border-t border-slate-200 mt-12 print:hidden" id="app-general-footer">
        <p className="uppercase tracking-wider font-bold font-display">&copy; 2026 {footerCopyright}.</p>
        <p className="mt-1.5 font-sans text-slate-450 font-bold">{t('footer_philosophy')}</p>
      </footer>

      {/* --- MODALS --- */}
      <CreateSessionModal
        showCreateSession={showCreateSession}
        setShowCreateSession={setShowCreateSession}
        newSessionTitle={newSessionTitle}
        setNewSessionTitle={setNewSessionTitle}
        newSessionCategory={newSessionCategory}
        setNewSessionCategory={setNewSessionCategory}
        newSessionLocation={newSessionLocation}
        setNewSessionLocation={setNewSessionLocation}
        newSessionDate={newSessionDate}
        setNewSessionDate={setNewSessionDate}
        newSessionTime={newSessionTime}
        setNewSessionTime={setNewSessionTime}
        newSessionLeader={newSessionLeader}
        setNewSessionLeader={setNewSessionLeader}
        newSessionSecretary={newSessionSecretary}
        setNewSessionSecretary={setNewSessionSecretary}
        handleCreateSession={handleCreateSession}
      />

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        villageName={villageName}
        subdistrictName={subdistrictName}
        regencyName={regencyName}
        govAddress={govAddress}
        govEmail={govEmail}
        govWebsite={govWebsite}
        footerCopyright={footerCopyright}
        handleSaveSettings={handleSaveSettings}
        handleExportBackup={handleExportBackup}
        handleImportBackup={handleImportBackup}
      />

      {showReport && activeSession && (
        <MinutesReport
          session={activeSession}
          agendas={activeAgendas}
          attendees={activeAttendance}
          minutes={activeMinutes}
          decisions={activeDecisions}
          onClose={() => setShowReport(false)}
          villageName={villageName}
          subdistrictName={subdistrictName}
          regencyName={regencyName}
          govAddress={govAddress}
          govEmail={govEmail}
          govWebsite={govWebsite}
        />
      )}

    </div>
  );
}
