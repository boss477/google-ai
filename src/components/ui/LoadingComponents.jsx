import React from 'react';
import { motion } from 'framer-motion';

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  animated = true 
}) => {
  return (
    <div 
      className={`
        loading-skeleton ${width} ${height} ${rounded} ${className}
        ${animated ? 'animate-shimmer' : ''}
      `}
      style={{
        background: animated 
          ? 'linear-gradient(90deg, var(--color-border) 25%, var(--color-border-light) 50%, var(--color-border) 75%)'
          : 'var(--color-border)',
        backgroundSize: animated ? '200px 100%' : 'auto',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

// Spinner Component
export const Spinner = ({ 
  size = 'w-6 h-6', 
  color = 'border-primary',
  className = '' 
}) => {
  return (
    <div 
      className={`
        loading-spinner ${size} ${color} ${className}
      `}
    />
  );
};

// Dots Loader Component
export const DotsLoader = ({ 
  size = 'w-2 h-2',
  color = 'bg-primary',
  className = '' 
}) => {
  return (
    <div className={`loading-dots ${className}`}>
      <motion.div 
        className={`${size} ${color} rounded-full`}
        animate={{ scale: [0, 1, 0] }}
        transition={{ 
          duration: 1.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.4, 1]
        }}
      />
      <motion.div 
        className={`${size} ${color} rounded-full`}
        animate={{ scale: [0, 1, 0] }}
        transition={{ 
          duration: 1.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.4, 1],
          delay: 0.2
        }}
      />
      <motion.div 
        className={`${size} ${color} rounded-full`}
        animate={{ scale: [0, 1, 0] }}
        transition={{ 
          duration: 1.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.4, 1],
          delay: 0.4
        }}
      />
    </div>
  );
};

// Pulse Loader Component
export const PulseLoader = ({ 
  size = 'w-12 h-12',
  color = 'bg-primary',
  className = '' 
}) => {
  return (
    <motion.div
      className={`${size} ${color} rounded-full ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Wave Loader Component
export const WaveLoader = ({ 
  className = '',
  color = 'bg-primary' 
}) => {
  const bars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className={`w-1 ${color} rounded-full`}
          animate={{
            height: ['8px', '24px', '8px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bar * 0.1,
          }}
        />
      ))}
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ 
  progress = 0, 
  className = '',
  showPercentage = false,
  animated = true,
  color = 'progress-fill',
  size = 'h-2'
}) => {
  return (
    <div className={`progress-bar ${size} ${className}`}>
      <motion.div
        className={`${color} ${animated ? 'transition-all duration-500 ease-out' : ''}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: animated ? 0.5 : 0 }}
      />
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Card Skeleton Component
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <SkeletonLoader width="w-12" height="h-12" rounded="rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader width="w-3/4" height="h-4" />
            <SkeletonLoader width="w-1/2" height="h-3" />
          </div>
        </div>
        <div className="space-y-3">
          <SkeletonLoader height="h-4" />
          <SkeletonLoader width="w-5/6" height="h-4" />
          <SkeletonLoader width="w-4/6" height="h-4" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <SkeletonLoader width="w-20" height="h-8" rounded="rounded-lg" />
          <SkeletonLoader width="w-16" height="h-6" rounded="rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Table Skeleton Component
export const TableSkeleton = ({ rows = 5, columns = 4, className = '' }) => {
  return (
    <div className={`bg-surface rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-background border-b border-border p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <SkeletonLoader key={i} width="w-3/4" height="h-4" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <SkeletonLoader 
                  key={colIndex} 
                  width={colIndex === 0 ? "w-full" : "w-2/3"} 
                  height="h-4" 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Full Page Loader Component
export const FullPageLoader = ({ 
  message = 'Loading...', 
  showProgress = false, 
  progress = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-md z-max flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Spinner size="w-12 h-12" />
        </motion.div>
        
        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-text-primary font-medium"
          >
            {message}
          </motion.p>
          
          {showProgress && (
            <div className="w-64 mx-auto">
              <ProgressBar 
                progress={progress} 
                showPercentage 
                className="relative"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default {
  SkeletonLoader,
  Spinner,
  DotsLoader,
  PulseLoader,
  WaveLoader,
  ProgressBar,
  CardSkeleton,
  TableSkeleton,
  FullPageLoader,
};
