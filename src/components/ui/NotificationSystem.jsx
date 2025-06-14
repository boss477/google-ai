import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

// Notification Context
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification, 
      clearAll 
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Individual Notification Component
const Notification = ({ notification, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'warning':
        return 'notification-warning';
      case 'error':
        return 'notification-error';
      case 'info':
      default:
        return 'notification-info';
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(notification.id), 150);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        x: isRemoving ? 300 : 0, 
        scale: isRemoving ? 0.8 : 1 
      }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      className={`${getTypeClass(notification.type)} max-w-sm w-full relative group`}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Progress Bar */}
      {notification.duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
        />
      )}

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="flex-shrink-0 mt-0.5"
        >
          <Icon 
            name={getIcon(notification.type)} 
            size={20} 
            className="text-current"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {notification.title && (
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-current mb-1"
            >
              {notification.title}
            </motion.h4>
          )}
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-current/80"
          >
            {notification.message}
          </motion.p>

          {/* Action Button */}
          {notification.action && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={notification.action.onClick}
              className="mt-2 text-xs font-medium text-current underline hover:no-underline transition-smooth"
            >
              {notification.action.label}
            </motion.button>
          )}
        </div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleRemove}
          className="flex-shrink-0 p-1 rounded-full hover:bg-current/10 transition-smooth opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon name="X" size={14} className="text-current" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Notification Container
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-max space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              notification={notification}
              onRemove={removeNotification}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for easy notification usage
export const useNotify = () => {
  const { addNotification } = useNotifications();

  return {
    success: (message, options = {}) => addNotification({ 
      type: 'success', 
      message, 
      ...options 
    }),
    error: (message, options = {}) => addNotification({ 
      type: 'error', 
      message, 
      ...options 
    }),
    warning: (message, options = {}) => addNotification({ 
      type: 'warning', 
      message, 
      ...options 
    }),
    info: (message, options = {}) => addNotification({ 
      type: 'info', 
      message, 
      ...options 
    }),
  };
};

export default NotificationProvider;
