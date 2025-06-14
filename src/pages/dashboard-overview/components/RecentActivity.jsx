import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: "health_check",
      title: "Health Assessment Completed",
      description: "Dr. Sarah Johnson completed health screening for 12 workers in Sector A",
      user: "Dr. Sarah Johnson",
      timestamp: "15 minutes ago",
      icon: "Heart",
      color: "success",
      details: "All workers cleared for field operations. No health concerns identified."
    },
    {
      id: 2,
      type: "alert",
      title: "Temperature Alert Triggered",
      description: "High temperature warning activated for Field Zone B (38°C recorded)",
      user: "System Alert",
      timestamp: "32 minutes ago",
      icon: "Thermometer",
      color: "error",
      details: "Automatic irrigation system activated. Workers advised to take frequent breaks."
    },
    {
      id: 3,
      type: "maintenance",
      title: "Equipment Maintenance Scheduled",
      description: "Irrigation system maintenance scheduled for tomorrow 8:00 AM",
      user: "Mike Rodriguez",
      timestamp: "1 hour ago",
      icon: "Wrench",
      color: "warning",
      details: "Estimated duration: 4-6 hours. Backup systems will be activated."
    },
    {
      id: 4,
      type: "report",
      title: "Weekly Health Report Generated",
      description: "Comprehensive health and safety report for Week 42 has been generated",
      user: "Emma Thompson",
      timestamp: "2 hours ago",
      icon: "FileText",
      color: "primary",
      details: "Report includes worker wellness metrics, incident logs, and compliance data."
    },
    {
      id: 5,
      type: "compliance",
      title: "Safety Training Completed",
      description: "15 workers completed mandatory safety training certification",
      user: "Training Department",
      timestamp: "3 hours ago",
      icon: "Shield",
      color: "success",
      details: "All participants passed with scores above 85%. Certificates issued."
    },
    {
      id: 6,
      type: "incident",
      title: "Minor Incident Reported",
      description: "Worker reported minor cut during equipment handling in Sector C",
      user: "John Smith",
      timestamp: "4 hours ago",
      icon: "AlertCircle",
      color: "warning",
      details: "First aid administered immediately. Worker cleared to continue work."
    },
    {
      id: 7,
      type: "health_check",
      title: "Crop Health Assessment",
      description: "Agricultural specialist completed crop health evaluation for Zone A",
      user: "Dr. Maria Garcia",
      timestamp: "5 hours ago",
      icon: "Leaf",
      color: "success",
      details: "Crop health score: 89%. Recommended continued current care regimen."
    },
    {
      id: 8,
      type: "system",
      title: "System Backup Completed",
      description: "Daily system backup and data synchronization completed successfully",
      user: "System",
      timestamp: "6 hours ago",
      icon: "Database",
      color: "primary",
      details: "All data backed up to secure cloud storage. No errors detected."
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activities', count: activities.length },
    { id: 'health_check', label: 'Health Checks', count: activities.filter(a => a.type === 'health_check').length },
    { id: 'alert', label: 'Alerts', count: activities.filter(a => a.type === 'alert').length },
    { id: 'maintenance', label: 'Maintenance', count: activities.filter(a => a.type === 'maintenance').length },
    { id: 'incident', label: 'Incidents', count: activities.filter(a => a.type === 'incident').length }
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeFilter);

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

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Recent Activity
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Latest system activities and operational updates
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button className="text-text-secondary hover:text-text-primary transition-quick">
            <Icon name="Filter" size={16} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-quick">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      {/* Activity Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-body font-medium text-sm transition-quick ${
              activeFilter === filter.id
                ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{filter.label}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white' :'bg-text-secondary/10 text-text-secondary'
            }`}>
              {filter.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity, index) => {
          const colors = getColorClasses(activity.color);

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start space-x-4 p-4 bg-background rounded-lg hover:shadow-elevation-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={activity.icon} size={18} color={colors.icon} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-body font-semibold text-sm text-text-primary mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-text-secondary font-body text-xs leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                  
                  <span className="text-text-secondary font-body text-xs flex-shrink-0 ml-4">
                    {activity.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-text-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="var(--color-text-secondary)" />
                    </div>
                    <span className="text-text-secondary font-body text-xs">
                      {activity.user}
                    </span>
                  </div>
                  
                  <button className="text-text-secondary hover:text-text-primary transition-quick">
                    <Icon name="ChevronRight" size={14} />
                  </button>
                </div>
                
                {/* Activity Details */}
                <div className="mt-3 p-3 bg-surface rounded-lg">
                  <p className="text-text-secondary font-body text-xs leading-relaxed">
                    {activity.details}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 text-primary hover:text-primary/80 font-body font-medium text-sm transition-quick">
          <span>Load More Activities</span>
          <Icon name="ChevronDown" size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;