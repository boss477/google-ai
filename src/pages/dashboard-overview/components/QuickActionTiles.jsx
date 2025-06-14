import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActionTiles = () => {
  const quickActions = [
    {
      id: 1,
      title: "Schedule Health Assessment",
      description: "Book health checkups for agricultural workers",
      icon: "Calendar",
      color: "primary",
      route: "/scheduling-calendar-management",
      badge: "3 Pending"
    },
    {
      id: 2,
      title: "Log Incident Report",
      description: "Report workplace incidents and safety concerns",
      icon: "AlertTriangle",
      color: "warning",
      route: "/data-management-reporting",
      badge: "Urgent"
    },
    {
      id: 3,
      title: "Generate Health Report",
      description: "Create comprehensive health and safety reports",
      icon: "FileText",
      color: "success",
      route: "/data-management-reporting",
      badge: "New"
    },
    {
      id: 4,
      title: "Monitor Analytics",
      description: "View detailed health monitoring analytics",
      icon: "Activity",
      color: "secondary",
      route: "/health-monitoring-analytics",
      badge: "Live"
    },
    {
      id: 5,
      title: "Update Profile",
      description: "Manage user settings and preferences",
      icon: "Settings",
      color: "primary",
      route: "/user-profile-settings",
      badge: null
    },
    {
      id: 6,
      title: "Emergency Protocol",
      description: "Access emergency procedures and contacts",
      icon: "Phone",
      color: "error",
      route: "#",
      badge: "24/7"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'var(--color-primary)',
        hover: 'hover:bg-primary/20'
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        icon: 'var(--color-secondary)',
        hover: 'hover:bg-secondary/20'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'var(--color-success)',
        hover: 'hover:bg-success/20'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'var(--color-warning)',
        hover: 'hover:bg-warning/20'
      },
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        icon: 'var(--color-error)',
        hover: 'hover:bg-error/20'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  const getBadgeColor = (color) => {
    const colorMap = {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      success: 'bg-success text-white',
      warning: 'bg-warning text-white',
      error: 'bg-error text-white'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Quick Actions
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Rapid access to common tasks and operations
          </p>
        </div>
        
        <button className="text-text-secondary hover:text-text-primary transition-quick">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const colors = getColorClasses(action.color);
          
          const ActionComponent = action.route.startsWith('#') ? 'button' : Link;
          const actionProps = action.route.startsWith('#') 
            ? { onClick: () => console.log(`${action.title} clicked`) }
            : { to: action.route };

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <ActionComponent
                {...actionProps}
                className={`block w-full p-4 bg-background border border-border rounded-lg transition-all duration-300 hover:shadow-elevation-2 ${colors.hover} group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={action.icon} size={20} color={colors.icon} />
                  </div>
                  
                  {action.badge && (
                    <span className={`px-2 py-1 text-xs font-body font-medium rounded-full ${getBadgeColor(action.color)}`}>
                      {action.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`font-body font-semibold text-sm mb-1 ${colors.text} group-hover:text-opacity-80 transition-colors`}>
                    {action.title}
                  </h3>
                  <p className="text-text-secondary font-body text-xs leading-relaxed">
                    {action.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-end">
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className={`${colors.text} group-hover:translate-x-1 transition-transform duration-300`} 
                  />
                </div>
              </ActionComponent>
            </motion.div>
          );
        })}
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={16} color="var(--color-error)" />
          </div>
          <div className="flex-1">
            <h4 className="font-body font-medium text-error text-sm">Emergency Hotline</h4>
            <p className="font-body text-text-secondary text-xs">24/7 Support: +1 (555) 123-4567</p>
          </div>
          <button className="bg-error text-white px-3 py-1 rounded-md font-body font-medium text-xs hover:bg-error/90 transition-quick">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionTiles;