import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const MetricCard = ({ metric, index }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1000;
      const steps = 60;
      const increment = metric.value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= metric.value) {
          setAnimatedValue(metric.value);
          clearInterval(counter);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [metric.value, index]);

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'var(--color-success)'
      },
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'var(--color-primary)'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'var(--color-warning)'
      },
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        icon: 'var(--color-error)'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      case 'stable':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const colors = getColorClasses(metric.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={metric.icon} size={24} color={colors.icon} />
        </div>
        
        <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
          <Icon name={getTrendIcon(metric.trend)} size={16} />
          <span className="text-sm font-body font-medium">{metric.change}</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-baseline space-x-1">
          <motion.span
            className={`text-3xl font-heading font-bold ${colors.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {animatedValue}
          </motion.span>
          <span className={`text-lg font-body ${colors.text}`}>{metric.unit}</span>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-text-primary font-body font-semibold text-sm">
          {metric.title}
        </h3>
      </div>

      <p className="text-text-secondary font-body text-xs leading-relaxed">
        {metric.description}
      </p>
    </motion.div>
  );
};

export default MetricCard;