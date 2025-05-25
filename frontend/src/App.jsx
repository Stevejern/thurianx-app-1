import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';




function WelcomeScreen({ onStart, lang, setLang }) {
  useEffect(() => {
    const playAudioOnce = () => {
      const audio = new Audio('/Sia.mp3.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
      document.removeEventListener('touchstart', playAudioOnce);
    };
    document.addEventListener('touchstart', playAudioOnce);
  }, []);
  const handleStart = () => {
    const audio = new Audio('/Sia_-_Unstoppable_CeeNaija.com_.mp3');
    audio.volume = 1.0;
    audio.play()
      .then(() => {
        console.log('🎵 Audio started successfully');
      })
      .catch((error) => {
        console.warn('⚠️ Audio play failed:', error);
      });
    onStart();
  };
  
  const headings = {
    TH: 'ระบบตรวจสอบระดับการสุกของทุเรียน ด้วย AI ที่เรียบง่าย งดงาม และแม่นยำ',
    EN: 'Detect Durian Ripeness with AI – Minimal, Elegant, and Precise.',
    CN: 'AI 榴莲成熟度检测系统 —— 简约、优雅、精准。'
  };

  const subtitle = {
    TH: 'ปัญญาประดิษฐ์ตรวจระดับการสุกของทุเรียนแห่งอนาคต',
    EN: 'A Next-Gen Durian Ripeness Intelligence',
    CN: '次世代榴莲成熟度智能系统'
  };

  const supportNote = {
    TH: 'ขอขอบคุณการสนับสนุนเบื้องต้นจาก Bangkok Airways (บริษัท การบินกรุงเทพ จำกัด (มหาชน)) และมีแผนขยายความร่วมมือด้าน ESG Technology สำหรับเกษตรกรในพื้นที่ปลูกทุเรียนที่เกี่ยวข้องกับเส้นทางบินของบริษัทในอนาคต',
    EN: "We would like to thank Bangkok Airways Public Company Limited for their initial support. We also plan to expand our collaboration on ESG Technology with durian farmers located along the airline's flight routes in the near future.",
    CN: '衷心感谢 Bangkok Airways Public Company Limited 的初步支持。我们计划未来与沿该航空公司航线的榴莲种植农户展开 ESG 技术合作，共同推动可持续发展。'
  };

  const startBtn = {
    TH: 'เริ่มใช้งาน',
    EN: 'Begin Experience',
    CN: '开始体验'
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center space-y-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          ThurianX 🍃
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          {subtitle[lang]}
        </p>
        {['TH', 'EN', 'CN'].includes(lang) && (
  <>
    <p className="text-base text-gray-500 italic mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
      {lang === 'TH'
        ? 'สร้างโดยทีมงาน Super AI Innovator - ภาคกลาง ศูนย์ลาดกระบัง'
        : lang === 'EN'
        ? 'Built by Super AI Innovator Team – Central Region, IT KMITL'
        : '由 Super AI Innovator 团队 – 中部，KMITL IT 制作 '}
    </p>
    <p className="text-base text-gray-500 italic -mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
      {lang === 'TH'
        ? 'ได้รับการสนับสนุนโดยบริษัท การบินกรุงเทพ จำกัด (มหาชน)'
        : lang === 'EN'
        ? 'Supported by Bangkok Airways'
        : '由 Bangkok Airways Public Company Limited 提供支持'}
    </p>
  </>
)}
        <p className="text-md text-gray-300 max-w-xl mt-6 leading-relaxed">
          {headings[lang]}
        </p>
      </motion.div>

      <audio controls className="mt-4">
  <source src="/Sia_-_Unstoppable_CeeNaija.com_.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex gap-3 mt-6"
      >
        {['TH', 'EN', 'CN'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              lang === l
                ? 'bg-white text-black shadow-lg'
                : 'border-white text-white hover:bg-white/10'
            }`}
          >
            {l}
          </button>
        ))}
      </motion.div>

      <motion.button
        onClick={handleStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 bg-white text-black px-8 py-3 rounded-full font-medium tracking-wide hover:scale-105 transition shadow-xl z-10"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {startBtn[lang]}
      </motion.button>

      <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full -z-10 top-10 animate-pulse"></div>

      <p className="text-xs text-gray-400 max-w-md px-4 mt-6 text-center italic z-10">
        {supportNote[lang]}
      </p>
    </div>
  );
}










function getResultStyle(index) {
  switch (index) {
    case 0:
      return 'bg-orange-100 text-orange-700'; // ดิบ
    case 1:
      return 'bg-green-600 text-white'; // พร้อมตัด
    case 2:
      return 'bg-yellow-300 text-yellow-900'; // สุก
    case 3:
      return 'bg-red-200 text-red-700'; // ไม่สามารถระบุได้
    default:
      return 'bg-gray-200 text-gray-700';
  }
}

function getResultIcon(index) {
  switch (index) {
    case 0:
      return '⏳'; // ดิบ
    case 1:
      return '✅'; // พร้อมตัด
    case 2:
      return '🍽️'; // สุก
    case 3:
      return '❌'; // ไม่สามารถระบุได้
    default:
      return 'ℹ️';
  }
}

// ... WelcomeScreen remains unchanged

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultIndex, setResultIndex] = useState(null);
  const [started, setStarted] = useState(false);
  const [lang, setLang] = useState('TH');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const labels = {
    TH: ['ดิบ', 'พร้อมทำการตัด', 'สุก', 'ไม่สามารถระบุได้ กรุณาดำเนินการใหม่ !!!'],
    EN: ['Raw', 'Ready to Harvest', 'Ripe', 'Unable to identify. Please try again.'],
    CN: ['未熟', '可采摘', '成熟', '无法识别，请重试！']
  };

  const buttons = {
    TH: ['📷 ถ่ายภาพ', '📁 คลังภาพ/เลือกไฟล์', '🔍 วิเคราะห์'],
    EN: ['📷 Take Photo', '📁 Gallery/File', '🔍 Analyze'],
    CN: ['📷 拍照', '📁 图库/选择文件', '🔍 分析']
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setLoading(true);
    setTimeout(() => {
      const index = Math.floor(Math.random() * 4);
      setResultIndex(index);
      const accuracy = (Math.random() * 20 + 80).toFixed(2);
      const label = labels[lang][index];
      const output = index < 3 ? `${label} (${accuracy}%)` : `${label}`;
      setResult(output);
      setLoading(false);
    }, 2000);
  };

  if (!started) return <WelcomeScreen onStart={() => setStarted(true)} lang={lang} setLang={setLang} />;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50 text-gray-900 font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-green-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>ThurianX App 🍃</h1>
        </div>

        <div className="flex justify-center gap-4 pb-2">
          {['TH', 'EN', 'CN'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${lang === l ? 'bg-green-500 text-white' : 'border-green-300 text-green-700'}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border border-green-100">
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full rounded-xl shadow-md object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-xl h-60 text-gray-400 text-center p-4">
              <p>{lang === 'TH' ? 'ยังไม่ได้เลือกรูปภาพ' : lang === 'EN' ? 'No image selected' : '尚未选择图片'}</p>
              <p className="text-sm mt-2">{lang === 'TH' ? 'กรุณาอัปโหลดภาพทุเรียนเพื่อเริ่มวิเคราะห์' : lang === 'EN' ? 'Please upload a durian image to start analysis' : '请上传榴莲图像以开始分析'}</p>
            </div>
          )}

          <input type="file" accept="image/*" capture="environment" onChange={handleUpload} ref={cameraInputRef} className="hidden" />
          <input type="file" accept="image/*" onChange={handleUpload} ref={fileInputRef} className="hidden" />

          <div className="flex gap-4 flex-wrap justify-center">
            <button onClick={() => cameraInputRef.current && cameraInputRef.current.click()} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl text-sm font-medium shadow">
              {buttons[lang][0]}
            </button>
            <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl text-sm font-medium shadow">
              {buttons[lang][1]}
            </button>
            <button onClick={analyzeImage} disabled={!preview || loading} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-medium shadow disabled:opacity-40">
              {buttons[lang][2]}
            </button>
          </div>

          <AnimatePresence>
            {loading && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-yellow-500 text-center">
                ⏳ {lang === 'TH' ? 'AI กำลังวิเคราะห์ภาพ...' : lang === 'EN' ? 'AI analyzing...' : 'AI 正在分析...'}
              </motion.p>
            )}
            {result && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`text-center rounded-xl p-4 text-lg font-medium shadow ${getResultStyle(resultIndex)}`}>
                {getResultIcon(resultIndex)} {result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-400">© 2025 ThurianX AI Farm. Designed with simplicity and elegance.</p>
      </div>
    </main>
  );
}

export default App;
