"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Camera, Send, BookOpen } from 'lucide-react';

export default function KorosenseiStudyRoom() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chat, setChat] = useState([{ role: 'ai', text: 'ヌルフフフ！準備はいいですか、私の生徒さん？' }]);

  // カメラを起動して、あなたの表情を見守りますよ
  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    startCamera();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 p-4 flex flex-col items-center font-sans text-slate-800">
      <header className="text-2xl font-bold mb-4">椚ヶ丘中学校 3年E組 特別学習室</header>
      
      <div className="w-full max-w-4xl flex gap-4 h-[500px]">
        {/* 左側：殺せんせー（AI）の顔とチャット */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl flex flex-col border-4 border-slate-800">
          <div className="h-40 bg-yellow-200 rounded-full mb-4 flex items-center justify-center border-2 border-slate-400 relative overflow-hidden">
             {/* ここに殺せんせーの顔（〇や✖）を表示する演出を入れます */}
             <div className="text-6xl font-bold">^ ◡ ^</div>
          </div>
          <div className="flex-1 overflow-y-auto mb-4 border-t pt-4">
            {chat.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === 'ai' ? 'text-blue-600' : 'text-slate-600 text-right'}`}>
                <strong>{m.role === 'ai' ? '殺せんせー: ' : '生徒: '}</strong>{m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="flex-1 border p-2 rounded" placeholder="先生、質問です！" />
            <button className="bg-slate-800 text-white p-2 rounded"><Send /></button>
          </div>
        </div>

        {/* 右側：生徒（あなた）と宿題スキャン */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-black rounded-2xl overflow-hidden h-60 border-4 border-slate-800 shadow-xl relative">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs">生徒の表情を確認中...</div>
          </div>
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 text-xl">
            <Camera size={32} /> 宿題を見せる
          </button>
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-2 border-2 border-slate-800">
            <BookOpen className="text-blue-500" />
            <div>
              <div className="text-xs text-slate-500 font-bold">現在の弱点分析</div>
              <div className="font-bold">数学（二次関数）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
