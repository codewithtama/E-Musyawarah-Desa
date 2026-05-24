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
  const {
    handleExportBackup,
    handleImportBackup,
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
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col font-sans selection:bg-blue-600/25 selection:text-[#0b57d0] antialiased" id="main-applet-root">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* --- NOTIFICATION FLOATER --- */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 left-6 z-50 rounded-full px-5 py-3 shadow-google-2 flex items-center gap-3 max-w-sm w-full border ${
              notification.type === 'success'
                ? 'bg-slate-900 text-white border-transparent'
                : notification.type === 'error'
                ? 'bg-[#ea4335] text-white border-transparent'
                : 'bg-[#0b57d0] text-white border-transparent'
            }`}
            id="notification-floater"
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-emerald-400' : 'bg-white'}`} />
            <span className="text-xs font-bold tracking-wide font-sans">{notification.message}</span>
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
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-1 flex flex-col shadow-[0_1px_2px_rgba(60,64,67,0.03)]">
              
              {/* Active Workshop Banner */}
              <div className="bg-slate-50 border-b border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 font-sans">
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider leading-none border flex items-center gap-1 ${
                        activeSession.status === 'active'
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-slate-150 text-slate-600 border-slate-250'
                      }`}>
                        {activeSession.status === 'active' && <span className="w-1 h-1 bg-green-600 rounded-full shrink-0" />}
                        {t('session')} {activeSession.status === 'active' ? t('active') : t('completed')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold tracking-wide bg-slate-100 px-2 py-0.5 rounded-full">
                        {activeSession.category}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-slate-800 font-display uppercase tracking-tight">
                      {activeSession.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeSession.status === 'active' ? (
                      <button
                        onClick={() => handleCompleteSession(activeSession.id)}
                        className="bg-[#ea4335] hover:bg-[#c5221f] text-white px-4 py-2 rounded-full text-xs font-bold font-display shadow-xs transition duration-150 cursor-pointer focus:outline-none"
                        id="btn-workspace-finish-session"
                      >
                        {t('close_meeting')}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopenSession(activeSession.id)}
                        className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded-full text-xs font-bold font-display shadow-xs transition duration-150 cursor-pointer focus:outline-none"
                        id="btn-workspace-reopen-session"
                      >
                        {t('activate_session')}
                      </button>
                    )}
                    
                    <button
                      onClick={() => setShowReport(true)}
                      className="bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#0b57d0] text-[#0b57d0] px-4 py-2 rounded-full text-xs font-bold font-display shadow-xs transition duration-150 cursor-pointer focus:outline-none"
                      id="btn-workspace-quick-report"
                    >
                      {t('document_result')}
                    </button>
                  </div>
                </div>

                {/* Sub Metadata Info strip */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[10px] text-slate-500 mt-4.5 pt-3.5 border-t border-slate-100 font-sans font-bold">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{t('date')}: {activeSession.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-slate-400" />
                    <span>{t('time')}: {activeSession.time}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <MapPin size={13} className="text-slate-400 translate-y-[0.5px]" />
                    <span className="truncate">{t('location')}: {activeSession.location}</span>
                  </div>
                </div>
              </div>

              {/* Workspace Navigation Tabs */}
              <div className="border-b border-slate-250 bg-slate-50/50 flex px-1.5 overflow-x-auto gap-1" id="workspace-tabs-bar">
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
                      className={`py-3.5 px-4 text-xs font-bold font-display border-b-2 flex items-center gap-2 whitespace-nowrap transition duration-150 cursor-pointer ${
                        isCur
                          ? 'border-[#0b57d0] text-[#0b57d0] bg-blue-50/15'
                          : 'border-transparent text-slate-550 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                      id={`tab-button-${tb.id}`}
                    >
                      <Icon size={14} className={isCur ? 'text-[#0b57d0]' : 'text-slate-400'} />
                      <span>{tb.label}</span>
                      <span className={`text-[9px] font-sans px-2.5 py-0.5 rounded-full font-bold border ${isCur ? 'bg-blue-50 text-[#0b57d0] border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {tb.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Workspace Active Panels */}
              <div className="p-6 flex-1 bg-white" id="workspace-viewports">
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
        <p className="uppercase tracking-wider font-bold font-display">&copy; 2026 {regencyName} | E-Musyawarah {villageName} Seksi Pemerintahan.</p>
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
