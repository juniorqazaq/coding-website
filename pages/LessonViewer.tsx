import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, List, CheckCircle, MessageSquare } from 'lucide-react';
import { MockEditor } from '../components/MockEditor';
import { COURSES } from '../types';

export const LessonViewer: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const [isNavOpen, setIsNavOpen] = useState(true);

  // Simple lookups
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];
  const lesson = course.lessons.find(l => l.id === lessonId) || course.lessons[0];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0b1220]">
      {/* Lesson Header */}
      <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161e2c] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to={`/course/${courseId}`} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">{lesson.title}</h2>
            <span className="text-xs text-gray-500">{course.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Beginner
           </div>
           <button className="md:hidden p-2" onClick={() => setIsNavOpen(!isNavOpen)}>
             <List size={20} />
           </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Left Nav (Collapsible) */}
        <aside className={`${isNavOpen ? 'w-64' : 'w-0'} bg-white dark:bg-[#161e2c] border-r border-gray-200 dark:border-gray-800 transition-[width] duration-300 overflow-hidden flex flex-col shrink-0 absolute md:relative z-20 h-full`}>
           <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-700 dark:text-gray-300">Course Content</h3>
           </div>
           <div className="flex-1 overflow-y-auto">
             {course.lessons.map((l, idx) => (
               <Link 
                 key={l.id} 
                 to={`/course/${course.id}/lesson/${l.id}`}
                 className={`flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${l.id === lesson.id ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-500' : ''}`}
               >
                 <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${l.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {l.completed ? <CheckCircle size={14} /> : idx + 1}
                 </div>
                 <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${l.id === lesson.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>{l.title}</p>
                    <p className="text-xs text-gray-500">{l.duration}</p>
                 </div>
               </Link>
             ))}
           </div>
        </aside>

        {/* Content & Editor Split */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0">
          
          {/* Lesson Text Content */}
          <div className="flex-1 lg:max-w-[40%] overflow-y-auto p-6 lg:p-8 prose dark:prose-invert max-w-none prose-img:rounded-xl prose-pre:bg-gray-800">
             <div className="mb-6">
               <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{lesson.title}</h1>
               <div className="flex gap-2">
                 <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">READING</span>
                 <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold">5 MIN</span>
               </div>
             </div>

             <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>In this lesson, we will explore the core concepts of React Components. Components are the building blocks of any React application.</p>
                
                <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">What is a Component?</h3>
                <p>Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.</p>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 p-4 my-4">
                   <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0"><strong>Tip:</strong> Always start component names with a capital letter.</p>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">Your Task</h3>
                <p>Modify the code in the editor to create a function component named <code>Greeting</code> that returns a <code>h1</code> with the text "Hello, React!".</p>
             </div>

             <div className="mt-8 flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                 <MessageSquare size={16} /> Discuss
               </button>
             </div>
          </div>

          {/* Editor Pane */}
          <div className="flex-1 lg:flex-[1.4] bg-[#0f1724] border-l border-gray-200 dark:border-gray-800 flex flex-col min-h-[500px] lg:min-h-0">
            <div className="flex-1 p-2">
               <MockEditor 
                 initialCode={lesson.initialCode || "// Write your code here\n\nfunction Greeting() {\n  return <div>Welcome</div>\n}"} 
               />
            </div>
            
            {/* Nav Footer for Task */}
            <div className="h-14 bg-white dark:bg-[#161e2c] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                   &larr; Previous
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">
                   Next Lesson &rarr;
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};