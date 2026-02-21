import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pythonCourseData } from '../data/python-course-data';
import {
    ArrowLeft, ArrowRight, CheckCircle, Book, Code as CodeIcon,
    Menu, X, Lock, PlayCircle, ChevronDown, ChevronRight, CheckCircle2,
    RotateCcw, Terminal, AlertCircle, Layout as LayoutIcon, Maximize2, Minimize2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper: Mock Python Interpreter ---
const mockPythonExecution = (code: string): { output: string, error?: string } => {
    try {
        const lines = code.split('\n');
        const outputLines: string[] = [];
        const variables: Record<string, any> = {};

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            // Handle print("text") or print('text') or print(var)
            // Very basic regex for demo purposes
            const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
            if (printMatch) {
                const content = printMatch[1].trim();
                // Check if string literal
                if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                    outputLines.push(content.slice(1, -1));
                }
                // Check if number
                else if (!isNaN(Number(content))) {
                    outputLines.push(content);
                }
                // Check if variable
                else if (variables.hasOwnProperty(content)) {
                    outputLines.push(String(variables[content]));
                }
                // Check basic arithmetic in print like print(2 + 2)
                // Secure check: only allow digits, whitespace, and basic math operators
                else if (/^[\d\s+\-*/().]+$/.test(content)) {
                    try {
                        // eslint-disable-next-line
                        outputLines.push(String(eval(content)));
                    } catch {
                        outputLines.push(content); // fallback
                    }
                }
                else {
                    outputLines.push(content); // Fallback print whatever
                }
                return;
            }

            // Handle variable assignment: x = 5, name = "John"
            const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)$/);
            if (assignMatch) {
                const varName = assignMatch[1];
                let value = assignMatch[2].trim();
                // Attempt to parse value
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    variables[varName] = value.slice(1, -1);
                } else if (!isNaN(Number(value))) {
                    variables[varName] = Number(value);
                } else {
                    variables[varName] = value;
                }
            }
        });

        return { output: outputLines.join('\n') };
    } catch (err) {
        return { output: '', error: 'Syntax Error: Unexpected token' };
    }
};


