import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const InteractiveChart = ({ 
  data = [], 
  type = 'line', 
  title = 'Chart',
  className = '',
  animated = true,
  showTooltip = true,
  showGrid = true,
  height = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animated && isVisible) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animated, isVisible]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="chart-tooltip"
        >
          <p className="font-medium text-text-primary">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const CustomGrid = (props) => (
    <CartesianGrid 
      {...props} 
      className="chart-grid-line"
      strokeDasharray="2 2"
    />
  );

  const chartVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const barVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0
    },
    visible: { 
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`chart-container ${className}`}
      onMouseEnter={() => setHoveredData(true)}
      onMouseLeave={() => setHoveredData(false)}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.h3 
          className="text-lg font-heading font-semibold text-text-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`w-2 h-2 rounded-full transition-smooth ${
            animationComplete ? 'bg-success animate-pulse' : 'bg-border'
          }`} />
          <span className="text-xs text-text-secondary">
            {animationComplete ? 'Live' : 'Loading...'}
          </span>
        </motion.div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CustomGrid />}
              <XAxis 
                dataKey="name" 
                className="chart-axis-line"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              <YAxis 
                className="chart-axis-line"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ 
                  fill: 'var(--color-primary)', 
                  strokeWidth: 2, 
                  r: 4,
                  className: 'chart-data-point'
                }}
                activeDot={{ 
                  r: 6, 
                  fill: 'var(--color-primary)',
                  stroke: 'var(--color-surface)',
                  strokeWidth: 2,
                  className: 'animate-pulse-data'
                }}
                className={animated ? 'animate-draw-line' : ''}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CustomGrid />}
              <XAxis 
                dataKey="name" 
                className="chart-axis-line"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              <YAxis 
                className="chart-axis-line"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Bar
                dataKey="value"
                fill="var(--color-primary)"
                className={animated ? 'animate-fill-bar' : ''}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>

        {/* Loading Overlay */}
        <AnimatePresence>
          {!animationComplete && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-lg"
            >
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart Legend */}
      <motion.div
        className="chart-legend mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="chart-legend-item">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span>Data Points</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveChart;
