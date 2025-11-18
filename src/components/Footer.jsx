import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 py-6 transition-colors">
      <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p style={{ fontSize: 'var(--text-sm)' }}>
          Kilorama © 2025{' '}
          <a 
            href="https://beraka.cl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
          >
            Beraka Studio
          </a>
        </p>
      </div>
    </footer>
  );
}