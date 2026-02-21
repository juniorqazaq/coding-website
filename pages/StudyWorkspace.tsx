import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Check, Trash2, Save, Volume2, ArrowLeft, Coffee, Music, ListTodo, PenTool, ArrowRight, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { formatTime } from '../utils';

// --- Types ---
interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface Sound {
    id: string;
    name: string;
    icon: React.ReactNode;
    url?: string;
}

interface Challenge {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'locked' | 'open' | 'solved';
}

// --- Constants ---
const POMODORO_WORK = 25 * 60;
const POMODORO_BREAK = 5 * 60;

const AMBIENT_SOUNDS: Sound[] = [
    { id: 'rain', name: 'Шум дождя', icon: <span className="text-xl">🌧️</span> },
    { id: 'cafe', name: 'Атмосфера кафе', icon: <span className="text-xl">☕</span> },
    { id: 'lofi', name: 'Lo-Fi биты', icon: <span className="text-xl">🎧</span> },
    { id: 'forest', name: 'Тихий лес', icon: <span className="text-xl">🌲</span> },
];

const MOCK_CHALLENGES: Challenge[] = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'solved' },
    { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', status: 'open' },
    { id: 3, title: 'LRU Cache', difficulty: 'Medium', status: 'open' },
    { id: 4, title: 'Merge k Sorted Lists', difficulty: 'Hard', status: 'locked' },
    { id: 5, title: 'Trapping Rain Water', difficulty: 'Hard', status: 'locked' },
];

