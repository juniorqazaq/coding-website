import React, { useEffect, useState } from 'react';
import { MOCK_USER } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { Award, Zap, Clock, Book, Calendar, TrendingUp, Flame, Trophy, Users, Target, Code, ArrowRight, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pythonCourseData } from '../data/python-course-data';
import { LearningMap } from '../components/LearningMap';

const DATA = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 300 },
  { name: 'Wed', xp: 600 },
  { name: 'Thu', xp: 200 },
  { name: 'Fri', xp: 450 },
  { name: 'Sat', xp: 800 },
  { name: 'Sun', xp: 500 },
];

export const Dashboard: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [nextLesson, setNextLesson] = useState<{ id: string; title: string, moduleId: string } | null>(null);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('python-course-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      const set = new Set<string>(parsed);
      setCompletedLessons(set);
    }
  }, []);

  // Calculate next lesson
  useEffect(() => {
    let found = false;
    for (const module of pythonCourseData.modules) {
      for (const lesson of module.lessons) {
        if (!completedLessons.has(lesson.id)) {
          setNextLesson({ id: lesson.id, title: lesson.title, moduleId: module.id });
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }, [completedLessons]);

  const totalProgress = Math.round((completedLessons.size / pythonCourseData.totalLessons) * 100);

  // Heatmap Data Generation
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1);
    const endDate = new Date(today.getFullYear(), 11, 31);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: new Date(d),
        value: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
      });
    }
    return data;
  };
  const heatmapData = generateHeatmapData();
  const getHeatmapColor = (value: number) => {
    if (value === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (value === 1) return 'bg-blue-200 dark:bg-blue-900/40';
    if (value === 2) return 'bg-blue-400 dark:bg-blue-700/60';
    if (value === 3) return 'bg-blue-500 dark:bg-blue-600/80';
    return 'bg-blue-600 dark:bg-blue-500';
  };

  const leaderboard = [
    { name: 'Alex', words: 282, rank: 1, avatar: '👨‍💻' },
    { name: 'Riley', words: 250, rank: 2, avatar: '👩‍💻' },
    { name: 'Lindia', words: 88, rank: 3, avatar: '👨‍🎓' },
    { name: 'Jacob', words: 42, rank: 4, avatar: '👩‍🎓' },
    { name: 'Yixing', words: 22, rank: 5, avatar: '👨‍🔬' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm">
              <img src={MOCK_USER.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-white/50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {MOCK_USER.name}!</h1>
              <p className="text-blue-100 flex items-center gap-2">
                <Zap size={16} className="text-yellow-300" fill="currentColor" />
                You're on a {MOCK_USER.streak} day streak. Keep it up!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider opacity-70">Level</div>
              <div className="text-3xl font-bold">{MOCK_USER.level}</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider opacity-70">Total XP</div>
              <div className="text-3xl font-bold">{MOCK_USER.xp.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col (Main Content) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Continue Learning Card */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Book className="text-blue-500" />
                Continue Learning
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="w-full sm:w-auto flex-grow">
                  <h4 className="font-bold text-xl mb-1">{pythonCourseData.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm max-w-md">{pythonCourseData.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Code size={16} /> {completedLessons.size} / {pythonCourseData.totalLessons} Lessons</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {pythonCourseData.estimatedHours}h Total</span>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full mb-4 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                      style={{ width: `${totalProgress}%` }}
                    ></div>
                  </div>

                  {nextLesson ? (
                    <Link
                      to={`/course/python/module/${nextLesson.moduleId}/lesson/${nextLesson.id}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg shadow-blue-600/30"
                    >
                      Continue: {nextLesson.title}
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <Link
                      to="/course/python"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all shadow-lg shadow-green-500/20"
                    >
                      Review Course
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50/50 dark:from-blue-900/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <TrendingUp className="text-green-500" />
                Weekly Activity
              </h3>
              <select className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 text-sm focus:outline-none border-none">
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Heatmap (From Progress Page) */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Flame className="text-orange-500" />
                  Yearly Consistency
                </h2>
                <p className="text-sm text-gray-500 mt-1 ml-6">6 active days in {new Date().getFullYear()}</p>
              </div>
            </div>

            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div className="inline-block min-w-full">
                <div className="flex mb-2 pl-8">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                    <div key={i} className="flex-1 text-xs text-gray-500 text-center">{month}</div>
                  ))}
                </div>
                <div className="space-y-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                    <div key={day} className="flex items-center gap-2">
                      <div className="w-6 text-[10px] text-gray-500">{dayIndex % 2 === 0 ? day : ''}</div>
                      <div className="flex gap-1 flex-1">
                        {heatmapData
                          .filter((_, i) => i % 7 === dayIndex)
                          .map((item, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-[2px] ${getHeatmapColor(item.value)} transition-all hover:scale-125 hover:ring-2 hover:ring-blue-400 cursor-pointer`}
                              title={`${item.date.toLocaleDateString()}: ${item.value} activities`}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-8">
          {/* Focus Studio Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">Focus Studio</h3>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Coffee size={24} />
                </div>
              </div>
              <p className="text-indigo-100 mb-6 text-sm">
                Enter a distraction-free environment with Pomodoro timer, tasks, and ambient sounds.
              </p>
              <Link to="/study" className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-sm">
                Enter Studio <ArrowRight size={18} />
              </Link>
            </div>
            {/* Decor */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"></div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:border-blue-500 transition-colors group">
              <div className="inline-flex p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                <Zap size={24} fill="currentColor" />
              </div>
              <div className="text-2xl font-bold">{MOCK_USER.streak}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Day Streak</div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:border-blue-500 transition-colors group">
              <div className="inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-500 mb-3 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div className="text-2xl font-bold">24h</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Learning Time</div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:border-blue-500 transition-colors group">
              <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <div className="text-2xl font-bold">{completedLessons.size}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Lessons Done</div>
            </div>
            <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:border-blue-500 transition-colors group">
              <div className="inline-flex p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-500 mb-3 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <div className="text-2xl font-bold">85%</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Accuracy</div>
            </div>
          </div>

          {/* Leaderboard (From Progress) */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Users className="text-blue-500" />
                Leaderboard
              </h2>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">This Week</span>
            </div>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className={`w-6 text-center font-bold ${index < 3 ? 'text-blue-500' : 'text-gray-400'}`}>
                    {user.rank}
                  </span>
                  <div className="flex items-center gap-3 flex-1 bg-gray-50 dark:bg-[#0f1724] p-2 rounded-xl">
                    <span className="text-xl">{user.avatar}</span>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.words} XP</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Achievements
              </h3>
              <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "First Code", desc: "Completed first lesson", color: "text-blue-500 bg-blue-500/10", icon: Code },
                { name: "Bug Hunter", desc: "Fixed 5 bugs", color: "text-red-500 bg-red-500/10", icon: Target },
                { name: "Night Owl", desc: "Studied after midnight", color: "text-blue-500 bg-blue-500/10", icon: Clock },
                { name: "Week Warrior", desc: "7 day streak", color: "text-orange-500 bg-orange-500/10", icon: Flame }
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0f1724] transition-colors">
                  <div className={`p-3 rounded-xl ${ach.color}`}>
                    <ach.icon size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">{ach.name}</h5>
                    <p className="text-xs text-gray-500">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};