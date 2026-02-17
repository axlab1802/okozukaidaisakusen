import React from 'react';
import { LetterData, GenerationStatus } from '../types';
import { Sparkles, Send } from 'lucide-react';

interface InputFormProps {
  data: LetterData;
  onChange: (key: keyof LetterData, value: string) => void;
  onSubmit: () => void;
  status: GenerationStatus;
}

export const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit, status }) => {
  const isLoading = status === GenerationStatus.LOADING;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-yellow-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <span className="text-2xl">📝</span> お手紙作成
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">年齢</label>
          <input
            type="text"
            value={data.age}
            onChange={(e) => onChange('age', e.target.value)}
            placeholder="例: 10"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-gray-900 bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">今ほしいもの・やりたいこと</label>
          <input
            type="text"
            value={data.targetItem}
            onChange={(e) => onChange('targetItem', e.target.value)}
            placeholder="例: 最新のゲームソフト、伝説の剣"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-gray-900 bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">現在のお小遣い・所持金</label>
          <input
            type="text"
            value={data.currentAllowance}
            onChange={(e) => onChange('currentAllowance', e.target.value)}
            placeholder="例: 月500円、全財産30円"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-gray-900 bg-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">
            親へのメッセージ・エピソード <span className="text-xs font-normal text-gray-400">（任意）</span>
          </label>
          <textarea
            value={data.episodes}
            onChange={(e) => onChange('episodes', e.target.value)}
            placeholder="例: こないだお皿割ってごめんなさい。いつもご飯ありがとう。"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors h-24 resize-none text-gray-900 bg-white placeholder-gray-400"
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !data.age || !data.targetItem}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transform transition-all flex items-center justify-center gap-2
            ${isLoading || !data.age || !data.targetItem
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 hover:shadow-xl active:scale-95'
            }`}
        >
          {isLoading ? (
            <>
              <Sparkles className="animate-spin" />
              考え中...
            </>
          ) : (
            <>
              <Send size={20} />
              手紙を書く！
            </>
          )}
        </button>
      </div>
    </div>
  );
};