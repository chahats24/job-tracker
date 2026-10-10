import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../services/api';

const getResourceLinks = (company) => {
  const c = encodeURIComponent(company);
  const cl = company.toLowerCase();
  return [
    {
      label: '💻 InterviewBit',
      url: `https://www.interviewbit.com/search/?q=${c}+interview`,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    },
    {
      label: '🔍 Glassdoor',
      url: `https://www.glassdoor.com/Interview/${c}-Interview-Questions-E0.htm`,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
    },
    {
      label: '⭐ AmbitionBox',
      url: `https://www.ambitionbox.com/interviews/${cl}-interview-questions`,
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100'
    }
  ];
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
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplications();
  }, [token]);

  const interviewApps = applications.filter(app => app.status === 'Interview');

  const handleGenerate = async () => {
    if (!selectedApp) return;
    setLoading(true);
    setQuestions(null);
    setRevealedAnswers({});
    try {
      const response = await api.post(
        '/ai/generate-questions',
        { company: selectedApp.company, role: selectedApp.role }
      );
      setQuestions(response.data);
      setActiveTab('technical');
      setDifficultyFilter('All');
      setQuestionCount(5);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getFilteredQuestions = () => {
    if (!questions || !questions[activeTab]) return [];
    let filtered = questions[activeTab];
    if (difficultyFilter !== 'All') {
      filtered = filtered.filter(q => q.difficulty === difficultyFilter);
    }
    return filtered.slice(0, questionCount);
  };

  const tabs = ['technical', 'behavioral', 'hr', 'coding'];

  const tabColors = {
    technical: 'bg-blue-100 text-blue-700',
    behavioral: 'bg-amber-100 text-amber-700',
    hr: 'bg-green-100 text-green-700',
    coding: 'bg-purple-100 text-purple-700',
  };

  const answerColors = {
    technical: 'bg-blue-50 border-blue-400',
    behavioral: 'bg-amber-50 border-amber-400',
    hr: 'bg-green-50 border-green-400',
    coding: 'bg-purple-50 border-purple-400',
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Left Panel */}
      <div className="w-72 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Select Application</h2>
          <p className="text-xs text-gray-500 mt-0.5">Interview stage only</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {interviewApps.map(app => (
            <div
              key={app._id}
              onClick={() => {
                setSelectedApp(app);
                setQuestions(null);
                setRevealedAnswers({});
                setDifficultyFilter('All');
                setQuestionCount(5);
              }}
              className={`p-4 border-b border-gray-50 cursor-pointer
                ${selectedApp?._id === app._id
                  ? 'bg-blue-50 border-l-4 border-l-blue-800'
                  : 'hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${selectedApp?._id === app._id ? 'text-blue-800' : 'text-gray-800'}`}>
                    {app.company}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{app.role}</p>
                </div>
                <span className="text-gray-400 text-sm">→</span>
              </div>
            </div>
          ))}
          {interviewApps.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-2xl mb-2">📋</p>
              <p className="text-sm text-gray-400">No applications in Interview stage</p>
              <p className="text-xs text-gray-400 mt-1">Update status to Interview first</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-6">

          {/* Empty state */}
          {!selectedApp && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-5xl mb-4">🎯</p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Interview Prep Room</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Select an application from the left to generate AI-powered interview questions
              </p>
            </div>
          )}

          {selectedApp && (
            <div className="flex flex-col gap-5 max-w-3xl">

              {/* Header */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedApp.company}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedApp.role}</p>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading
                      ? <><span className="animate-spin">⏳</span> Generating...</>
                      : <>✨ Generate Questions</>
                    }
                  </button>
                </div>

                {/* PYQ Links */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">📚 Free PYQ Resources</p>
                  <div className="flex flex-wrap gap-2">
                    {getResourceLinks(selectedApp.company).map((link, i) => (

                      <a key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${link.color}`}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prompt */}
              {!questions && !loading && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
                  <p className="text-3xl mb-3">🤖</p>
                  <p className="text-blue-800 font-medium text-sm mb-1">Ready to generate questions</p>
                  <p className="text-blue-600 text-xs">
                    Click Generate — AI creates 15 questions per category (5 Easy + 5 Medium + 5 Hard)
                  </p>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
                  <p className="text-3xl mb-3 animate-bounce">🤖</p>
                  <p className="text-blue-700 text-sm animate-pulse">
                    Generating 60 personalized questions...
                  </p>
                </div>
              )}

              {/* Questions */}
              {questions && (
                <div className="flex flex-col gap-4">

                  {/* Category tabs */}
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setRevealedAnswers({});
                          setDifficultyFilter('All');
                        }}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors
                          ${activeTab === tab
                            ? 'bg-white text-blue-800 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {tab === 'hr' ? 'HR' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Filters */}
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-6 flex-wrap">

                      {/* Difficulty */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600">Difficulty:</span>
                        <div className="flex gap-1.5">
                          {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                            <button
                              key={d}
                              onClick={() => {
                                setDifficultyFilter(d);
                                setRevealedAnswers({});
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                                ${difficultyFilter === d
                                  ? d === 'All' ? 'bg-gray-800 text-white border-gray-800'
                                    : d === 'Easy' ? 'bg-green-500 text-white border-green-500'
                                      : d === 'Medium' ? 'bg-amber-500 text-white border-amber-500'
                                        : 'bg-red-500 text-white border-red-500'
                                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Count */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600">Show:</span>
                        <div className="flex gap-1.5">
                          {[3, 5, 10, 15].map(n => (
                            <button
                              key={n}
                              onClick={() => setQuestionCount(n)}
                              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                                ${questionCount === n
                                  ? 'bg-blue-800 text-white border-blue-800'
                                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Count display */}
                      <span className="text-xs text-gray-400 ml-auto">
                        Showing {filteredQuestions.length} of {
                          difficultyFilter === 'All'
                            ? questions[activeTab]?.length
                            : questions[activeTab]?.filter(q => q.difficulty === difficultyFilter).length
                        } questions
                      </span>
                    </div>
                  </div>

                  {/* Show/hide all */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const allRevealed = filteredQuestions.every((_, i) => revealedAnswers[i]);
                        const newRevealed = {};
                        if (!allRevealed) {
                          filteredQuestions.forEach((_, i) => { newRevealed[i] = true; });
                        }
                        setRevealedAnswers(newRevealed);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {filteredQuestions.every((_, i) => revealedAnswers[i])
                        ? '🙈 Hide all answers'
                        : '👁️ Show all answers'
                      }
                    </button>
                  </div>

                  {/* No results */}
                  {filteredQuestions.length === 0 && (
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
                      <p className="text-2xl mb-2">🔍</p>
                      <p className="text-gray-500 text-sm">No questions found</p>
                      <p className="text-gray-400 text-xs mt-1">Try a different difficulty</p>
                    </div>
                  )}

                  {/* Question cards */}
                  <div className="flex flex-col gap-4">
                    {filteredQuestions.map((item, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="flex flex-col gap-1 flex-shrink-0">
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${tabColors[activeTab]}`}>
                                  Q{i + 1}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-md text-center ${difficultyColors[item.difficulty]}`}>
                                  {item.difficulty}
                                </span>
                              </div>
                              <p className="text-sm text-gray-800 leading-relaxed">{item.question}</p>
                            </div>
                            <button
                              onClick={() => toggleAnswer(i)}
                              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border
                                ${revealedAnswers[i]
                                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                }`}
                            >
                              {revealedAnswers[i] ? '🙈 Hide' : '👁️ Answer'}
                            </button>
                          </div>
                        </div>

                        {revealedAnswers[i] && (
                          <div className="px-5 pb-5">
                            <div className={`rounded-lg p-4 border-l-4 ${answerColors[activeTab]}`}>
                              <p className="text-xs font-semibold text-gray-600 mb-2">💡 Sample Answer</p>
                              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Regenerate */}
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full border border-blue-200 text-blue-700 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    🔄 Regenerate All Questions
                  </button>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;