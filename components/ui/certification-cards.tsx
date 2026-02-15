'use client';

import { Award, ShieldCheck } from 'lucide-react';

export function CertificationCards() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl border border-blue-100/50 p-8 mb-12 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-industrial-900 mb-2">
          Certified Business
        </h2>
        <p className="text-gray-600">
          Recognized for quality and excellence
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
          className="group flex items-start gap-6 p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-xl font-bold text-industrial-900 mb-1 group-hover:text-blue-600 transition-colors">ISO 9001:2015</h3>
            <p className="text-sm text-gray-600 mb-2">Quality Management System</p>
            <span className="text-sm text-blue-600 font-medium">Click to view certificate →</span>
          </div>
        </button>
        <button
          onClick={() => window.open('/startupind.pdf', '_blank', 'noopener,noreferrer')}
          className="group flex items-start gap-6 p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-xl font-bold text-industrial-900 mb-1 group-hover:text-blue-600 transition-colors">Startup India</h3>
            <p className="text-sm text-gray-600 mb-2">Government of India Recognition</p>
            <span className="text-sm text-blue-600 font-medium">Click to view certificate →</span>
          </div>
        </button>
      </div>
    </div>
  );
}
