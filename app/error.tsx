'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl border-2 border-red-200 shadow-xl p-8 md:p-12">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Oops! Something went wrong
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            We encountered an unexpected error. This has been logged and we'll look into it.
          </p>

          {error.message && (
            <details className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>Technical Details</span>
              </summary>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Error Message:</span>
                  <p className="text-sm text-red-600 mt-1 font-mono break-all">
                    {error.message}
                  </p>
                </div>
                {error.digest && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Error ID:</span>
                    <p className="text-sm text-gray-700 mt-1 font-mono">
                      {error.digest}
                    </p>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
