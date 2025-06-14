import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const HealthAlerts = ({ alerts, onDismiss }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      case 'info':
        return 'notification-info';
      default:
        return 'border-border bg-surface text-text-primary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Active Alerts</h3>
        <span className="text-sm font-body text-text-secondary">
          {alerts.length} alert{alerts.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-container p-4 ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={20} 
                    className={alert.type === 'critical' ? 'text-error' : alert.type === 'warning' ? 'text-warning' : 'text-primary'}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-body font-semibold text-text-primary mb-1">
                        {alert.title}
                      </h4>
                      <p className="font-body text-sm text-text-secondary mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs font-body text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{formatTimeAgo(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name={alert.category === 'crop' ? 'Leaf' : 'Users'} size={12} />
                          <span className="capitalize">{alert.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-1.5 text-text-secondary hover:text-text-primary transition-quick rounded-interactive hover:bg-background">
                        <Icon name="Eye" size={16} />
                      </button>
                      <button 
                        onClick={() => onDismiss(alert.id)}
                        className="p-1.5 text-text-secondary hover:text-error transition-quick rounded-interactive hover:bg-background"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {alert.type === 'critical' && (
                <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                  <div className="flex items-center space-x-2">
                    <button className="btn-danger text-xs px-3 py-1.5">
                      <Icon name="Zap" size={14} />
                      <span>Take Action</span>
                    </button>
                    <button className="btn-secondary text-xs px-3 py-1.5">
                      <Icon name="Calendar" size={14} />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HealthAlerts;