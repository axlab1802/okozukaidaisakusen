import React, { useRef } from 'react';
import { Download, Copy, Image as ImageIcon, RefreshCcw } from 'lucide-react';

interface LetterDisplayProps {
  content: string;
  onReset: () => void;
}

export const LetterDisplay: React.FC<LetterDisplayProps> = ({ content, onReset }) => {
  const letterRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('手紙の内容をコピーしました！');
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "おねだりの手紙.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadImage = async () => {
    if (letterRef.current && (window as any).html2canvas) {
      try {
        const canvas = await (window as any).html2canvas(letterRef.current, {
          scale: 2,
          backgroundColor: null, 
          useCORS: true,
        });
        const link = document.createElement('a');
        link.download = 'おねだりの手紙.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error("Image generation failed", error);
        alert("画像の保存に失敗しました。");
      }
    } else {
        alert("画像生成ライブラリの読み込み中です。少々お待ちください。");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow relative mb-6">
        {/* Paper Container */}
        <div 
          ref={letterRef}
          className="notebook-paper p-8 min-h-[500px] w-full text-gray-800 rounded-sm relative transform rotate-1 transition-transform hover:rotate-0 origin-top-left"
        >
           {/* Tape visual */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200 opacity-80 rotate-2 shadow-sm"></div>

          <div className="handwritten text-xl whitespace-pre-wrap leading-8 text-gray-700">
            {content}
          </div>
          
          <div className="mt-8 text-right handwritten text-gray-500">
            from あなたの愛する子供より
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-bold"
        >
          <Copy size={18} /> コピー
        </button>
        <button
          onClick={handleDownloadText}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-bold"
        >
          <Download size={18} /> テキスト
        </button>
        <button
          onClick={handleDownloadImage}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-bold"
        >
          <ImageIcon size={18} /> 画像保存
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-bold"
        >
          <RefreshCcw size={18} /> 最初から
        </button>
      </div>
    </div>
  );
};