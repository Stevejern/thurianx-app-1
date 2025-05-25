// ✅ App.jsx เวอร์ชันใหม่: ตัดการ Upload รูปจากคลัง เหลือเฉพาะกล้อง + วิเคราะห์ทันที
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function WelcomeScreen({ onStart, lang, setLang }) {
  const handleStart = () => onStart();

  const headings = {
    TH: 'ระบบตรวจสอบระดับการสุกของทุเรียน ด้วย AI ที่เรียบง่าย งดงาม และแม่นยำ',
    EN: 'Detect Durian Ripeness with AI – Minimal, Elegant, and Precise.',
    CN: 'AI 榴莲成熟度检测系统 —— 简约、优雅、精准。'
  };

  const startBtn = {
    TH: 'เริ่มใช้งาน',
    EN: 'Begin Experience',
    CN: '开始体验'
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center space-y-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h1 className="text-5xl font-semibold">ThurianX 🍃</h1>
        <p className="text-lg text-gray-300 mt-4">{headings[lang]}</p>
      </motion.div>
      <div className="flex gap-3">
        {['TH', 'EN', 'CN'].map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-full border ${lang === l ? 'bg-white text-black' : 'text-white border-white'}`}>{l}</button>
        ))}
      </div>
      <motion.button onClick={handleStart} className="bg-white text-black px-8 py-3 rounded-full font-medium shadow-lg">
        {startBtn[lang]}
      </motion.button>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [lang, setLang] = useState('TH');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (started && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [started]);

  const captureAndAnalyze = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append('file', blob, 'durian.jpg');

      setLoading(true);
      fetch('https://thurianx-backend.onrender.com/predict', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setResult(data.result);
          drawBoxes(data.boxes, context);
          setLoading(false);
        });
    });
  };

  const drawBoxes = (boxes, context) => {
    context.lineWidth = 2;
    context.strokeStyle = 'lime';
    context.font = '16px Inter';
    context.fillStyle = 'lime';
    boxes.forEach(box => {
      const [x, y, w, h] = box.bbox;
      context.strokeRect(x, y, w, h);
      context.fillText(box.label, x, y > 20 ? y - 5 : y + 15);
    });
  };

  if (!started) return <WelcomeScreen onStart={() => setStarted(true)} lang={lang} setLang={setLang} />;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-green-700">ThurianX 🍃</h2>
      <div className="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-2xl">
        <video ref={videoRef} autoPlay playsInline muted className="absolute top-0 left-0 w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
      </div>
      <button
        onClick={captureAndAnalyze}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700"
      >{lang === 'TH' ? '📷 ถ่ายภาพและวิเคราะห์' : lang === 'EN' ? '📷 Capture & Analyze' : '📷 拍照分析'}</button>
      <div className="mt-4">
        {loading && <p className="text-yellow-500">⏳ {lang === 'TH' ? 'AI กำลังวิเคราะห์...' : lang === 'EN' ? 'Analyzing...' : 'AI 正在分析...'}</p>}
        {result && !loading && <p className="text-green-700 font-semibold text-lg mt-2">✅ {lang === 'TH' ? (result === 'ripe' ? 'ทุเรียนสุกแล้ว' : 'ยังไม่สุก') : result}</p>}
      </div>
    </main>
  );
}

export default App;
