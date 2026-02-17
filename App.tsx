import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { LetterDisplay } from './components/LetterDisplay';
import { LetterData, GenerationStatus } from './types';
import { generateLetter } from './services/geminiService';
import { Rocket, Sparkles } from 'lucide-react';

const initialData: LetterData = {
  age: '',
  targetItem: '',
  currentAllowance: '',
  episodes: '',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<LetterData>(initialData);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);

  const handleInputChange = (key: keyof LetterData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setStatus(GenerationStatus.LOADING);
    try {
      const result = await generateLetter(formData);
      setGeneratedContent(result);
      setStatus(GenerationStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
      alert('手紙の生成に失敗しちゃった...もう一回試してみて！');
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setStatus(GenerationStatus.IDLE);
    setFormData(initialData);
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 pb-12">
      {/* Header */}
      <header className="bg-white border-b-4 border-orange-200 py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <Rocket className="text-orange-500" size={32} />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-orange-500 font-[Kiwi Maru]">
            お小遣い大作戦
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-lg text-gray-600 mb-2">
            AIの力を借りて、楽しくおこづかいをお願いしよう！
          </p>
          <div className="inline-block bg-orange-100 px-4 py-1 rounded-full text-orange-600 text-sm font-bold">
            <Sparkles className="inline-block w-4 h-4 mr-1 mb-1" />
            ユーモア全開・家族の会話が弾む（かも？）
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div className={`transition-all duration-500 ${generatedContent ? 'order-2 lg:order-1 opacity-50 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'order-1'}`}>
            <InputForm
              data={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              status={status}
            />
            
            <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">💡 ヒント</h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>欲しいものは具体的に書くと吉！</li>
                <li>「全財産12円」など、今のピンチな状況を正直に（面白く）伝えてみよう！</li>
                <li>感謝の言葉を混ぜると、親御さんも思わず笑顔になっちゃうかも。</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Result or Placeholder */}
          <div className={`transition-all duration-500 ${generatedContent ? 'order-1 lg:order-2' : 'order-2'}`}>
            {status === GenerationStatus.SUCCESS && generatedContent ? (
              <LetterDisplay content={generatedContent} onReset={handleReset} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-4 border-dashed border-gray-300 rounded-2xl bg-gray-50 text-gray-400">
                {status === GenerationStatus.LOADING ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-bold text-orange-500 animate-pulse">
                      とっておきの文章を生成中...
                    </p>
                    <p className="text-sm mt-2">（脳みそフル回転！）</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">💌</span>
                    <p className="text-lg font-bold">ここに手紙が表示されます</p>
                    <p className="text-sm">左のフォームに入力してね</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm mt-8">
        <p>© 2025 お小遣い大作戦 - Powered by Gemini</p>
        <p className="text-xs mt-1">※この手紙でお小遣いがもらえるとは限りませんが、きっと笑いは取れます。</p>
      </footer>
    </div>
  );
};

export default App;