export default function PythonLesson() {
    const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile, sidebar logic below handles desktop
    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

    // Lesson State
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);

    // Editor State
    const [userCode, setUserCode] = useState('');
    const [codeOutput, setCodeOutput] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    // Progress State
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    // Logic to handle layout mode
    const isInteractive = pythonCourseData.modules.find(m => m.id === moduleId)?.lessons.find(l => l.id === lessonId)?.type === 'interactive-code';

    // Load progress
    useEffect(() => {
        const saved = localStorage.getItem('python-course-progress');
        if (saved) {
            setCompletedLessons(new Set(JSON.parse(saved)));
        }
        if (moduleId) {
            setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
        }
    }, [moduleId]);

    // Find current data
    const moduleIndex = pythonCourseData.modules.findIndex(m => m.id === moduleId);
    const module = pythonCourseData.modules[moduleIndex];
    const lessonIndex = module?.lessons.findIndex(l => l.id === lessonId);
    const lesson = module?.lessons[lessonIndex];

    // Reset editor when lesson changes
    useEffect(() => {
        if (lesson) {
            if (lesson.exercises && lesson.exercises.length > 0) {
                setUserCode(lesson.exercises[0].starterCode || lesson.codeExample || '');
                setActiveTab('exercises'); // Default to exercises if available
            } else {
                setUserCode(lesson.codeExample || '');
                setActiveTab('theory');
            }
            setCodeOutput(null);
            setCurrentExerciseIndex(0);
            setSelectedAnswers({});
            setShowResults(false);
        }
    }, [lessonId]);

    // Derived State
    const currentExercise = lesson?.exercises?.[currentExerciseIndex];

    // Helper to check if a lesson is locked
    const isLessonLocked = (targetModuleId: string, targetLessonId: string) => {
        const targetModIndex = pythonCourseData.modules.findIndex(m => m.id === targetModuleId);
        if (targetModIndex === 0 && targetLessonId === pythonCourseData.modules[0].lessons[0].id) return false;
        if (targetModIndex > 0) {
            const prevModule = pythonCourseData.modules[targetModIndex - 1];
            if (!prevModule.lessons.every(l => completedLessons.has(l.id))) return true;
        }
        const allLessons: { mId: string, lId: string }[] = [];
        pythonCourseData.modules.forEach(m => m.lessons.forEach(l => allLessons.push({ mId: m.id, lId: l.id })));
        const targetIndex = allLessons.findIndex(item => item.mId === targetModuleId && item.lId === targetLessonId);
        if (targetIndex <= 0) return false;
        return !completedLessons.has(allLessons[targetIndex - 1].lId);
    };

    const markLessonComplete = () => {
        if (lessonId) {
            const newCompleted = new Set(completedLessons);
            newCompleted.add(lessonId);
            setCompletedLessons(newCompleted);
            localStorage.setItem('python-course-progress', JSON.stringify([...newCompleted]));
        }
    };

    const handleNext = () => {
        markLessonComplete();
        if (!module || lessonIndex === undefined) return;

        if (lessonIndex < module.lessons.length - 1) {
            navigate(`/course/python/module/${moduleId}/lesson/${module.lessons[lessonIndex + 1].id}`);
        } else if (moduleIndex < pythonCourseData.modules.length - 1) {
            const nextModule = pythonCourseData.modules[moduleIndex + 1];
            navigate(`/course/python/module/${nextModule.id}/lesson/${nextModule.lessons[0].id}`);
        } else {
            navigate('/course/python');
        }
    };

    const runCode = () => {
        setCodeOutput({ text: 'Running...', type: 'info' });

        setTimeout(() => {
            const result = mockPythonExecution(userCode);

            // If in exercise mode, validate against current exercise
            if (activeTab === 'exercises' && currentExercise) {
                // Check if output matches expected output (flexible check)
                const expected = currentExercise.testCases[0]?.expectedOutput;

                // Very basic validation logic
                if (result.error) {
                    setCodeOutput({ text: result.error, type: 'error' });
                } else if (expected && result.output.trim().includes(expected.trim())) {
                    setCodeOutput({ text: result.output + '\n\n✅ Отлично! Задание выполнено верно.', type: 'success' });
                } else {
                    setCodeOutput({
                        text: result.output + `\n\n❌ Неверно. Ожидалось: "${expected}"`,
                        type: 'error'
                    });
                }
            } else {
                // Just run
                if (result.error) {
                    setCodeOutput({ text: result.error, type: 'error' });
                } else {
                    setCodeOutput({ text: result.output || '(No output)', type: 'success' });
                }
            }
        }, 500);
    };

    if (!module || !lesson) return null;

    // --- Render Components ---

    const Sidebar = () => (
        <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 300 : 0, opacity: sidebarOpen ? 1 : 0 }}
            className={`fixed inset-y-0 left-0 z-40 bg-[#161b22] border-r border-gray-800 flex flex-col transition-all duration-300 overflow-hidden ${!sidebarOpen ? 'w-0' : 'w-[300px]'}`}
        >
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#0d1117]">
                <h3 className="font-bold text-white">Syllabus</h3>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                {pythonCourseData.modules.map((m, idx) => {
                    const isLocked = idx > 0 && !pythonCourseData.modules[idx - 1].lessons.every(l => completedLessons.has(l.id));
                    const isExpanded = expandedModules[m.id];
                    return (
                        <div key={m.id} className="rounded-lg overflow-hidden border border-gray-800 bg-[#0d1117]">
                            <button
                                onClick={() => !isLocked && setExpandedModules(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                                className={`w-full p-3 flex items-center justify-between text-left ${isLocked ? 'opacity-50' : 'hover:bg-gray-800'}`}
                            >
                                <div className="text-sm font-semibold text-gray-300">Module {idx + 1}: {m.title}</div>
                                {isLocked ? <Lock size={14} /> : isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            {isExpanded && !isLocked && (
                                <div className="bg-[#161b22] border-t border-gray-800">
                                    {m.lessons.map((l, lIdx) => {
                                        const isActive = l.id === lessonId;
                                        const isComp = completedLessons.has(l.id);
                                        return (
                                            <button
                                                key={l.id}
                                                onClick={() => navigate(`/course/python/module/${m.id}/lesson/${l.id}`)}
                                                className={`w-full text-left p-3 pl-6 text-xs flex items-center gap-2 ${isActive ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
                                            >
                                                {isComp ? <CheckCircle size={12} className="text-green-500" /> : <CheckCircle size={12} className="opacity-0" />}
                                                <span className="truncate">{lIdx + 1}. {l.title}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </motion.aside>
    );

    const TopBar = () => (
        <header className="h-16 bg-[#0d1117] border-b border-gray-800 flex items-center justify-between px-4 z-30 sticky top-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400"><Menu size={20} /></button>
                <nav className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/my-courses" className="hover:text-white transition-colors">Courses</Link>
                    <ChevronRight size={14} />
                    <Link to="/course/python" className="hover:text-white transition-colors">Python</Link>
                    <ChevronRight size={14} />
                    <span className="text-white font-medium line-clamp-1">{lesson.title}</span>
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">
                    {lesson.type === 'interactive-code' ? <CodeIcon size={14} className="text-blue-400" /> : <Book size={14} className="text-purple-400" />}
                    {lesson.type.replace('-', ' ').toUpperCase()}
                </div>
                <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                    Next Lesson <ArrowRight size={16} />
                </button>
            </div>
        </header>
    );

    // --- Content View: Split Screen for Code, Single Column for Theory ---
    return (
        <div className="min-h-screen bg-[#0f1117] text-gray-300 font-sans flex flex-col">
            <TopBar />
            <Sidebar />

            <div className="flex-1 flex overflow-hidden relative">
                {/* LEFT PANEL: Theory / Instructions */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar bg-[#0d1117] p-8 ${isInteractive ? 'md:max-w-[40%] border-r border-gray-800' : 'max-w-4xl mx-auto border-x border-gray-800'}`}>
                    <div className="prose prose-invert prose-blue max-w-none">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
                            <div className="text-gray-500 text-sm">{module.title} • {lesson.estimatedTime} min read</div>
                        </div>

                        {/* Toggle for Theory/Exercises in Mobile or small screens if needed, but here we just show Content */}
                        <ReactMarkdown
                            components={{
                                code(props) {
                                    const { children, className, node, ref, ...rest } = props;
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            children={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                            style={vscDarkPlus as any}
                                        />
                                    ) : (
                                        <code {...rest} className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
                                            {children}
                                        </code>
                                    );
                                },
                                p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed text-base" {...props} />,
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-6 mt-8 border-b border-gray-800 pb-2" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mb-3 mt-6" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 text-gray-300 mb-4 space-y-1" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 text-gray-300 mb-4 space-y-1" {...props} />,
                                li: ({ node, ...props }) => <li className="text-gray-300 pl-1" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-800/50 rounded-r-lg text-gray-300 italic" {...props} />,
                            }}
                        >
                            {lesson.content}
                        </ReactMarkdown>
                    </div>

                    {/* Quiz UI - Only if not interactive code (usually) or at bottom */}
                    {lesson.type === 'quiz' && lesson.quizQuestions && (
                        <div className="mt-12 space-y-8">
                            {lesson.quizQuestions.map((q, idx) => (
                                <div key={q.id} className="bg-[#161b22] p-6 rounded-2xl border border-gray-800">
                                    <h3 className="text-lg font-bold text-white mb-4">{idx + 1}. {q.question}</h3>
                                    <div className="space-y-3">
                                        {q.options.map((opt, oIdx) => (
                                            <button
                                                key={oIdx}
                                                onClick={() => !showResults && setSelectedAnswers(p => ({ ...p, [q.id]: oIdx }))}
                                                className={`w-full text-left p-4 rounded-xl border transition-all ${showResults
                                                    ? oIdx === q.correctAnswer ? 'bg-green-900/20 border-green-500 text-green-300' : selectedAnswers[q.id] === oIdx ? 'bg-red-900/20 border-red-500 text-red-300' : 'border-gray-800 opacity-50'
                                                    : selectedAnswers[q.id] === oIdx ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#0d1117] border-gray-700 hover:border-gray-500'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {showResults && selectedAnswers[q.id] !== q.correctAnswer && (
                                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-900/50 rounded-lg text-sm text-blue-200">
                                            💡 {q.explanation}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => setShowResults(true)}
                                disabled={showResults}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all disabled:opacity-50"
                            >
                                {showResults ? 'Quiz Completed' : 'Submit Answers'}
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT PANEL: Code Editor & Playground (Only for Interactive Lessons) */}
                {isInteractive && (
                    <div className="hidden md:flex flex-col flex-1 bg-[#0d1117]">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-800 bg-[#161b22]">
                            {lesson.exercises && lesson.exercises.length > 0 && (
                                <button
                                    onClick={() => { setActiveTab('exercises'); setUserCode(currentExercise?.starterCode || ''); }}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'exercises' ? 'border-blue-500 text-white bg-[#0d1117]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                                >
                                    <TargetIcon /> Practice ({lesson.exercises.length})
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab('theory')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'theory' ? 'border-blue-500 text-white bg-[#0d1117]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                            >
                                <CodeIcon size={16} /> Playground
                            </button>
                        </div>

                        {/* Exercise Header */}
                        {activeTab === 'exercises' && currentExercise && (
                            <div className="p-4 bg-blue-900/10 border-b border-blue-900/30">
                                <h3 className="font-bold text-blue-300 mb-1">Задача {currentExerciseIndex + 1}: {currentExercise.description}</h3>
                                <div className="text-xs text-gray-400">Hints: {currentExercise.hints?.join(', ') || 'None'}</div>
                                {lesson.exercises && lesson.exercises.length > 1 && (
                                    <div className="flex gap-2 mt-3">
                                        {lesson.exercises.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setCurrentExerciseIndex(idx); setUserCode(lesson.exercises?.[idx].starterCode || ''); }}
                                                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all ${currentExerciseIndex === idx ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'}`}
                                            >
                                                {idx + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Code Editor */}
                        <div className="flex-1 relative font-mono text-sm group">
                            <div className="absolute top-0 right-0 p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setUserCode(activeTab === 'exercises' ? currentExercise?.starterCode || '' : lesson.codeExample || '')} className="p-1.5 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Reset Code">
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                            <textarea
                                value={userCode}
                                onChange={(e) => setUserCode(e.target.value)}
                                className="w-full h-full bg-[#0d1117] p-6 text-gray-300 resize-none focus:outline-none leading-relaxed"
                                spellCheck={false}
                                placeholder="Write your Python code here..."
                            />
                        </div>

                        {/* Output Console */}
                        <div className="h-1/3 bg-[#0d1117] border-t border-gray-800 flex flex-col">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-wider">
                                    <Terminal size={12} /> Console
                                </div>
                                <button
                                    onClick={runCode}
                                    className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-md transition-all shadow-lg shadow-green-900/20 active:scale-95"
                                >
                                    <PlayCircle size={14} /> Run Code
                                </button>
                            </div>
                            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
                                {codeOutput ? (
                                    <div className={`${codeOutput.type === 'error' ? 'text-red-400' : codeOutput.type === 'success' ? 'text-green-400' : 'text-blue-300'} whitespace-pre-wrap`}>
                                        {codeOutput.text}
                                    </div>
                                ) : (
                                    <div className="text-gray-600 italic">Run your code to see output...</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const TargetIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
