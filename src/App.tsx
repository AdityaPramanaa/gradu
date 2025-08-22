import React, { useState, useEffect } from 'react';
import { GraduationCap, Heart, Sparkles, Star, Award, Users, BookOpen } from 'lucide-react';

function App() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNoButtonHover = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 150 - 75;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonClicks(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  const getNoButtonText = () => {
    if (noButtonClicks === 0) return 'Tidak';
    if (noButtonClicks < 3) return 'Eh, Tidak!';
    if (noButtonClicks < 5) return 'Harus mau!';
    if (noButtonClicks < 8) return 'Gabisa nyet!';
    return 'Mau aja ne!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Selamat Wisuda
            </h1>
            
            <div className="text-xl sm:text-2xl font-medium text-gray-600 mb-8">
              🎓 Congratulations on Your Graduation 🎓
            </div>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ni Putu Cindy Subawanti
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Photo Section */}
        <section className="mb-16">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="/public/image.png" 
                  alt="Cindy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">🌟</span>
              </div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm">🎉</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wisudawan</h3>
              <p className="text-gray-600">Berhasil menyelesaikan pendidikan</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarjana</h3>
              <p className="text-gray-600">Gelar akademik tertinggi</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alumni</h3>
              <p className="text-gray-600">Bergabung dengan komunitas alumni</p>
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Pesan Spesial
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg mb-6">
                  Selamat yaa! 🎊 Hari ini adalah bukti dari semua perjuangan, kerja keras, dan dedikasi yang telah kamu lakukan selama masa kuliah.
                </p>
                
                <p className="text-lg mb-6">
                  Kamu telah membuktikan bahwa dengan ketekunan dan semangat yang tinggi, segala hal yang terlihat mustahil bisa menjadi kenyataan. Setiap malam begadang, setiap deadline yang berhasil kamu penuhi, dan setiap tantangan yang berhasil kamu atasi telah membentuk dirimu menjadi pribadi yang lebih kuat dan tangguh.
                </p>
                
                <p className="text-lg">
                  Semoga gelar yang kamu raih hari ini menjadi awal dari perjalanan yang lebih besar dan membawa dampak positif bagi banyak orang. Tetap semangat dan terus berkarya! ✨
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Question Section */}
        {showQuestion && (
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 sm:p-12 shadow-xl border border-pink-200">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    Pertanyaan Spesial
                  </h2>
                </div>
                
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-800 mb-8">
                    Mau jadi pacar nya Pram ndak? 💕
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
                    <button
                      onClick={handleYesClick}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      MAU! 💖
                    </button>
                    
                    <button
                      onMouseEnter={handleNoButtonHover}
                      onClick={handleNoButtonHover}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg absolute"
                      style={{
                        transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {getNoButtonText()}
                    </button>
                  </div>
                  
                  {noButtonClicks > 0 && (
                    <p className="text-sm text-pink-600 mt-6 font-medium">
                      {noButtonClicks < 5 ? "Button No-nya kabur nih! 😄" : "Udah menyerah belum? 😏"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold">Congratulations!</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-gray-400">
            Semoga sukses dalam perjalanan selanjutnya ✨
          </p>
        </div>
      </footer>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Yeay! 💕</h3>
            <p className="text-gray-700 mb-6">
              YESSSSSSSSSS ASIKKK! 🥰
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-pink-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;