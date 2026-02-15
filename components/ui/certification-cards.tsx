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
      <div className="flex flex-wrap justify-center items-center gap-8">
        <button
          onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
          className="group relative p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          aria-label="View ISO 27001 Certificate"
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="#003087" />
              <circle cx="100" cy="100" r="75" fill="white" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#003087" strokeWidth="2" />
              <text x="100" y="85" textAnchor="middle" fill="#003087" fontSize="28" fontWeight="bold" fontFamily="Arial">
                ISO
              </text>
              <text x="100" y="115" textAnchor="middle" fill="#003087" fontSize="18" fontFamily="Arial">
                27001
              </text>
            </svg>
          </div>
        </button>
        <div
          className="group relative p-6 rounded-xl bg-white border-2 border-gray-200 cursor-default"
          aria-label="Startup India Certificate"
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <img
              src="/image copy copy copy copy copy.png"
              alt="Startup India"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