export const StudyWorkspace: React.FC = () => {
    const { addXP, addStudyMinutes } = useUserStore();
    // --- State: Timer ---
    const [timeLeft, setTimeLeft] = useState(POMODORO_WORK);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

    // --- State: Tasks ---
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    // --- State: Challenges ---
    const [middleTab, setMiddleTab] = useState<'goals' | 'challenges'>('goals');

    // --- State: Notes ---
    const [notes, setNotes] = useState('');

    // --- State: Audio ---
    const [activeSound, setActiveSound] = useState<string | null>(null);
    const [volume, setVolume] = useState(50);

    // --- Notifications ---
    const playBeep = () => {
        try {
            const ctx = new window.AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1);
        } catch (e) {
            console.error("Audio Context restricted");
        }
    };

    const notifyUser = (message: string) => {
        playBeep();
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                new Notification("Tamasha Learning", { body: message });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("Tamasha Learning", { body: message });
                    }
                });
            }
        }
    };

    // --- Helpers: Timer ---
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isTimerRunning) {
            setIsTimerRunning(false);
            if (timerMode === 'work') {
                setTimerMode('break');
                setTimeLeft(POMODORO_BREAK);
                addXP(10); // Reward for completing a focus session
                addStudyMinutes(25);
                notifyUser("Время отдыха! Отличная работа.");
            } else {
                setTimerMode('work');
                setTimeLeft(POMODORO_WORK);
                notifyUser("Перерыв окончен. Пора за работу!");
            }
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timeLeft, timerMode]);

    const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
    const resetTimer = () => {
        setIsTimerRunning(false);
        setTimeLeft(timerMode === 'work' ? POMODORO_WORK : POMODORO_BREAK);
    };
    const switchMode = (mode: 'work' | 'break') => {
        setTimerMode(mode);
        setIsTimerRunning(false);
        setTimeLeft(mode === 'work' ? POMODORO_WORK : POMODORO_BREAK);
    };



    // --- Helpers: Tasks ---
    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        setTasks([...tasks, { id: Date.now().toString(), text: newTaskText, completed: false }]);
        setNewTaskText('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // --- State: AI Tutor ---
    const [activeTab, setActiveTab] = useState<'notes' | 'ai'>('notes');
    const [aiMessages, setAiMessages] = useState<{ id: number, text: string, sender: 'user' | 'ai', timestamp: Date }[]>([
        { id: 1, text: "Привет! Я твой ИИ-помощник в учебе. Спрашивай меня о чем угодно по текущей задаче!", sender: 'ai', timestamp: new Date() }
    ]);
    const [aiInput, setAiInput] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // --- Helpers: AI ---
    const handleAiSend = () => {
        if (!aiInput.trim()) return;

        const userMsg = { id: Date.now(), text: aiInput, sender: 'user' as const, timestamp: new Date() };
        setAiMessages(prev => [...prev, userMsg]);
        setAiInput('');
        setIsAiTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let response = "Интересная мысль! Расскажи поподробнее.";
            if (userMsg.text.toLowerCase().includes('python')) response = "Python отлично подходит для Data Science и веб-разработки. Нужна помощь с синтаксисом?";
            if (userMsg.text.toLowerCase().includes('help') || userMsg.text.toLowerCase().includes('помощь')) response = "Я здесь, чтобы помочь! Эффективное обучение требует отдыха. Давно делал перерыв?";

            setAiMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'ai', timestamp: new Date() }]);
            setIsAiTyping(false);
        }, 1500);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [aiMessages, isAiTyping, activeTab]);

    // --- Helpers: Notes ---
    useEffect(() => {
        const savedNotes = localStorage.getItem('study-workspace-notes');
        if (savedNotes) setNotes(savedNotes);
    }, []);

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNotes = e.target.value;
        setNotes(newNotes);
        localStorage.setItem('study-workspace-notes', newNotes);
    };

    // --- Helpers: Audio ---
    const toggleSound = (id: string) => {
        if (activeSound === id) {
            setActiveSound(null);
        } else {
            setActiveSound(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* --- Top Bar --- */}
            <div className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" title="Выйти из режима обучения">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="font-bold text-xl flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        Учебная Среда
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-medium text-sm border border-blue-100 dark:border-blue-900/50">
                        {timerMode === 'work' ? '🔥 Режим Фокуса' : '☕ Время Отдыхать'}
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">

                    {/* --- Left Column: Timer & Controls --- */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Timer Card */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className={`absolute inset-0 opacity-20 transition-colors duration-1000 ${timerMode === 'work' ? 'bg-red-500/10' : 'bg-green-500/10'}`}></div>
                            <div className="relative z-10 w-full flex flex-col justify-center items-center">
                                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full mb-8 inline-flex">
                                    <button onClick={() => switchMode('work')} className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${timerMode === 'work' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Фокус</button>
                                    <button onClick={() => switchMode('break')} className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${timerMode === 'break' ? 'bg-white dark:bg-gray-600 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Отдых</button>
                                </div>
                                <div className="relative flex justify-center items-center mb-8">
                                    <svg width="280" height="280" className="-rotate-90">
                                        <circle cx="140" cy="140" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                                        <circle
                                            cx="140" cy="140" r="120"
                                            stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray={2 * Math.PI * 120}
                                            strokeDashoffset={(2 * Math.PI * 120) - ((timeLeft / (timerMode === 'work' ? POMODORO_WORK : POMODORO_BREAK)) * (2 * Math.PI * 120))}
                                            strokeLinecap="round"
                                            className={`transition-all duration-1000 ease-linear ${timerMode === 'work' ? 'text-red-500' : 'text-green-500'}`}
                                        />
                                    </svg>
                                    <div className={`absolute text-6xl font-black tabular-nums tracking-tighter ${timerMode === 'work' ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 justify-center">
                                    <button onClick={toggleTimer} className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all ${isTimerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>{isTimerRunning ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}</button>
                                    <button onClick={resetTimer} className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><RotateCcw size={20} /></button>
                                </div>
                            </div>
                        </div>
                        {/* Ambient Sounds */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex-1">
                            <h3 className="font-bold flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-200"><Music size={20} /> Фоновые звуки</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {AMBIENT_SOUNDS.map(sound => (
                                    <button key={sound.id} onClick={() => toggleSound(sound.id)} className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${activeSound === sound.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-gray-50 dark:bg-gray-800/50'}`}>
                                        {sound.icon}
                                        <span className="text-sm font-medium">{sound.name}</span>
                                    </button>
                                ))}
                            </div>
                            {activeSound && (
                                <div className="mt-6">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2"><Volume2 size={14} /><span>Громкость</span></div>
                                    <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Middle: Task List & Challenges --- */}
                    <div className="lg:col-span-1 flex flex-col h-full">
                        <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full max-h-[calc(100vh-8rem)] overflow-hidden">
                            {/* Middle Tabs Header */}
                            <div className="flex border-b border-gray-100 dark:border-gray-700/50">
                                <button onClick={() => setMiddleTab('goals')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${middleTab === 'goals' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}><ListTodo size={18} /> Цели</button>
                                <div className="w-px bg-gray-100 dark:bg-gray-700/50"></div>
                                <button onClick={() => setMiddleTab('challenges')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${middleTab === 'challenges' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10 border-b-2 border-emerald-600 dark:border-emerald-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}><Code size={18} /> Задачи</button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                {middleTab === 'goals' ? (
                                    <>
                                        <form onSubmit={addTask} className="flex gap-2 mb-6">
                                            <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Добавить новую задачу..." className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400" />
                                            <button type="submit" disabled={!newTaskText.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-3 rounded-xl transition-colors"><Plus size={20} /></button>
                                        </form>
                                        <div className="space-y-2">
                                            {tasks.length === 0 ? (
                                                <div className="text-center py-10 text-gray-400 dark:text-gray-500"><ListTodo size={48} className="mx-auto mb-3 opacity-20" /><p>Пока нет задач. Спланируйте сессию!</p></div>
                                            ) : (
                                                tasks.map(task => (
                                                    <div key={task.id} className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${task.completed ? 'bg-gray-50 dark:bg-gray-900/50 border-transparent opacity-60' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm'}`}>
                                                        <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'}`}>{task.completed && <Check size={14} strokeWidth={3} />}</button>
                                                        <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>{task.text}</span>
                                                        <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 size={16} /></button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-3">
                                        {MOCK_CHALLENGES.map(challenge => (
                                            <div key={challenge.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${challenge.status === 'solved' ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>{challenge.status === 'solved' ? <Check size={18} /> : <Code size={18} />}</div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{challenge.title}</h4>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{challenge.difficulty}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {challenge.status === 'locked' ? (
                                                        <div className="text-gray-400"><Trash2 size={16} className="opacity-0" /> {/* Placeholder spacing */} <span className="text-xs opacity-50">Закрыто</span></div>
                                                    ) : (
                                                        <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors">Решить</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- Right: Tabs (Notes / AI Tutor) --- */}
                    <div className="lg:col-span-1 flex flex-col h-full">
                        <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full max-h-[calc(100vh-8rem)] overflow-hidden">
                            {/* Tabs Header */}
                            <div className="flex border-b border-gray-100 dark:border-gray-700/50">
                                <button onClick={() => setActiveTab('notes')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'notes' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}><PenTool size={18} /> Заметки</button>
                                <div className="w-px bg-gray-100 dark:bg-gray-700/50"></div>
                                <button onClick={() => setActiveTab('ai')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'ai' ? 'text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/10' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}><span className="text-lg">🤖</span> ИИ-Ментор</button>
                            </div>
                            {/* Content */}
                            <div className="flex-1 overflow-hidden relative">
                                {/* Notes Tab */}
                                <div className={`absolute inset-0 flex flex-col transition-all duration-300 ${activeTab === 'notes' ? 'translate-x-0 opacity-100 z-10' : '-translate-x-full opacity-0'}`}>
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center justify-between mb-2"><div className="text-xs text-gray-400 flex items-center gap-1"><Save size={12} /> Автосохранение</div></div>
                                        <textarea className="flex-1 w-full bg-yellow-50 dark:bg-[#2d3748] text-gray-700 dark:text-gray-200 resize-none border-none outline-none p-4 rounded-xl text-sm leading-relaxed placeholder:text-gray-400/70" placeholder="Запишите свои мысли здесь..." value={notes} onChange={handleNoteChange} spellCheck={false}></textarea>
                                    </div>
                                </div>
                                {/* AI Tab */}
                                <div className={`absolute inset-0 flex flex-col transition-all duration-300 ${activeTab === 'ai' ? 'translate-x-0 opacity-100 z-10' : 'translate-x-full opacity-0'}`}>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700" ref={scrollRef}>
                                        {aiMessages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>{msg.text}</div>
                                            </div>
                                        ))}
                                        {isAiTyping && (
                                            <div className="flex justify-start"><div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 rounded-bl-none"><div className="flex gap-1"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div></div></div></div>
                                        )}
                                    </div>
                                    <div className="p-4 border-t border-gray-100 dark:border-gray-700/50 bg-white dark:bg-[#1e293b]">
                                        <form onSubmit={(e) => { e.preventDefault(); handleAiSend(); }} className="flex gap-2">
                                            <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Спроси ИИ-Ментора..." className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-400" />
                                            <button type="submit" disabled={!aiInput.trim()} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white p-2.5 rounded-xl transition-colors"><ArrowRight size={18} /></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
