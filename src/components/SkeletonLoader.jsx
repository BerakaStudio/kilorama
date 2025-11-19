import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-4 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl"></div>
      <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl"></div>
    </div>
    <div className="mt-4 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

export const SkeletonSummary = () => (
  <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-lg p-6 mb-6 animate-pulse">
    <div className="h-6 bg-white/30 rounded w-40 mb-4"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/20 rounded-xl p-4">
        <div className="h-4 bg-white/30 rounded w-32 mb-2"></div>
        <div className="h-8 bg-white/30 rounded w-24"></div>
      </div>
      <div className="bg-white/20 rounded-xl p-4">
        <div className="h-4 bg-white/30 rounded w-32 mb-2"></div>
        <div className="h-8 bg-white/30 rounded w-24"></div>
      </div>
    </div>
  </div>
);

export const SkeletonHeader = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6 animate-pulse">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  </div>
);