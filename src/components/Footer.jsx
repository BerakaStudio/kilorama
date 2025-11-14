import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-6">
      <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
        <p className="text-sm">
          Kilorama © 2025{' '}
          <a 
            href="https://beraka.cl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Beraka Studio
          </a>
        </p>
      </div>
    </footer>
  );
}