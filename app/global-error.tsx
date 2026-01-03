'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Critical Error
              </h1>

              <p className="text-lg text-gray-600 text-center mb-8">
                A critical error occurred. Please refresh the page to continue.
              </p>

              {error.message && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-2">Error Message:</p>
                  <p className="text-sm text-red-600 font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <>
                      <p className="text-sm font-medium text-gray-500 mt-4 mb-2">Error ID:</p>
                      <p className="text-sm text-gray-700 font-mono">
                        {error.digest}
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
