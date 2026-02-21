import React, { useState } from 'react';
import { Play, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/useUserStore';

interface MockEditorProps {
  initialCode: string;
}

export const MockEditor: React.FC<MockEditorProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { addXP } = useUserStore();

  const handleRun = () => {
    setIsRunning(true);
    setStatus('idle');
    setOutput(null);

    // Real JS execution wrapper
    setTimeout(() => {
      setIsRunning(false);

      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };

      try {
        const result = new Function(code)();
        if (result !== undefined) {
          logs.push(`Возврат: ${JSON.stringify(result)}`);
        }

        setOutput(logs.length > 0 ? logs.join('\n') : '> Успешно выполнено (нет вывода)');
        setStatus('success');
        addXP(15);
      } catch (err: any) {
        setOutput(`> Ошибка: ${err.message}`);
        setStatus('error');
      } finally {
        console.log = originalLog;
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 px-2 py-1 bg-[#1e1e1e] rounded border border-gray-600">script.js</span>
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${isRunning ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            {isRunning ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            Запуск
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Code Area */}
        <div className="relative flex-1 font-mono text-sm">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#1e1e1e] text-gray-600 flex flex-col items-end pr-2 pt-4 select-none border-r border-gray-700">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <div key={n} className="h-6 leading-6">{n}</div>)}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#1e1e1e] text-gray-300 pl-10 pr-4 pt-4 resize-none focus:outline-none leading-6 font-mono"
            spellCheck={false}
          />
        </div>

        {/* Output Panel (Collapsible or Side) */}
        <div className="h-40 md:h-full md:w-1/3 bg-[#0f1724] border-t md:border-t-0 md:border-l border-gray-700 flex flex-col">
          <div className="px-3 py-2 bg-[#252526] border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Вывод Консоли
          </div>
          <div className="p-4 font-mono text-sm flex-1 overflow-auto">
            {!output && !isRunning && <span className="text-gray-600 italic">Нажмите Запуск, чтобы увидеть результат...</span>}
            {isRunning && <span className="text-blue-400">Компиляция и запуск...</span>}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={status === 'error' ? 'text-red-400' : 'text-green-400'}
              >
                <pre className="whitespace-pre-wrap">{output}</pre>
              </motion.div>
            )}
          </div>
          {status === 'success' && (
            <div className="p-3 bg-green-900/20 border-t border-green-900/50 flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle size={16} />
              <span>Тесты Пройдены! +50 XP</span>
            </div>
          )}
          {status === 'error' && (
            <div className="p-3 bg-red-900/20 border-t border-red-900/50 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>Тесты Провалены. Проверьте логи.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};