import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Send, BookOpen, Lightbulb, Bug, CheckCircle2, XCircle, Bot, Sparkles, MessageSquare, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROBLEMS, Problem, CODING_TOPICS } from '../data/coding-data';
import Confetti from 'react-confetti';

interface ChatMessage {
    id: string;
    role: 'ai' | 'user';
    text: string;
}

export const CodingGame: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<{ status: 'idle' | 'running' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });
    const [showConfetti, setShowConfetti] = useState(false);

    // AI Chat State
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{
        id: '1', role: 'ai', text: "Hello! I'm your AI coding assistant. Stuck? Ask for a hint or help with debugging!"
    }]);
    const [inputVal, setInputVal] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const found = MOCK_PROBLEMS.find(p => p.id === id);
        if (found) {
            setProblem(found);
            setCode(found.starterCode);
        }
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatOpen]);

    const handleRun = () => {
        setIsRunning(true);
        setOutput({ status: 'running', message: 'Running tests...' });

        // Extract function name from starter code to ensure they didn't delete it
        const functionMatch = problem?.starterCode.match(/def\s+(\w+)/);
        const functionName = functionMatch ? functionMatch[1] : '';

        setTimeout(() => {
            setIsRunning(false);
            // Basic validation: Code must be non-empty and contain the function definition
            if (code.trim().length > 10 && (!functionName || code.includes(functionName))) {
                setOutput({ status: 'success', message: 'Tests passed! Output matches expected result.' });
            } else {
                setOutput({ status: 'error', message: 'SyntaxError: Missing function definition or invalid syntax.' });
            }
        }, 1500);
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setOutput({ status: 'running', message: 'Verifying solution...' });

        // Extract function name
        const functionMatch = problem?.starterCode.match(/def\s+(\w+)/);
        const functionName = functionMatch ? functionMatch[1] : '';

        setTimeout(() => {
            setIsRunning(false);
            if (code.trim().length > 10 && (!functionName || code.includes(functionName))) {
                setOutput({ status: 'success', message: 'All test cases passed! 🎉\n\nPerformance: 0.05ms (Faster than 80%)' });
                setShowConfetti(true);
            } else {
                setOutput({ status: 'error', message: 'Solution incorrect. Ensure you have defined the function properly.' });
            }
        }, 2000);
    };

    const sendChatMessage = (text: string) => {
        if (!text.trim()) return;

        const newMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, newMsg]);
        setInputVal('');

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "Have you considered checking the edge cases?",
                "Try using a hash map to optimize the lookup time.",
                "Review your loop condition, it might be off by one.",
                "That looks like a solid approach! What happens if the input is empty?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: randomResponse }]);
        }, 1000);
    };

    if (!problem) return <div className="p-10 text-center text-white">Loading Mission...</div>;

    const topic = CODING_TOPICS.find(t => t.id === problem.topicId);

    return (
        <div className="h-screen flex flex-col bg-[#0b1220] text-white overflow-hidden font-sans selection:bg-blue-500/30">
            {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

            {/* Header */}
            <header className="bg-[#131b2c] border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 shadow-xl">
                <div className="flex items-center gap-6">
                    <Link to={topic ? `/coding/topic/${topic.id}/${problem.difficulty}` : '/coding'} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        {topic && (
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                <span className="text-blue-400">{topic.title}</span>
                                <span className="text-gray-600">/</span>
                                <span className={problem.difficulty === 'Easy' ? 'text-emerald-400' : problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-rose-400'}>
                                    {problem.difficulty}
                                </span>
                            </div>
                        )}
                        <h1 className="font-bold text-lg text-white flex items-center gap-3">
                            {problem.title}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                        <span className="text-sm">Reward:</span>
                        <span className="flex items-center gap-1">+{problem.xp} <span className="text-xs">XP</span></span>
                    </div>
                </div>
            </header>

            {/* Main Content Split */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Panel 1: Mission Brief */}
                <div className="w-1/3 min-w-[380px] bg-[#0b1220] border-r border-white/5 flex flex-col">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <div className="mb-8">
                            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <BookOpen size={16} /> Briefing
                            </h2>
                            <p className="text-gray-300 text-lg leading-loose font-light">
                                {problem.description}
                            </p>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Example</h3>
                            <div className="bg-[#131b2c] rounded-xl p-4 border border-white/5 font-mono text-sm text-gray-400">
                                <div className="mb-2"><span className="text-purple-400">Input:</span> nums = [2, 7, 11, 15], target = 9</div>
                                <div><span className="text-emerald-400">Output:</span> [0, 1]</div>
                            </div>
                        </div>
                    </div>

                    {/* AI Coach Floating Trigger */}
                    <div className="p-6 border-t border-white/5 bg-[#0b1220]/95 backdrop-blur-sm sticky bottom-0 z-20">
                        <button
                            onClick={() => setChatOpen(!chatOpen)}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-98 group"
                        >
                            <Sparkles size={18} className="group-hover:animate-pulse" />
                            {chatOpen ? 'Close AI Assistant' : 'Ask AI Coach'}
                        </button>
                    </div>
                </div>

                {/* Panel 2: Code Editor */}
                <div className="flex-1 flex flex-col bg-[#131b2c] relative">
                    {/* Editor Tabs/Toolbar */}
                    <div className="px-4 py-2 bg-[#0f1623] border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <div className="px-4 py-2 bg-[#131b2c] text-blue-400 text-xs font-bold rounded-t-lg border-t border-x border-white/5 flex items-center gap-2">
                                <span>main.py</span>
                            </div>
                        </div>
                        <button onClick={() => setCode(problem?.starterCode || '')} className="text-xs flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
                            <RotateCcw size={14} /> Reset Shell
                        </button>
                    </div>

                    {/* Monaco-style Editor Area */}
                    <div className="flex-1 relative group">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="absolute inset-0 w-full h-full p-6 font-mono text-[15px] bg-[#131b2c] text-gray-300 resize-none focus:outline-none leading-relaxed selection:bg-blue-500/30"
                            spellCheck={false}
                            placeholder="# Write your python code here..."
                            style={{ tabSize: 4 }}
                        />
                    </div>

                    {/* Console / Output */}
                    <AnimatePresence>
                        {output.status !== 'idle' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className={`border-t border-white/10 relative z-10 ${output.status === 'error' ? 'bg-red-900/10' : output.status === 'success' ? 'bg-emerald-900/10' : 'bg-[#0f1623]'}`}
                            >
                                <div className="p-4 font-mono text-sm max-h-[150px] overflow-y-auto custom-scrollbar">
                                    <div className="flex items-center gap-2 mb-2 font-bold opacity-80 uppercase tracking-wider text-xs">
                                        {output.status === 'running' && <span className="animate-spin text-blue-400">⏳</span>}
                                        {output.status === 'success' && <CheckCircle2 size={16} className="text-emerald-400" />}
                                        {output.status === 'error' && <XCircle size={16} className="text-rose-400" />}

                                        <span className={output.status === 'success' ? 'text-emerald-400' : output.status === 'error' ? 'text-rose-400' : 'text-gray-400'}>
                                            {output.status === 'running' ? 'Compiling...' : output.status === 'success' ? 'Passed' : 'Failed'}
                                        </span>
                                    </div>
                                    <pre className="whitespace-pre-wrap opacity-90 text-gray-300 pl-6 border-l-2 border-white/10">{output.message}</pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Code Action Bar */}
                    <div className="p-4 bg-[#0f1623] border-t border-white/5 flex items-center justify-end gap-3 z-20">
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="px-6 py-2.5 rounded-xl font-bold text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            <Play size={18} fill="currentColor" className="opacity-80" />
                            Run Tests
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isRunning}
                            className="px-8 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            <Send size={18} />
                            Submit
                        </button>
                    </div>
                </div>

                {/* AI Chat Drawer Overlay */}
                <AnimatePresence>
                    {chatOpen && (
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 right-0 h-full w-[400px] bg-[#1a2333] border-l border-white/10 shadow-2xl z-30 flex flex-col"
                        >
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#131b2c]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
                                        <Bot size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">AI Coach</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs text-gray-400">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setChatOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0f1623]">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : 'bg-[#1e293b] text-gray-200 border border-white/5 rounded-tl-sm'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Recommended Prompts */}
                            <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar bg-[#131b2c]">
                                <button onClick={() => sendChatMessage("Give me a hint")} className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-medium text-gray-300 transition-colors">
                                    <Lightbulb size={12} className="text-yellow-400" /> Hint
                                </button>
                                <button onClick={() => sendChatMessage("Explain the logic")} className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-medium text-gray-300 transition-colors">
                                    <BookOpen size={12} className="text-blue-400" /> Explain
                                </button>
                                <button onClick={() => sendChatMessage("Help me find a bug")} className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-medium text-gray-300 transition-colors">
                                    <Bug size={12} className="text-rose-400" /> Debug
                                </button>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-[#131b2c] border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputVal}
                                        onChange={(e) => setInputVal(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendChatMessage(inputVal)}
                                        placeholder="Ask specific coding questions..."
                                        className="w-full bg-[#0b1220] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                    <button
                                        onClick={() => sendChatMessage(inputVal)}
                                        className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!inputVal.trim()}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
