import React from "react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-purple-500/20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-400">
          <p className="text-sm">
            © {new Date().getFullYear()} DigiDex. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Powered by{" "}
            <a
              href="https://digi-api.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Digi-API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
