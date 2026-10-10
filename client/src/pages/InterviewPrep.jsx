import { useState, useEffect, useContext } from 'react';
import {
  Sparkles,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  Bot,
  Target,
  BookOpen,
  Loader2,
  BriefcaseBusiness,
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../services/api';

const getResourceLinks = company => {
  const query = encodeURIComponent(`${company} interview questions`);

  return [
    {
      label: 'InterviewBit',
      url: `https://www.google.com/search?q=site%3Ainterviewbit.com+${query}`
    },
    {
      label: 'Glassdoor',
      url: `https://www.google.com/search?q=site%3Aglassdoor.com%2FInterview+${query}`
    },
    {
      label: 'AmbitionBox',
      url: `https://www.google.com/search?q=site%3Aambitionbox.com%2Finterviews+${query}`
    }
  ];
};

const tabs = ['technical', 'behavioral', 'hr', 'coding'];

const tabLabels = {
  technical: 'Technical',
  behavioral: 'Behavioral',
  hr: 'HR',
  coding: 'Coding',
};

const InterviewPrep = () => {
  const { token } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [activeTab, setActiveTab] = useState('technical');
  const [loading, setLoading] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [questionCount, setQuestionCount] = useState(5);

  useEffect(() => {
    api
      .get('/applications')
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const interviewApps = applications.filter(
    (app) => app.status === 'Interview'
  );

  const selectApp = (app) => {
    setSelectedApp(app);
    setQuestions(null);
    setRevealedAnswers({});
    setDifficultyFilter('All');
    setQuestionCount(5);
  };

  const handleGenerate = async () => {
    if (!selectedApp) return;

    setLoading(true);
    setQuestions(null);
    setRevealedAnswers({});

    try {
      const response = await api.post('/ai/generate-questions', {
        company: selectedApp.company,
        role: selectedApp.role,
      });

      setQuestions(response.data);
      setActiveTab('technical');
      setDifficultyFilter('All');
      setQuestionCount(5);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions =
    !questions || !questions[activeTab]
      ? []
      : questions[activeTab]
          .filter(
            (question) =>
              difficultyFilter === 'All' ||
              question.difficulty === difficultyFilter
          )
          .slice(0, questionCount);

  return (
    <div className="interview-page">
      <Navbar />

      <main className="interview-container">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <section className="interview-page-header">
          <div>
            <div className="interview-eyebrow">
              <Sparkles size={14} />
              AI INTERVIEW PREP
            </div>

            <h1>Prepare for the interviews that matter.</h1>

            <p>
              Select an interview-stage application and generate
              personalized questions to practice with.
            </p>
          </div>

          <div className="interview-header-badge">
            <Bot size={16} />
            AI-powered practice
          </div>
        </section>

        {/* =====================================================
            MAIN WORKSPACE
        ====================================================== */}
        <div className="interview-workspace">

          {/* ===================================================
              LEFT APPLICATION SIDEBAR
          ==================================================== */}
          <aside className="interview-sidebar">
            <div className="interview-sidebar-header">
              <div>
                <span className="interview-sidebar-eyebrow">
                  Interview studio
                </span>

                <h2>Choose an interview</h2>

                <p>
                  Only applications currently marked as Interview
                  appear here.
                </p>
              </div>

              <div className="interview-sidebar-icon">
                <BriefcaseBusiness size={17} />
              </div>
            </div>

            <div className="interview-application-list">
              {interviewApps.map((app) => (
                <button
                  key={app._id}
                  onClick={() => selectApp(app)}
                  className={`interview-application-item ${
                    selectedApp?._id === app._id
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className="interview-company-avatar">
                    {app.company?.charAt(0).toUpperCase() || '?'}
                  </div>

                  <div className="interview-application-info">
                    <p>{app.company}</p>
                    <span>{app.role}</span>
                  </div>

                  <ChevronRight
                    size={16}
                    className="interview-application-arrow"
                  />
                </button>
              ))}

              {!interviewApps.length && (
                <div className="interview-sidebar-empty">
                  <div className="interview-empty-icon">
                    <Target size={20} />
                  </div>

                  <strong>No interview applications</strong>

                  <p>
                    Update an application to Interview to unlock
                    this workspace.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* ===================================================
              RIGHT WORKSPACE
          ==================================================== */}
          <section className="interview-main">

            {/* ===============================================
                EMPTY / INITIAL STATE
            ================================================ */}
            {!selectedApp && (
              <div className="interview-welcome">
                <div className="interview-welcome-glow" />

                <div className="interview-welcome-content">
                  <div className="interview-welcome-icon">
                    <Bot size={30} />
                  </div>

                  <span className="interview-welcome-eyebrow">
                    AI INTERVIEW STUDIO
                  </span>

                  <h2>Practice with purpose.</h2>

                  <p>
                    Select an interview-stage application from the
                    left to generate personalized technical,
                    behavioral, HR and coding questions.
                  </p>

                  <div className="interview-welcome-features">
                    <div>
                      <Sparkles size={15} />
                      Personalized questions
                    </div>

                    <div>
                      <BookOpen size={15} />
                      Sample answers
                    </div>

                    <div>
                      <Target size={15} />
                      Multiple categories
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================
                SELECTED APPLICATION
            ================================================ */}
            {selectedApp && (
              <div className="interview-content">

                {/* =========================================
                    APPLICATION HERO
                ========================================== */}
                <div className="interview-hero-card">
                  <div className="interview-hero-glow" />

                  <div className="interview-hero-content">
                    <div className="interview-hero-info">
                      <div className="interview-hero-eyebrow">
                        <Sparkles size={14} />
                        PERSONALIZED PREP
                      </div>

                      <h2>{selectedApp.company}</h2>

                      <p>{selectedApp.role}</p>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="interview-generate-button"
                    >
                      {loading ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Sparkles size={17} />
                      )}

                      {loading
                        ? 'Generating...'
                        : questions
                        ? 'Regenerate questions'
                        : 'Generate questions'}
                    </button>
                  </div>

                  <div className="interview-resources">
                    <span className="interview-resources-label">
                      Practice resources
                    </span>

                    <div className="interview-resource-links">
                      {getResourceLinks(selectedApp.company).map(
                        (link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="interview-resource-link"
                          >
                            {link.label}
                            <ExternalLink size={12} />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* =========================================
                    READY STATE
                ========================================== */}
                {!questions && !loading && (
                  <div className="interview-ready-card">
                    <div className="interview-ready-icon">
                      <BookOpen size={22} />
                    </div>

                    <h3>Ready when you are</h3>

                    <p>
                      Generate a personalized set of questions
                      based on this company and role.
                    </p>

                    <button
                      onClick={handleGenerate}
                      className="interview-ready-button"
                    >
                      <Sparkles size={15} />
                      Start preparation
                    </button>
                  </div>
                )}

                {/* =========================================
                    LOADING STATE
                ========================================== */}
                {loading && (
                  <div className="interview-loading-card">
                    <div className="interview-loading-icon">
                      <Bot size={25} />
                    </div>

                    <h3>Building your interview set...</h3>

                    <p>
                      Generating technical, behavioral, HR and
                      coding questions.
                    </p>

                    <div className="interview-loading-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}

                {/* =========================================
                    QUESTIONS
                ========================================== */}
                {questions && (
                  <div className="interview-question-area">

                    {/* TABS + FILTERS */}
                    <div className="interview-controls">

                      <div className="interview-tabs">
                        {tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => {
                              setActiveTab(tab);
                              setRevealedAnswers({});
                              setDifficultyFilter('All');
                            }}
                            className={`interview-tab ${
                              activeTab === tab ? 'active' : ''
                            }`}
                          >
                            {tabLabels[tab]}
                          </button>
                        ))}
                      </div>

                      <div className="interview-filters">
                        <div className="interview-select-wrapper">
                          <span>Difficulty</span>

                          <select
                            value={difficultyFilter}
                            onChange={(e) =>
                              setDifficultyFilter(e.target.value)
                            }
                            className="interview-select"
                          >
                            <option>All</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                          </select>
                        </div>

                        <div className="interview-select-wrapper">
                          <span>Questions</span>

                          <select
                            value={questionCount}
                            onChange={(e) =>
                              setQuestionCount(
                                Number(e.target.value)
                              )
                            }
                            className="interview-select"
                          >
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* QUESTION COUNT */}
                    <div className="interview-question-heading">
                      <div>
                        <span>YOUR PRACTICE SET</span>

                        <h3>
                          {tabLabels[activeTab]} questions
                        </h3>
                      </div>

                      <div className="interview-question-count">
                        {filteredQuestions.length}{' '}
                        {filteredQuestions.length === 1
                          ? 'question'
                          : 'questions'}
                      </div>
                    </div>

                    {/* QUESTION CARDS */}
                    <div className="interview-question-list">
                      {filteredQuestions.map((item, i) => (
                        <div
                          key={`${activeTab}-${i}`}
                          className="interview-question-card"
                        >
                          <div className="interview-question-body">
                            <div className="interview-question-top">
                              <div className="interview-question-meta">
                                <span>
                                  QUESTION{' '}
                                  {String(i + 1).padStart(2, '0')}
                                </span>

                                <span
                                  className={`interview-difficulty ${
                                    item.difficulty === 'Easy'
                                      ? 'easy'
                                      : item.difficulty === 'Hard'
                                      ? 'hard'
                                      : 'medium'
                                  }`}
                                >
                                  {item.difficulty}
                                </span>
                              </div>

                              <button
                                onClick={() =>
                                  setRevealedAnswers((prev) => ({
                                    ...prev,
                                    [i]: !prev[i],
                                  }))
                                }
                                className={`interview-answer-button ${
                                  revealedAnswers[i]
                                    ? 'revealed'
                                    : ''
                                }`}
                              >
                                {revealedAnswers[i] ? (
                                  <EyeOff size={15} />
                                ) : (
                                  <Eye size={15} />
                                )}

                                {revealedAnswers[i]
                                  ? 'Hide answer'
                                  : 'Show answer'}
                              </button>
                            </div>

                            <p className="interview-question-text">
                              {item.question}
                            </p>
                          </div>

                          {revealedAnswers[i] && (
                            <div className="interview-answer">
                              <div className="interview-answer-label">
                                <Sparkles size={13} />
                                SAMPLE ANSWER
                              </div>

                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* NO MATCH */}
                    {!filteredQuestions.length && (
                      <div className="interview-no-results">
                        <Target size={22} />

                        <h3>No questions found</h3>

                        <p>
                          No questions match the selected difficulty
                          filter.
                        </p>
                      </div>
                    )}

                    {/* REGENERATE */}
                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="interview-regenerate-button"
                    >
                      <RefreshCw size={16} />
                      Regenerate all questions
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default InterviewPrep;