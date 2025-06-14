import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const DarkModeToggle = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-6 rounded-full transition-smooth
        ${isDark 
          ? 'bg-primary shadow-glow' 
          : 'bg-border hover:bg-border-dark'
        }
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <motion.div
        className={`
          absolute w-5 h-5 bg-white rounded-full shadow-elevation-2
          flex items-center justify-center
        `}
        animate={{
          x: isDark ? 24 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon inside the toggle */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Icon name="Moon" size={12} className="text-primary" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Icon name="Sun" size={12} className="text-warning" />
        </motion.div>
      </motion.div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <motion.div
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="Sun" size={10} className="text-text-tertiary" />
        </motion.div>
        
        <motion.div
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="Moon" size={10} className="text-white/70" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default DarkModeToggle;
