import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const UpcomingEvents = ({ events, onEventClick, categoryConfig }) => {
  const now = new Date();
  const upcomingEvents = events
    .filter(event => new Date(event.startTime) > now)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 5);

  const formatEventTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dateStr = '';
    if (start.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (start.toDateString() === tomorrow.toDateString()) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = start.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }

    const timeStr = `${start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })} - ${end.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    return { dateStr, timeStr };
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return { icon: 'AlertTriangle', color: 'text-red-500' };
      case 'medium':
        return { icon: 'Clock', color: 'text-yellow-500' };
      case 'low':
        return { icon: 'Info', color: 'text-green-500' };
      default:
        return { icon: 'Clock', color: 'text-gray-500' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return { icon: 'Calendar', color: 'text-blue-500' };
      case 'in-progress':
        return { icon: 'Play', color: 'text-orange-500' };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-green-500' };
      case 'cancelled':
        return { icon: 'XCircle', color: 'text-red-500' };
      default:
        return { icon: 'Calendar', color: 'text-gray-500' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-lg shadow-elevation-1 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Clock" size={18} />
          <span>Upcoming Events</span>
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Next {upcomingEvents.length} scheduled events
        </p>
      </div>

      {/* Events List */}
      <div className="divide-y divide-border">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => {
            const { dateStr, timeStr } = formatEventTime(event.startTime, event.endTime);
            const priorityConfig = getPriorityIcon(event.priority);
            const statusConfig = getStatusIcon(event.status);
            const categoryInfo = categoryConfig[event.category];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onEventClick(event)}
                className="p-4 hover:bg-background cursor-pointer transition-quick group"
              >
                <div className="flex items-start space-x-3">
                  {/* Category Indicator */}
                  <div className={`w-3 h-3 rounded-full mt-2 ${categoryInfo?.color || 'bg-gray-500'}`}></div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary group-hover:text-primary transition-quick truncate">
                          {event.title}
                        </h4>
                        
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-text-secondary">
                            {dateStr}
                          </span>
                          <span className="text-sm text-text-secondary">
                            {timeStr}
                          </span>
                        </div>

                        {event.location && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Icon name="MapPin" size={12} className="text-text-secondary" />
                            <span className="text-xs text-text-secondary truncate">
                              {event.location}
                            </span>
                          </div>
                        )}

                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Icon name="Users" size={12} className="text-text-secondary" />
                            <span className="text-xs text-text-secondary">
                              {event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status and Priority Indicators */}
                      <div className="flex flex-col items-end space-y-1 ml-2">
                        <Icon 
                          name={statusConfig.icon} 
                          size={16} 
                          className={statusConfig.color}
                        />
                        <Icon 
                          name={priorityConfig.icon} 
                          size={14} 
                          className={priorityConfig.color}
                        />
                      </div>
                    </div>

                    {/* Event Description Preview */}
                    {event.description && (
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    {/* Recurring Indicator */}
                    {event.recurring && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Icon name="Repeat" size={12} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">Recurring</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
            <h4 className="font-medium text-text-primary mb-2">No Upcoming Events</h4>
            <p className="text-sm text-text-secondary">
              All caught up! No events scheduled for the near future.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {upcomingEvents.length > 0 && (
        <div className="p-4 border-t border-border bg-background">
          <button className="w-full flex items-center justify-center space-x-2 text-sm text-text-secondary hover:text-primary transition-quick">
            <span>View All Events</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingEvents;