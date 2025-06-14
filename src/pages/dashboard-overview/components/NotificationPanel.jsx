import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const NotificationPanel = () => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "High Temperature Alert",
      message: "Field Zone A experiencing temperatures above optimal range for crop health.",
      details: `Current temperature: 38°C (100.4°F)
Optimal range: 22-28°C (72-82°F)
Recommended actions:
• Increase irrigation frequency
• Deploy shade structures if available
• Monitor crop stress indicators
• Consider early harvest if conditions persist`,
      timestamp: "2 minutes ago",
      priority: "high",
      icon: "Thermometer",
      color: "error"
    },
    {
      id: 2,
      type: "success",
      title: "Health Assessment Complete",
      message: "Weekly worker health screening completed successfully for all 24 team members.",
      details: `Assessment Results:
• 24/24 workers screened
• No health concerns identified
• All safety protocols followed
• Next screening: Next Monday 9:00 AM
• Compliance rate: 100%`,
      timestamp: "1 hour ago",
      priority: "medium",
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: 3,
      type: "warning",
      title: "Equipment Maintenance Due",
      message: "Irrigation system in Sector B requires scheduled maintenance within 48 hours.",
      details: `Maintenance Schedule:
• Last service: 3 months ago
• Service type: Routine inspection
• Estimated duration: 4-6 hours
• Backup systems: Available
• Contact: Maintenance Team (555) 123-4567`,
      timestamp: "3 hours ago",
      priority: "medium",
      icon: "Wrench",
      color: "warning"
    },
    {
      id: 4,
      type: "info",
      title: "Weather Update",
      message: "Favorable conditions expected for the next 5 days with optimal humidity levels.",
      details: `5-Day Forecast:
• Temperature: 24-27°C (75-81°F)
• Humidity: 65-75%
• Precipitation: 20% chance
• Wind: Light breeze 5-10 mph
• UV Index: Moderate (5-6)
Perfect conditions for crop growth and outdoor work.`,
      timestamp: "6 hours ago",
      priority: "low",
      icon: "Cloud",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        icon: 'var(--color-error)',
        border: 'border-error/20'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'var(--color-success)',
        border: 'border-success/20'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'var(--color-warning)',
        border: 'border-warning/20'
      },
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'var(--color-primary)',
        border: 'border-primary/20'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      high: { label: 'High', color: 'bg-error text-white' },
      medium: { label: 'Medium', color: 'bg-warning text-white' },
      low: { label: 'Low', color: 'bg-primary text-white' }
    };
    return priorityMap[priority] || priorityMap.low;
  };

  const toggleExpanded = (notificationId) => {
    setExpandedNotification(
      expandedNotification === notificationId ? null : notificationId
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Recent Alerts & Updates
          </h2>
          <p className="text-text-secondary font-body text-sm">
            System notifications and operational updates
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-text-secondary hover:text-text-primary transition-quick">
            <Icon name="Settings" size={16} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-quick">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => {
          const colors = getColorClasses(notification.color);
          const priority = getPriorityBadge(notification.priority);
          const isExpanded = expandedNotification === notification.id;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border ${colors.border} rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-300`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={notification.icon} size={16} color={colors.icon} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-body font-semibold text-sm text-text-primary">
                        {notification.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-body font-medium rounded-full ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => toggleExpanded(notification.id)}
                      className="text-text-secondary hover:text-text-primary transition-quick ml-2"
                    >
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </button>
                  </div>
                  
                  <p className="text-text-secondary font-body text-xs leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary font-body text-xs">
                      {notification.timestamp}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-text-secondary hover:text-text-primary transition-quick">
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pl-11"
                  >
                    <div className="bg-background rounded-lg p-3">
                      <h4 className="font-body font-medium text-text-primary text-xs mb-2">
                        Detailed Information
                      </h4>
                      <div className="text-text-secondary font-body text-xs leading-relaxed whitespace-pre-line">
                        {notification.details}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <button className={`px-3 py-1 text-xs font-body font-medium rounded-md ${colors.text} ${colors.bg} hover:opacity-80 transition-quick`}>
                          Take Action
                        </button>
                        <button className="px-3 py-1 text-xs font-body font-medium text-text-secondary hover:text-text-primary transition-quick">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 text-primary hover:text-primary/80 font-body font-medium text-sm transition-quick">
          <span>View All Notifications</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;