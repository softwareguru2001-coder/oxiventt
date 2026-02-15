'use client';

export function CertificationCards() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl border border-blue-100/50 p-8 mb-12 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-industrial-900 mb-2">
          Our Certifications
        </h2>
        <p className="text-gray-600">
          Recognized for quality and excellence
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-stretch gap-6">
        <button
          onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
          className="group relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[240px]"
          aria-label="View ISO 27001 Certificate"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
            <div className="w-[85%] h-[85%] rounded-full bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-blue-800 text-lg sm:text-xl font-bold leading-tight">ISO</div>
                <div className="text-blue-800 text-xs sm:text-sm font-semibold">27001</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-industrial-900 mb-1">ISO 27001(ISMS)</h3>
            <p className="text-xs text-industrial-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to view
            </p>
          </div>
        </button>
        <div
          className="group relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[240px]"
          aria-label="Startup India Certificate"
        >
          <div className="w-28 h-16 sm:w-32 sm:h-20 flex items-center justify-center">
            <img
              src="/image copy copy copy copy copy.png"
              alt="Startup India"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-industrial-900">Startup India</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
