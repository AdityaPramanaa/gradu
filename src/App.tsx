import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Heart, Sparkles, Star, Play, Pause, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'auto';
      
      // Try to autoplay with user interaction
      const playAudio = async () => {
        try {
          await audioRef.current!.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
        } catch (err) {
          console.log('Auto-play prevented, waiting for user interaction:', err);
          setAutoplayBlocked(true);
          
          // Add click event listener to start audio
          const startAudio = () => {
            audioRef.current!.play().then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
              document.removeEventListener('click', startAudio);
              document.removeEventListener('keydown', startAudio);
              document.removeEventListener('touchstart', startAudio);
              document.removeEventListener('scroll', startAudio);
            });
          };
          
          document.addEventListener('click', startAudio);
          document.addEventListener('keydown', startAudio);
          document.addEventListener('touchstart', startAudio);
          document.addEventListener('scroll', startAudio);
        }
      };
      
      // Delay autoplay slightly to ensure DOM is ready
      setTimeout(playAudio, 100);
    }
  }, []);

  const handleNoButtonHover = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonClicks(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  const getNoButtonText = () => {
    if (noButtonClicks === 0) return 'No';
    if (noButtonClicks < 3) return 'Eh, No!';
    if (noButtonClicks < 5) return 'Wlee harus mau!';
    if (noButtonClicks < 8) return 'No no gabisa nyet wkwkw!';
    return 'mau ajaa ne nyet😤';
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Audio Player */}
      <audio
        ref={audioRef}
        src="/gradu/Rearrange My World.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop
      />

      {/* Running Board for Song Title */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎵</span>
              </div>
              <div className="text-white font-medium">
                <span className="text-sm opacity-80">Now Playing:</span>
                <span className="ml-2 font-semibold">"Rearrange My World"</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Progress Bar */}
              <div className="hidden sm:flex items-center gap-2 text-white text-xs">
                <span>{formatTime(currentTime)}</span>
                <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Autoplay Blocked Indicator */}
              {autoplayBlocked && (
                <div className="hidden sm:flex items-center gap-2 text-yellow-300 text-xs animate-pulse">
                  <span>🔇 Click anywhere to start music</span>
                </div>
              )}

              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayPause}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-cyan-200/30 to-blue-300/30 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/40 via-sky-100/40 to-indigo-100/40 animate-bounce-gentle"></div>
      </div>

      {/* Moving Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-sky-200/40 to-blue-200/40 rounded-full animate-float-slow-delayed blur-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-200/40 to-blue-200/40 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-200/40 to-sky-200/40 rounded-full animate-float-slow-delayed blur-sm"></div>
        
        {/* Medium circles */}
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 rounded-full animate-float-medium blur-sm"></div>
        <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-gradient-to-r from-indigo-100/50 to-blue-100/50 rounded-full animate-float-medium-delayed blur-sm"></div>
        
        {/* Small floating elements */}
        <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-gradient-to-r from-sky-100/60 to-blue-100/60 rounded-full animate-float-fast blur-sm"></div>
        <div className="absolute top-3/4 left-1/3 w-6 h-6 bg-gradient-to-r from-cyan-100/60 to-indigo-100/60 rounded-full animate-float-fast-delayed blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-gradient-to-r from-blue-100/60 to-sky-100/60 rounded-full animate-float-medium blur-sm"></div>
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {i % 4 === 0 ? (
              <Star className="w-4 h-4 text-blue-300 opacity-80 drop-shadow-lg" />
            ) : i % 4 === 1 ? (
              <Sparkles className="w-3 h-3 text-cyan-300 opacity-70 drop-shadow-lg" />
            ) : i % 4 === 2 ? (
              <div className="w-3 h-3 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full opacity-60 drop-shadow-lg"></div>
            ) : (
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full opacity-50 drop-shadow-lg"></div>
            )}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse-slow shadow-lg shadow-blue-300/50"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse-slow-delayed shadow-lg shadow-cyan-300/50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-pulse-slow shadow-lg shadow-indigo-300/50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-sky-300 rounded-full animate-pulse-slow-delayed shadow-lg shadow-sky-300/50"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 mt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full mb-6 animate-bounce shadow-2xl shadow-blue-500/50">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-700 mb-4 animate-pulse drop-shadow-lg">
            CONGRATULATIONS!
          </h1>
          
          <div className="text-2xl md:text-3xl font-semibold text-blue-700 mb-2 animate-fade-in-up drop-shadow-lg">
            🎓 Happy Graduation Monyet 🎓
          </div>
          
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 animate-fade-in-up animation-delay-300 drop-shadow-lg">
            Ni Made Ayu Cindy Subawanti 
            🐒
          </div>
        </div>

        {/* Photo Section */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-gradient-to-r from-blue-400 via-cyan-500 to-indigo-600 shadow-2xl animate-scale-in relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-500/20 to-indigo-600/20 animate-pulse-slow"></div>
              <img 
                src="/gradu/image.png" 
                alt="Cindy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 relative z-10"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-spin-slow shadow-lg shadow-blue-400/50">
              <span className="text-2xl">🌟</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-indigo-400/50">
              <span className="text-xl">🎉</span>
            </div>
          </div>
        </div>

        {/* Graduation Message */}
        <div className="text-center mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto border border-blue-200/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 animate-pulse-slow"></div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-blue-800 leading-relaxed drop-shadow-lg">
                Selamat yaa monyettt ehe 🐒! 🎊<br/>
              Hari ini bukan cuma soal toga dan ijazah. Ini tentang semua malam kamu begadang, semua momen kamu mikir "cukup nggak ya?", semua perjuangan yang nggak kelihatan tapi terasa banget di hati. Kamu nggak cuma lulus—kamu berhasil menaklukkan versi dirimu yang dulu penuh ragu. Dan itu luar biasa.<br/>
                Aku tahu kamu sering overthinking, mikirin segala kemungkinan, bahkan yang belum tentu kejadian. Tapi justru itu yang bikin kamu beda. Kamu serius, kamu sungguh-sungguh ✨ <br/> semangatt intinya ya LIFE MUST GO ON!!!!!!!!!
              </p>
            </div>
          </div>
        </div>

        {/* Question Section */}
        {showQuestion && (
          <div className={`text-center transition-all duration-1000 ${showQuestion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-indigo-500/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-lg mx-auto border-2 border-blue-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-indigo-400/20 animate-pulse-slow"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-blue-400 animate-pulse drop-shadow-lg" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 drop-shadow-lg">
                  Mau jadi pacar nya pram ndak?????? 💕
                </h2>
                
                <div className="flex justify-center gap-4 relative">
                  <button
                    onClick={handleYesClick}
                    className="group relative bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 overflow-hidden animate-button-glow"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-teal-500/20 animate-pulse-slow"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-lg font-extrabold">MAU!</span>
                      <span className="text-xl animate-bounce">💖</span>
                    </span>
                  </button>
                  
                  <button
                    onMouseEnter={handleNoButtonHover}
                    onClick={handleNoButtonHover}
                    className="group relative bg-gradient-to-r from-red-400 via-rose-500 to-pink-500 hover:from-red-500 hover:via-rose-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-500 shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 overflow-hidden absolute animate-button-glow-red"
                    style={{
                      transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-rose-500/20 to-pink-500/20 animate-pulse-slow-delayed"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-lg font-extrabold">{getNoButtonText()}</span>
                      <span className="text-xl animate-pulse">😤</span>
                    </span>
                  </button>
                </div>
                
                {noButtonClicks > 0 && (
                  <p className="text-sm text-blue-600 mt-4 animate-bounce drop-shadow-lg">
                    {noButtonClicks < 5 ? "Ngapain kak 😄" : "hehehhe 😏"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-500/90 via-cyan-500/90 to-indigo-500/90 backdrop-blur-md rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in border border-blue-200/30">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Yeay! 💕</h3>
              <p className="text-lg text-white/90 mb-6 drop-shadow-lg">
                YESSSSSSSSSS ASIKKK EKEKEKKEK! 🥰
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-blue-200 animate-pulse drop-shadow-lg" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;