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
      <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6">
        <button
          onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
          className="group relative flex items-center gap-4 sm:gap-5 px-5 sm:px-6 py-4 sm:py-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 min-w-[260px]"
          aria-label="View ISO 27001 Certificate"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 p-1 shadow-xl flex-shrink-0">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <div className="text-center leading-none">
                <div className="text-blue-700 text-sm sm:text-base font-black">ISO</div>
                <div className="text-blue-700 text-xs font-bold mt-0.5">27001</div>
              </div>
            </div>
          </div>
          <div className="text-left flex-1">
            <h3 className="text-base sm:text-lg font-bold text-industrial-900 mb-1">ISO 27001(ISMS)</h3>
            <p className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors">
              Click to view
            </p>
          </div>
        </button>
        <button
          onClick={() => window.open('/startupind.pdf', '_blank', 'noopener,noreferrer')}
          className="group relative flex items-center gap-4 sm:gap-5 px-5 sm:px-6 py-4 sm:py-5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 min-w-[260px] cursor-pointer"
          aria-label="View Startup India Certificate"
        >
          <div className="w-20 h-14 sm:w-24 sm:h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-xl flex-shrink-0">
            <img
              src="/image copy copy copy copy copy.png"
              alt="Startup India"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-base sm:text-lg font-bold text-industrial-900 mb-1">Startup India</h3>
            <p className="text-xs text-orange-600 group-hover:text-orange-700 transition-colors">
              Click to view
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
